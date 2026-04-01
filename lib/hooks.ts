import { useState, useEffect, useCallback } from 'react';
import { storage } from './storage';
import {
    mockDashboardData,
    mockSales,
    mockProducts,
    mockSuppliers,
    mockBranches,
    mockFinance,
    mockPurchases,
    mockAlerts
} from '@/lib/mockData';
import { calculateDashboardStats, calculateFinanceSummary } from './financialCalculations';

export function useData<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        let key = '';
        let defaultData: any = [];
        const activeBranch = storage.get('activeBranch', null);
        const branchId = activeBranch?.id;

        // Try REAL API first for modern modules
        if (url === "/api/products" || url === "/api/products/aliases") {
            try {
                const res = await fetch(url);
                if (res.ok) {
                    const jsonData = await res.json();
                    
                    // Post-processing for products (stock/batches)
                    if (url === "/api/products") {
                        const allBatches = storage.get('batches', []);
                        const localProducts = storage.get('products', []);
                        
                        // Merge logic: Prioritize DB products, but keep unique local ones
                        const dbProducts = jsonData;
                        const mergedProducts = [...dbProducts];
                        
                        localProducts.forEach((lp: any) => {
                            const exists = mergedProducts.find(dp => 
                                (dp.item_code && lp.item_code && dp.item_code === lp.item_code) || 
                                (dp.name?.toLowerCase() === lp.name?.toLowerCase())
                            );
                            if (!exists) {
                                mergedProducts.push(lp);
                            }
                        });

                        const processed = mergedProducts.map((p: any) => {
                            const productBatches = allBatches.filter((b: any) => String(b.productId) === String(p.id));
                            const batchStock = productBatches.reduce((sum: number, b: any) => sum + (b.quantity || 0), 0);
                            return { 
                                ...p, 
                                batches: productBatches, 
                                stock: p.stock !== undefined ? p.stock : batchStock // Support both direct stock and batch-summed stock
                            };
                        });

                        // FINAL SORT: Latest first
                        processed.sort((a, b) => {
                            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                            if (dateB !== dateA) return dateB - dateA;
                            // Fallback to ID comparison
                            return String(b.id).localeCompare(String(a.id));
                        });

                        setData(processed as any);

                    }

 else {
                        setData(jsonData);
                    }
                    setLoading(false);
                    return;
                }
            } catch (err) {
                console.warn(`API fetch failed for ${url}, falling back to storage:`, err);
            }
        }

        // LEGACY STORAGE LOGIC
        if (url.includes('products')) {
            key = 'products';
            defaultData = mockProducts;
        } else if (url.includes('sales')) {
            key = 'sales';
            defaultData = mockSales;
        } else if (url.includes('suppliers')) {
            key = 'suppliers';
            defaultData = mockSuppliers;
        } else if (url.includes('finance') || url.includes('reports')) {
            key = 'finance';
            defaultData = calculateFinanceSummary(branchId === 'all' ? null : branchId);
        } else if (url.includes('purchases')) {
            key = 'purchases';
            defaultData = mockPurchases;
        } else if (url.includes('alerts')) {
            key = 'alerts';
            defaultData = mockAlerts;
        } else if (url.includes('branches')) {
            key = 'branches';
            defaultData = mockBranches;
        } else if (url.includes('dashboard')) {
            key = 'dashboard';
            defaultData = calculateDashboardStats(branchId === 'all' ? null : branchId);
        } else if (url.includes('invoices')) {
            key = 'sales';
            defaultData = mockSales;
        } else if (url.includes('batches')) {
            key = 'batches';
            defaultData = [];
        }

        let storedData = key ? storage.get(key, defaultData) : defaultData;

        // Post-processing for filtering if needed
        const isGlobal = branchId === 'all';

        if (key === 'products') {
            const allBatches = storage.get('batches', []);
            storedData = (storedData as any[]).map(p => {
                // Find all batches for THIS product across ALL branches
                const productBatches = allBatches.filter((b: any) => b.productId == p.id);
                
                // If a specific branch is selected, further filter for that branch
                const activeBatches = (branchId && !isGlobal) 
                    ? productBatches.filter((b: any) => b.branchId == branchId)
                    : productBatches;

                const batchStock = activeBatches.reduce((sum: number, b: any) => sum + (b.quantity || 0), 0);
                
                return {
                    ...p,
                    batches: activeBatches,
                    stock: batchStock
                };
            });

            // If a specific branch is selected, only show products that HAVE batches in that branch
            if (branchId && !isGlobal) {
                storedData = (storedData as any[]).filter(p => p.batches.length > 0);
            }
        } else if (branchId && !isGlobal && key === 'sales') {
            storedData = (storedData as any[]).filter(s => s.branchId == branchId);
        } else if (branchId && !isGlobal && key === 'batches') {
            storedData = (storedData as any[]).filter(b => b.branchId == branchId);
        }

        setData(storedData);
        setLoading(false);
    }, [url]);


    useEffect(() => {
        fetchData();

        // Listen for storage changes to sync data across components
        window.addEventListener('jailwatch_storage_change', fetchData);
        return () => window.removeEventListener('jailwatch_storage_change', fetchData);
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
