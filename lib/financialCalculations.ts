import { storage } from './storage';

export function calculateDashboardStats(branchId?: string | number | null) {
    const allSales = storage.get('sales', []);
    const allProducts = storage.get('products', []);
    const today = new Date().toISOString().split('T')[0];

    // Filter by branch if provided
    const sales = branchId 
        ? allSales.filter((s: any) => s.branchId == branchId)
        : allSales;
        
    const products = branchId
        ? allProducts.filter((p: any) => p.batches?.some((b: any) => b.branchId == branchId))
        : allProducts;

    const todaySales = sales
        .filter((s: any) => s.date.startsWith(today))
        .reduce((sum: number, s: any) => sum + (s.total || 0), 0);

    const totalRevenue = sales.reduce((sum: number, s: any) => sum + (s.total || 0), 0);

    const lowStock = products.filter((p: any) => {
        const branchStock = branchId 
            ? (p.batches?.filter((b: any) => b.branchId == branchId).reduce((sum: number, b: any) => sum + b.quantity, 0) || 0)
            : (p.stock || 0);
        return branchStock < 20;
    }).length;

    // Estimate expiring soon based on products with batches
    let expiringSoon = 0;
    const now = new Date();
    products.forEach((p: any) => {
        if (p.batches) {
            const hasExpiring = p.batches.some((b: any) => {
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
        recentSales: sales.slice(0, 5).map((s: any) => ({
            id: s.id,
            medicine: s.items?.[0]?.name || "Medicine",
            quantity: s.items?.[0]?.quantity || 0,
            amount: s.total,
            time: s.date
        })),
        topSellingProducts: products.map((p: any) => {
            const soldAmt = sales.reduce((sum: number, s: any) => {
                const item = s.items?.find((i: any) => i.productId === p.id);
                return sum + (item ? item.quantity : 0);
            }, 0);
            const revenue = sales.reduce((sum: number, s: any) => {
                const item = s.items?.find((i: any) => i.productId === p.id);
                return sum + (item ? (item.pricePerUnit * item.quantity) : 0);
            }, 0);
            return {
                name: p.name,
                sold: soldAmt,
                revenue: revenue,
                stock: p.stock
            };
        }).sort((a: any, b: any) => b.sold - a.sold).slice(0, 5)
    };
}

export function calculateFinanceSummary(branchId?: string | number | null) {
    const allSales = storage.get('sales', []);
    const allPurchases = storage.get('purchases', []);

    const sales = branchId 
        ? allSales.filter((s: any) => s.branchId == branchId)
        : allSales;

    const purchases = branchId 
        ? allPurchases.filter((p: any) => p.branchId == branchId)
        : allPurchases;

    const totalRevenue = sales.reduce((sum: number, s: any) => sum + (s.total || 0), 0);
    const totalExpenses = purchases.reduce((sum: number, p: any) => sum + (p.total || 0), 0);
    const netProfit = totalRevenue - totalExpenses;

    const txSales = sales.map((s: any) => ({
        id: `s-${s.id}`,
        type: 'income',
        description: `Sale: ${s.invoiceNo}`,
        date: new Date(s.date).toLocaleDateString(),
        amount: s.total
    }));

    const txPurchases = purchases.map((p: any) => ({
        id: `p-${p.id}`,
        type: 'expense',
        description: `Purchase: ${p.invoiceNo || p.id}`,
        date: new Date(p.date).toLocaleDateString(),
        amount: p.total
    }));

    const recentTransactions = [...txSales, ...txPurchases]
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

    // Group sales by month for the chart
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentYearNum = new Date().getFullYear();

    const monthlySales = months.map(m => {
        const monthSales = sales
            .filter((s: any) => {
                const date = new Date(s.date);
                return date.toLocaleString('default', { month: 'short' }) === m && date.getFullYear() === currentYearNum;
            })
            .reduce((sum: number, s: any) => sum + (s.total || 0), 0);

        const monthPurchases = purchases
            .filter((p: any) => {
                const date = new Date(p.date);
                return date.toLocaleString('default', { month: 'short' }) === m && date.getFullYear() === currentYearNum;
            })
            .reduce((sum: number, p: any) => sum + (p.total || 0), 0);

        return { month: m, year: currentYearNum, sales: monthSales, purchases: monthPurchases };
    }).filter(m => m.sales > 0 || m.purchases > 0);

    const products = storage.get('products', []);
    const topProducts = products.map((p: any) => {
        const soldAmt = sales.reduce((sum: number, s: any) => {
            const item = s.items?.find((i: any) => i.productId === p.id);
            return sum + (item ? item.quantity : 0);
        }, 0);
        const revenue = sales.reduce((sum: number, s: any) => {
            const item = s.items?.find((i: any) => i.productId === p.id);
            return sum + (item ? (item.pricePerUnit * item.quantity) : 0);
        }, 0);
        return { name: p.name, sold: soldAmt, revenue: revenue };
    }).sort((a: any, b: any) => b.sold - a.sold).slice(0, 5);

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
