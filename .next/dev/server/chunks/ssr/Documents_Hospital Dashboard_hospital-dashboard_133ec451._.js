module.exports = [
"[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/storage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "storage",
    ()=>storage
]);
"use client";
const storage = {
    get: (key, defaultValue = [])=>{
        if ("TURBOPACK compile-time truthy", 1) return defaultValue;
        //TURBOPACK unreachable
        ;
        const stored = undefined;
    },
    set: (key, value)=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
};
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/mockData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Products - Empty by default (no mock data)
__turbopack_context__.s([
    "mockAlerts",
    ()=>mockAlerts,
    "mockDashboardData",
    ()=>mockDashboardData,
    "mockFinance",
    ()=>mockFinance,
    "mockProducts",
    ()=>mockProducts,
    "mockPurchases",
    ()=>mockPurchases,
    "mockSales",
    ()=>mockSales,
    "mockStats",
    ()=>mockStats,
    "mockSuppliers",
    ()=>mockSuppliers
]);
const mockProducts = [];
const mockSales = [];
const mockStats = {
    todaySales: 0,
    totalRevenue: 0,
    lowStock: 0,
    expiringSoon: 0
};
const mockDashboardData = {
    stats: mockStats,
    recentSales: [],
    topSellingProducts: [],
    expiryAlerts: []
};
const mockSuppliers = [];
const mockFinance = {
    revenue: 0,
    expenses: 0,
    profit: 0,
    transactions: []
};
const mockPurchases = [];
const mockAlerts = [];
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/financialCalculations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateDashboardStats",
    ()=>calculateDashboardStats,
    "calculateFinanceSummary",
    ()=>calculateFinanceSummary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/storage.ts [app-ssr] (ecmascript)");
;
function calculateDashboardStats() {
    const sales = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storage"].get('sales', []);
    const products = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storage"].get('products', []);
    const today = new Date().toISOString().split('T')[0];
    const todaySales = sales.filter((s)=>s.date.startsWith(today)).reduce((sum, s)=>sum + (s.total || 0), 0);
    const totalRevenue = sales.reduce((sum, s)=>sum + (s.total || 0), 0);
    const lowStock = products.filter((p)=>(p.stock || 0) < 20).length;
    // Estimate expiring soon based on products with batches
    let expiringSoon = 0;
    const now = new Date();
    products.forEach((p)=>{
        if (p.batches) {
            const hasExpiring = p.batches.some((b)=>{
                if (!b.expiryDate) return false;
                const exp = new Date(b.expiryDate);
                const diffDays = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                return diffDays > 0 && diffDays <= 90;
            });
            if (hasExpiring) expiringSoon++;
        }
    });
    return {
        stats: {
            todaySales,
            totalRevenue,
            lowStock,
            expiringSoon
        },
        recentSales: sales.slice(0, 5).map((s)=>({
                id: s.id,
                medicine: s.items?.[0]?.name || "Medicine",
                quantity: s.items?.[0]?.quantity || 0,
                amount: s.total,
                time: s.date
            })),
        topSellingProducts: products.map((p)=>{
            const soldAmt = sales.reduce((sum, s)=>{
                const item = s.items?.find((i)=>i.productId === p.id);
                return sum + (item ? item.quantity : 0);
            }, 0);
            const revenue = sales.reduce((sum, s)=>{
                const item = s.items?.find((i)=>i.productId === p.id);
                return sum + (item ? item.pricePerUnit * item.quantity : 0);
            }, 0);
            return {
                name: p.name,
                sold: soldAmt,
                revenue: revenue,
                stock: p.stock
            };
        }).sort((a, b)=>b.sold - a.sold).slice(0, 5)
    };
}
function calculateFinanceSummary() {
    const sales = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storage"].get('sales', []);
    const purchases = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storage"].get('purchases', []);
    const totalRevenue = sales.reduce((sum, s)=>sum + (s.total || 0), 0);
    const totalExpenses = purchases.reduce((sum, p)=>sum + (p.total || 0), 0);
    const netProfit = totalRevenue - totalExpenses;
    const txSales = sales.map((s)=>({
            id: `s-${s.id}`,
            type: 'income',
            description: `Sale: ${s.invoiceNo}`,
            date: new Date(s.date).toLocaleDateString(),
            amount: s.total
        }));
    const txPurchases = purchases.map((p)=>({
            id: `p-${p.id}`,
            type: 'expense',
            description: `Purchase: ${p.invoiceNo || p.id}`,
            date: new Date(p.date).toLocaleDateString(),
            amount: p.total
        }));
    const recentTransactions = [
        ...txSales,
        ...txPurchases
    ].sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);
    // Group sales by month for the chart
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const currentYearNum = new Date().getFullYear();
    const monthlySales = months.map((m)=>{
        const monthSales = sales.filter((s)=>{
            const date = new Date(s.date);
            return date.toLocaleString('default', {
                month: 'short'
            }) === m && date.getFullYear() === currentYearNum;
        }).reduce((sum, s)=>sum + (s.total || 0), 0);
        const monthPurchases = purchases.filter((p)=>{
            const date = new Date(p.date);
            return date.toLocaleString('default', {
                month: 'short'
            }) === m && date.getFullYear() === currentYearNum;
        }).reduce((sum, p)=>sum + (p.total || 0), 0);
        return {
            month: m,
            year: currentYearNum,
            sales: monthSales,
            purchases: monthPurchases
        };
    }).filter((m)=>m.sales > 0 || m.purchases > 0);
    const products = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storage"].get('products', []);
    const topProducts = products.map((p)=>{
        const soldAmt = sales.reduce((sum, s)=>{
            const item = s.items?.find((i)=>i.productId === p.id);
            return sum + (item ? item.quantity : 0);
        }, 0);
        const revenue = sales.reduce((sum, s)=>{
            const item = s.items?.find((i)=>i.productId === p.id);
            return sum + (item ? item.pricePerUnit * item.quantity : 0);
        }, 0);
        return {
            name: p.name,
            sold: soldAmt,
            revenue: revenue
        };
    }).sort((a, b)=>b.sold - a.sold).slice(0, 5);
    return {
        totalRevenue,
        totalExpenses,
        netProfit,
        recentTransactions,
        monthlySales,
        topProducts,
        revenue: totalRevenue,
        expenses: totalExpenses,
        profit: netProfit
    };
}
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/hooks.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useData",
    ()=>useData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/storage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/mockData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$financialCalculations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/financialCalculations.ts [app-ssr] (ecmascript)");
;
;
;
;
function useData(url) {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        let key = '';
        let defaultData = [];
        if (url.includes('products')) {
            key = 'products';
            defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockProducts"];
        } else if (url.includes('sales')) {
            key = 'sales';
            defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockSales"];
        } else if (url.includes('suppliers')) {
            key = 'suppliers';
            defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockSuppliers"];
        } else if (url.includes('finance') || url.includes('reports')) {
            key = 'finance';
            defaultData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$financialCalculations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateFinanceSummary"])();
        } else if (url.includes('purchases')) {
            key = 'purchases';
            defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockPurchases"];
        } else if (url.includes('alerts')) {
            key = 'alerts';
            defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockAlerts"];
        } else if (url.includes('dashboard')) {
            key = 'dashboard';
            defaultData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$financialCalculations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateDashboardStats"])();
        } else if (url.includes('invoices')) {
            key = 'sales';
            defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockSales"];
        } else if (url.includes('batches')) {
            key = 'batches';
            defaultData = [];
        }
        const storedData = key ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storage"].get(key, defaultData) : defaultData;
        setData(storedData);
        setLoading(false);
    }, [
        url
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchData();
        // Listen for storage changes to sync data across components
        window.addEventListener('jailwatch_storage_change', fetchData);
        return ()=>window.removeEventListener('jailwatch_storage_change', fetchData);
    }, [
        fetchData
    ]);
    return {
        data,
        loading,
        error,
        refetch: fetchData
    };
}
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/expiryTracking.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Expiry Tracking System
 * Comprehensive utilities for pharmacy expiry management
 */ __turbopack_context__.s([
    "filterBatchesByStatus",
    ()=>filterBatchesByStatus,
    "formatExpiryDate",
    ()=>formatExpiryDate,
    "generateAllExpiryAlerts",
    ()=>generateAllExpiryAlerts,
    "generateExpiryAlert",
    ()=>generateExpiryAlert,
    "getDaysUntilExpiry",
    ()=>getDaysUntilExpiry,
    "getExpiredBatches",
    ()=>getExpiredBatches,
    "getExpiryBadgeClass",
    ()=>getExpiryBadgeClass,
    "getExpiryColor",
    ()=>getExpiryColor,
    "getExpiryStatus",
    ()=>getExpiryStatus,
    "getExpirySummary",
    ()=>getExpirySummary,
    "getNearExpiryBatches",
    ()=>getNearExpiryBatches,
    "getNextBatch",
    ()=>getNextBatch,
    "getTotalStockFromBatches",
    ()=>getTotalStockFromBatches,
    "isBatchBlocked",
    ()=>isBatchBlocked,
    "parseExpiryDate",
    ()=>parseExpiryDate,
    "sortBatchesByFIFO",
    ()=>sortBatchesByFIFO
]);
function getDaysUntilExpiry(expiryDate) {
    const expiry = new Date(expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}
function getExpiryStatus(expiryDate) {
    const daysLeft = getDaysUntilExpiry(expiryDate);
    if (daysLeft < 0) return 'expired';
    if (daysLeft <= 30) return 'critical';
    if (daysLeft <= 90) return 'warning';
    return 'safe';
}
function getExpiryColor(status) {
    const colors = {
        expired: 'red',
        critical: 'red',
        warning: 'orange',
        safe: 'green'
    };
    return colors[status];
}
function getExpiryBadgeClass(status) {
    const classes = {
        expired: 'badge-danger',
        critical: 'badge-danger',
        warning: 'badge-warning',
        safe: 'badge-success'
    };
    return classes[status];
}
function sortBatchesByFIFO(batches) {
    return [
        ...batches
    ].sort((a, b)=>{
        const dateA = new Date(a.expiryDate).getTime();
        const dateB = new Date(b.expiryDate).getTime();
        return dateA - dateB;
    });
}
function getNextBatch(batches) {
    if (!batches || batches.length === 0) return null;
    const sortedBatches = sortBatchesByFIFO(batches);
    // Return first batch with quantity > 0
    return sortedBatches.find((b)=>b.quantity > 0) || null;
}
function filterBatchesByStatus(batches, status) {
    return batches.filter((batch)=>getExpiryStatus(batch.expiryDate) === status);
}
function getNearExpiryBatches(batches, withinDays = 90) {
    return batches.filter((batch)=>{
        const daysLeft = getDaysUntilExpiry(batch.expiryDate);
        return daysLeft >= 0 && daysLeft <= withinDays;
    });
}
function getExpiredBatches(batches) {
    return batches.filter((batch)=>getDaysUntilExpiry(batch.expiryDate) < 0);
}
function getTotalStockFromBatches(batches) {
    return batches.reduce((total, batch)=>total + (batch.quantity || 0), 0);
}
function generateExpiryAlert(batch, productName) {
    const daysLeft = getDaysUntilExpiry(batch.expiryDate);
    const status = getExpiryStatus(batch.expiryDate);
    let severity = 'low';
    let message = '';
    if (status === 'expired') {
        severity = 'high';
        message = `${productName} (Batch ${batch.batchNo}) has expired`;
    } else if (status === 'critical') {
        severity = 'high';
        message = `${productName} (Batch ${batch.batchNo}) expires in ${daysLeft} days`;
    } else if (status === 'warning') {
        severity = 'medium';
        message = `${productName} (Batch ${batch.batchNo}) expires in ${daysLeft} days`;
    }
    return {
        id: batch.id,
        medicine: productName,
        batch: batch.batchNo,
        days: daysLeft,
        quantity: batch.quantity,
        type: status === 'critical' ? 'critical' : status === 'warning' ? 'warning' : 'info',
        severity,
        message,
        expiryDate: batch.expiryDate
    };
}
function generateAllExpiryAlerts(products) {
    const alerts = [];
    products.forEach((product)=>{
        if (product.batches && product.batches.length > 0) {
            const nearExpiryBatches = getNearExpiryBatches(product.batches, 180);
            const expiredBatches = getExpiredBatches(product.batches);
            [
                ...expiredBatches,
                ...nearExpiryBatches
            ].forEach((batch)=>{
                alerts.push(generateExpiryAlert(batch, product.name));
            });
        }
    });
    // Sort by days left (ascending)
    return alerts.sort((a, b)=>a.days - b.days);
}
function formatExpiryDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.toLocaleString('en-US', {
        month: 'short'
    });
    const year = date.getFullYear();
    return `${month} ${year}`;
}
function parseExpiryDate(dateStr) {
    try {
        // Remove any text like "EXP:", "Expiry:", etc.
        const cleaned = dateStr.replace(/(Exp|EXP|Expiry|Use before|MFG\/EXP)[:.]?\s*/gi, '').trim();
        // Try to parse different formats
        const patterns = [
            /(\d{2})[\/\-](\d{4})/,
            /(\d{2})[\/\-](\d{2})/,
            /(\d{4})[\/\-](\d{2})/
        ];
        for (const pattern of patterns){
            const match = cleaned.match(pattern);
            if (match) {
                let month, year;
                if (match[1].length === 4) {
                    // YYYY/MM format
                    year = parseInt(match[1]);
                    month = parseInt(match[2]);
                } else {
                    // MM/YYYY or MM/YY format
                    month = parseInt(match[1]);
                    year = parseInt(match[2]);
                    if (year < 100) {
                        year += 2000; // Convert YY to YYYY
                    }
                }
                if (month >= 1 && month <= 12) {
                    return `${year}-${month.toString().padStart(2, '0')}-01`;
                }
            }
        }
        return null;
    } catch (error) {
        return null;
    }
}
function isBatchBlocked(batch) {
    const status = getExpiryStatus(batch.expiryDate);
    return status === 'expired';
}
function getExpirySummary(products) {
    let totalBatches = 0;
    let expiredCount = 0;
    let criticalCount = 0; // 0-30 days
    let warningCount = 0; // 31-90 days
    let within180Count = 0; // 91-180 days
    products.forEach((product)=>{
        if (product.batches) {
            totalBatches += product.batches.length;
            product.batches.forEach((batch)=>{
                const daysLeft = getDaysUntilExpiry(batch.expiryDate);
                if (daysLeft < 0) {
                    expiredCount++;
                } else if (daysLeft <= 30) {
                    criticalCount++;
                } else if (daysLeft <= 90) {
                    warningCount++;
                } else if (daysLeft <= 180) {
                    within180Count++;
                }
            });
        }
    });
    return {
        totalBatches,
        expiredCount,
        criticalCount,
        warningCount,
        within180Count,
        safeCount: totalBatches - expiredCount - criticalCount - warningCount - within180Count
    };
}
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-ssr] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-ssr] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-ssr] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/pill.js [app-ssr] (ecmascript) <export default as Pill>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/hooks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$expiryTracking$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/expiryTracking.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function Dashboard() {
    const { data: dashboardData, loading: dashLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useData"])("/api/dashboard");
    const { data: products, loading: productsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useData"])("/api/products");
    const expiryAlerts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!products) return [];
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$expiryTracking$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateAllExpiryAlerts"])(products).slice(0, 5); // Show top 5
    }, [
        products
    ]);
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!dashboardData || !products) return null;
        const lowStockCount = products.filter((p)=>(p.stock || 0) < 20).length;
        const expiringSoonCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$expiryTracking$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateAllExpiryAlerts"])(products).filter((a)=>a.days <= 90).length;
        return {
            ...dashboardData.stats,
            lowStock: lowStockCount,
            expiringSoon: expiringSoonCount
        };
    }, [
        dashboardData,
        products
    ]);
    if (dashLoading || productsLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-[60vh] items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "h-10 w-10 text-purple-600 animate-spin"
            }, void 0, false, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                lineNumber: 47,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this);
    }
    if (error || !dashboardData || !stats) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-8 text-center text-red-500 card-premium",
            children: [
                "Error loading dashboard: ",
                error || "No data available"
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this);
    }
    const { recentSales, topSellingProducts } = dashboardData;
    const statCards = [
        {
            label: "Today's Sales",
            value: `PKR ${stats.todaySales.toLocaleString()}`,
            change: "+12.5%",
            trend: "up",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"],
            iconBg: "stat-icon-primary",
            shadow: "shadow-purple-100"
        },
        {
            label: "Total Revenue",
            value: `PKR ${stats.totalRevenue.toLocaleString()}`,
            change: "+20.1%",
            trend: "up",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"],
            iconBg: "stat-icon-success",
            shadow: "shadow-green-100"
        },
        {
            label: "Low Stock Items",
            value: stats.lowStock.toString(),
            change: stats.lowStock > 0 ? "Needs Restock" : "All Healthy",
            trend: stats.lowStock > 0 ? "warning" : "up",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
            iconBg: stats.lowStock > 0 ? "stat-icon-warning" : "stat-icon-success",
            shadow: "shadow-orange-100"
        },
        {
            label: "Expiring Soon",
            value: stats.expiringSoon.toString(),
            change: stats.expiringSoon > 0 ? "Check Alerts" : "No Issues",
            trend: stats.expiringSoon > 0 ? "danger" : "up",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
            iconBg: stats.expiringSoon > 0 ? "stat-icon-danger" : "stat-icon-success",
            shadow: "shadow-red-100"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-8 animate-fade-in-up",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-black text-white uppercase tracking-tight text-gradient",
                                children: "IR Operations"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/70 mt-1 font-medium italic",
                                children: "IR SOFTWARE Real-time Pharmacy Analytics."
                            }, void 0, false, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:flex flex-col items-end mr-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                        children: "System Health"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold text-green-600 flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                lineNumber: 113,
                                                columnNumber: 15
                                            }, this),
                                            " Optimal"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/reports",
                                className: "btn-primary flex items-center gap-2 group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        className: "h-4 w-4 group-hover:scale-110 transition-transform"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this),
                                    "IR Reports"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
                children: statCards.map((stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `card-premium rounded-3xl p-6 border-b-4 ${stat.trend === 'danger' ? 'border-red-500' : stat.trend === 'warning' ? 'border-orange-500' : 'border-purple-500'} transition-all hover:scale-[1.02] shadow-xl ${stat.shadow}/50`,
                        style: {
                            animationDelay: `${i * 100}ms`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `stat-icon ${stat.iconBg}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(stat.icon, {
                                            className: "h-6 w-6"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                            lineNumber: 136,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this),
                                    stat.trend === 'up' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 text-[10px] font-black uppercase text-green-600 bg-green-50 px-3 py-1 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                lineNumber: 140,
                                                columnNumber: 19
                                            }, this),
                                            stat.change
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                        lineNumber: 139,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `badge ${stat.trend === 'danger' ? 'badge-danger' : 'badge-warning'} text-[10px] uppercase font-black`,
                                        children: stat.change
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                lineNumber: 134,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                        children: stat.label
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-3xl font-black text-gray-900 mt-1",
                                        children: stat.value
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                        lineNumber: 151,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 lg:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 card-premium rounded-3xl p-8 shadow-2xl shadow-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-black text-gray-900 uppercase tracking-tight",
                                                children: "Recent Sales"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                lineNumber: 164,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500 font-medium",
                                                children: "Inventory movements recorded today"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                lineNumber: 165,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                        lineNumber: 163,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/sales",
                                        className: "text-xs font-black text-purple-600 hover:text-purple-700 uppercase tracking-widest bg-purple-50 px-4 py-2 rounded-xl transition-all",
                                        children: "View All History"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    recentSales.map((sale)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4 p-5 rounded-2xl bg-gray-50/50 hover:bg-gray-100/50 transition-all border border-transparent hover:border-gray-100 group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__["Pill"], {
                                                        className: "h-6 w-6 text-white"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                        lineNumber: 176,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-bold text-gray-900",
                                                            children: sale.medicine
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                            lineNumber: 179,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-500 font-bold uppercase tracking-tighter",
                                                            children: [
                                                                "Quantity: ",
                                                                sale.quantity,
                                                                " Strips"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                            lineNumber: 180,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-black text-gray-900",
                                                            children: [
                                                                "PKR ",
                                                                sale.amount.toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                            lineNumber: 183,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] text-gray-400 font-bold uppercase",
                                                            children: new Date(sale.time).toLocaleTimeString([], {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                            lineNumber: 184,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, sale.id, true, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                            lineNumber: 174,
                                            columnNumber: 15
                                        }, this)),
                                    recentSales.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-20 text-center flex flex-col items-center gap-4 border-2 border-dashed border-gray-100 rounded-3xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                className: "h-10 w-10 text-gray-200"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                lineNumber: 190,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400 font-bold uppercase text-xs",
                                                children: "No transactions recorded today"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                lineNumber: 191,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-premium rounded-3xl p-8 shadow-2xl shadow-gray-100 border-t-8 border-orange-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-black text-gray-900 uppercase tracking-tight",
                                                children: "Vigilance"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                lineNumber: 201,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500 font-medium",
                                                children: "Critical Medicine Lifecycles"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                lineNumber: 202,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/alerts",
                                        className: "badge badge-danger group",
                                        children: [
                                            expiryAlerts.length,
                                            " Active ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                                className: "h-3 w-3 inline ml-1 group-hover:translate-x-1 transition-transform"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                lineNumber: 205,
                                                columnNumber: 44
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    expiryAlerts.map((alert)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `p-5 rounded-2xl transition-all border ${alert.days <= 30 ? 'bg-red-50 border-red-100' : alert.days <= 90 ? 'bg-orange-50 border-orange-100' : 'bg-blue-50 border-blue-100'}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `p-2 rounded-lg ${alert.days <= 30 ? 'bg-red-500' : 'bg-orange-500'} text-white`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                            lineNumber: 220,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-black text-gray-900 truncate uppercase text-xs",
                                                                children: alert.productName
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                                lineNumber: 223,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] text-gray-500 font-bold uppercase mt-0.5",
                                                                children: [
                                                                    "Batch: ",
                                                                    alert.batchNo
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                                lineNumber: 224,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between mt-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `text-[10px] font-black uppercase px-2 py-0.5 rounded ${alert.days <= 30 ? 'bg-red-200 text-red-700' : 'bg-orange-200 text-orange-700'}`,
                                                                        children: alert.days <= 0 ? 'EXPIRED' : `${alert.days} DAYS LEFT`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                                        lineNumber: 226,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] text-gray-400 font-black uppercase",
                                                                        children: [
                                                                            "Qty: ",
                                                                            alert.quantity
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                                        lineNumber: 230,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                                lineNumber: 225,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                        lineNumber: 222,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                lineNumber: 218,
                                                columnNumber: 17
                                            }, this)
                                        }, alert.id, false, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                            lineNumber: 211,
                                            columnNumber: 15
                                        }, this)),
                                    expiryAlerts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-20 text-center flex flex-col items-center gap-4 bg-green-50 rounded-3xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                className: "h-10 w-10 text-green-200"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                lineNumber: 238,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-green-600 font-bold uppercase text-xs",
                                                children: "Inventory is safe"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                lineNumber: 239,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                        lineNumber: 237,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-premium rounded-3xl p-8 shadow-2xl shadow-gray-100 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-black text-gray-900 uppercase tracking-tight",
                                    children: "Best Performers"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                    lineNumber: 250,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500 font-medium",
                                    children: "Top moving inventory this month"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                    lineNumber: 251,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                            lineNumber: 249,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto -mx-8 px-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-gray-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                children: "Medicine"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                lineNumber: 259,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                children: "Movement"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                lineNumber: 260,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right",
                                                children: "Revenue Generation"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                lineNumber: 261,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center",
                                                children: "In-Stock Status"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                lineNumber: 262,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                    lineNumber: 257,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-y divide-gray-50",
                                    children: topSellingProducts.map((product, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "hover:bg-gray-50/50 transition-colors group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-6 min-w-[200px]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-purple-100 transition-colors",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__["Pill"], {
                                                                    className: "h-6 w-6 text-gray-400 group-hover:text-purple-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                                    lineNumber: 271,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                                lineNumber: 270,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-black text-gray-900 uppercase tracking-tight",
                                                                children: product.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                                lineNumber: 273,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                        lineNumber: 269,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-6",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-full bg-purple-500 rounded-full",
                                                                    style: {
                                                                        width: `${Math.min(100, product.sold / 500 * 100)}%`
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                                    lineNumber: 279,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                                lineNumber: 278,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-bold text-gray-600",
                                                                children: [
                                                                    product.sold,
                                                                    " UNITS"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                                lineNumber: 284,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-6 text-right",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-black text-gray-900",
                                                        children: [
                                                            "PKR ",
                                                            product.revenue.toLocaleString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                        lineNumber: 288,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                    lineNumber: 287,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-6 text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${product.stock > 100 ? 'bg-green-100 text-green-700' : product.stock > 30 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`,
                                                        children: product.stock > 100 ? 'Ample' : product.stock > 30 ? 'Limited' : 'Critical'
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                        lineNumber: 291,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                                    lineNumber: 290,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                            lineNumber: 267,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                                    lineNumber: 265,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                            lineNumber: 256,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/page.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Documents_Hospital%20Dashboard_hospital-dashboard_133ec451._.js.map