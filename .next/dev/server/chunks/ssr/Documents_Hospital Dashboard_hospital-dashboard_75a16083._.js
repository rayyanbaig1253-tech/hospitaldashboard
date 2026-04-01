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
    "mockBranches",
    ()=>mockBranches,
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
const mockBranches = [
    {
        id: 1,
        name: "Bahadurabad",
        location: "Main Shop",
        type: "Main"
    },
    {
        id: 2,
        name: "Gulshan",
        location: "Pharmacy Area",
        type: "Pharmacy"
    },
    {
        id: 3,
        name: "Nazimabad",
        location: "West Block",
        type: "Pharmacy"
    }
];
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
        } else if (url.includes('branches')) {
            key = 'branches';
            defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockBranches"];
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
"[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/print.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "printInvoice",
    ()=>printInvoice
]);
const printInvoice = (sale, userName)=>{
    const printWindow = window.open('', '_blank', 'width=400,height=600');
    if (!printWindow) return;
    const totalGross = sale.items.reduce((acc, item)=>acc + Number(item.price) * Number(item.quantity), 0);
    const totalDiscount = sale.discount || 0;
    const now = new Date();
    const html = `
        <html>
            <head>
                <title>Print Invoice</title>
                <style>
                    body {
                        font-family: 'Courier New', Courier, monospace;
                        width: 72mm; /* Standard thermal width active area */
                        margin: 0;
                        padding: 2mm;
                        font-size: 11px;
                        line-height: 1.1;
                    }
                    .text-center { text-align: center; }
                    .text-right { text-align: right; }
                    .bold { font-weight: bold; }
                    .divider { border-top: 1px dashed #000; margin: 3px 0; }
                    .header h1 { margin: 0; font-size: 18px; }
                    .item-row { display: flex; justify-content: space-between; margin-bottom: 3px; }
                    .item-details { font-size: 9px; margin-left: 5px; }
                    .totals-box { border: 1px solid #000; padding: 4px; margin: 8px 0; }
                    @media print {
                        @page { 
                            size: 80mm auto; 
                            margin: 0; 
                        }
                    }
                </style>
            </head>
            <body>
                <div class="header text-center">
                    <h1>IR SOFTWARE</h1>
                    <div>SHAHRAH-E-PAKISTAN, KARACHI</div>
                    <div>UAN: 021 111 246 246</div>
                    <br/>
                    <div class="bold">Original Receipt</div>
                </div>

                <div class="divider"></div>

                <div class="item-row">
                    <span>Receipt # ${sale.id.toString().padStart(8, '0')}</span>
                    <span>Pos: POS-101</span>
                </div>
                <div class="item-row">
                    <span>Date: ${now.toLocaleDateString()}</span>
                    <span>Time: ${now.toLocaleTimeString()}</span>
                </div>
                <div>User: ${userName || 'ADMIN CORE'}</div>
                <div>Customer: WALK-IN CUSTOMER</div>

                <div class="divider"></div>
                <div class="bold">Pack Unit     Gross  DisAmt  Item Total</div>
                <div class="divider"></div>

                ${sale.items.map((item)=>`
                    <div class="bold">${item.name.toUpperCase()}</div>
                    <div class="item-row">
                        <span class="item-details">${item.qtyDisplay || `${item.quantity.toString().padStart(2, '0')}  00`}</span>
                        <span>${(Number(item.price) * Number(item.quantity)).toFixed(2)}</span>
                    </div>
                `).join('')}

                <div class="divider"></div>
                <div class="item-row bold">
                    <span>Total</span>
                    <span>${sale.items.length} items</span>
                    <span>${sale.total.toFixed(0)}</span>
                </div>
                
                <div class="text-center" style="font-size: 10px; margin-top:5px;">
                    Total Gross    Total Discount    Total Net<br/>
                    <span class="bold">${totalGross.toFixed(0)}            ${totalDiscount.toFixed(0)}            ${sale.total.toFixed(0)}</span>
                </div>

                <div class="totals-box">
                    <div class="item-row" style="align-items: center;">
                        <span style="font-size: 10px;">Invoice Value</span>
                        <span style="font-size: 20px;" class="bold">${sale.total.toLocaleString()}</span>
                    </div>
                </div>

                <div class="text-center bold">Mode Of Payment</div>
                <div class="divider"></div>
                <div class="item-row">
                    <span>CASH</span>
                    <span>${sale.total.toFixed(2)}</span>
                </div>
                <div class="item-row bold">
                    <span>Total Payment :</span>
                    <span>${sale.total.toFixed(2)}</span>
                </div>

                <div class="divider"></div>
                <div class="item-row">
                    <span>CashReceived:</span>
                    <span>${(sale.paidAmount || 0).toFixed(0)}</span>
                </div>
                <div class="item-row">
                    <span>CashRefund:</span>
                    <span>${(sale.changeAmount || 0).toFixed(0)}</span>
                </div>

                <div class="divider"></div>
                <div class="text-center bold" style="font-size: 10px;">CUSTOMER RESPONSIBILITY</div>
                <div class="text-center" style="font-size: 9px;">
                    *Please Check Your Medicine By Prescription &<br/>
                    Expiry Date Of Medicine Yourself, Or Through<br/>
                    Your Medical Consultant<br/>
                    *In Case Of Any Doubt Of Wrong Medicine, It<br/>
                    May Be Returned<br/>
                    *Please Match Your Purchased Items With The<br/>
                    Bill. In Case Of Any Discrepancy, Call Our<br/>
                    Helpline Or Whatsapp Us On The Number Below.
                </div>

                <div style="margin-top: 10px;" class="text-center bold">
                    For Complaints, Please<br/>
                    <span style="font-size: 14px;">WhatsApp 0302-8647611</span>
                </div>

                <div style="margin-top: 10px;" class="text-center bold">
                    THANKYOU & COME AGAIN
                </div>

                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(() => window.close(), 100);
                    };
                </script>
            </body>
        </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
};
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SalesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/printer.js [app-ssr] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-ssr] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/pill.js [app-ssr] (ecmascript) <export default as Pill>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/hooks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$print$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/print.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/storage.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function SalesPage() {
    // Mock user session
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser({
                name: "Demo User"
            });
        }
    }, []);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showSuccess, setShowSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [discount, setDiscount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [cashPaid, setCashPaid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const { data: products, loading: productsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useData"])("/api/products");
    const { data: salesHistory, refetch: refetchSales } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useData"])("/api/sales");
    const filteredProducts = products?.filter((p)=>p.name.toLowerCase().includes(searchTerm.toLowerCase())) || [];
    const addToCart = (product)=>{
        const existingItem = cart.find((item)=>item.productId === product.id);
        const unitsPerPack = Math.max(1, Number(product.unitsPerPack) || 1);
        const totalAvailableUnits = product.stock * unitsPerPack;
        // Default to adding 1 strip, or whatever is left if stock is low
        const amountToAdd = totalAvailableUnits >= unitsPerPack ? unitsPerPack : totalAvailableUnits;
        if (existingItem) {
            // Validate if adding 1 more strip/piece exceeds total available tablets
            if (existingItem.quantity + 1 > totalAvailableUnits) return;
            setCart(cart.map((item)=>item.productId === product.id ? {
                    ...item,
                    quantity: Math.min(totalAvailableUnits, item.quantity + 1)
                } : item));
        } else {
            if (totalAvailableUnits <= 0) return;
            setCart([
                ...cart,
                {
                    productId: product.id,
                    name: product.name,
                    quantity: amountToAdd,
                    pricePerUnit: product.salePrice / unitsPerPack,
                    boxPrice: product.salePrice,
                    unitsPerPack: unitsPerPack,
                    discount: Number(product.defaultDiscount) || 0,
                    batch: product.batches?.[0]?.batchNo || "N/A",
                    batchId: product.batches?.[0]?.id,
                    stock: product.stock
                }
            ]);
        }
    };
    const updateUnifiedQuantity = (productId, strips, tablets)=>{
        setCart((prevCart)=>{
            const item = prevCart.find((i)=>i.productId === productId);
            if (!item) return prevCart;
            const unitsPerPack = item.unitsPerPack;
            // Clean inputs to avoid NaN
            const s = isNaN(strips) ? 0 : Math.max(0, strips);
            const t = isNaN(tablets) ? 0 : Math.max(0, tablets);
            const totalUnits = s * unitsPerPack + t;
            if (totalUnits <= 0) {
                return prevCart.filter((i)=>i.productId !== productId);
            }
            // Cap at stock (totalUnits vs total units available)
            const maxUnits = item.stock * item.unitsPerPack;
            const finalUnits = Math.min(totalUnits, maxUnits);
            return prevCart.map((i)=>i.productId === productId ? {
                    ...i,
                    quantity: finalUnits
                } : i);
        });
    };
    const removeFromCart = (productId)=>{
        setCart((prevCart)=>prevCart.filter((item)=>item.productId !== productId));
    };
    const updateManualPrice = (productId, price)=>{
        setCart((prevCart)=>prevCart.map((i)=>i.productId === productId ? {
                    ...i,
                    manualPrice: price
                } : i));
    };
    const totalItemDiscount = cart.reduce((sum, item)=>{
        // Box discount only applies for each FULL box sold
        const boxes = Math.floor(item.quantity / item.unitsPerPack);
        return sum + boxes * (item.discount || 0);
    }, 0);
    const subtotal = cart.reduce((sum, item)=>{
        const unitPrice = item.manualPrice !== undefined ? item.manualPrice : item.pricePerUnit;
        return sum + unitPrice * item.quantity;
    }, 0);
    const tax = 0;
    const calculatedTotal = subtotal + tax - totalItemDiscount - discount;
    const total = Math.max(0, calculatedTotal);
    const change = cashPaid > total ? cashPaid - total : 0;
    const completeSale = async ()=>{
        if (cart.length === 0 || isSubmitting) return;
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(async ()=>{
            const newSale = {
                id: Date.now(),
                invoiceNo: `INV-${Date.now().toString().slice(-6)}`,
                date: new Date().toISOString(),
                total: total,
                discount: totalItemDiscount + discount,
                paidAmount: cashPaid,
                changeAmount: change,
                items: cart.map((item)=>({
                        productId: item.productId,
                        name: item.name,
                        quantity: item.quantity,
                        pricePerUnit: item.manualPrice !== undefined ? item.manualPrice : item.pricePerUnit,
                        boxPrice: item.boxPrice,
                        unitsPerPack: item.unitsPerPack,
                        discount: item.discount,
                        batch: item.batch,
                        batchId: item.batchId
                    })),
                soldBy: user?.name || "ADMIN CORE"
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$print$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["printInvoice"])({
                id: newSale.id,
                total: newSale.total,
                discount: newSale.discount,
                paidAmount: newSale.paidAmount,
                changeAmount: newSale.changeAmount,
                items: newSale.items.map((item)=>{
                    const boxes = Math.floor(item.quantity / item.unitsPerPack);
                    const tablets = item.quantity % item.unitsPerPack;
                    let qtyDisplay = "";
                    if (boxes > 0 && tablets > 0) qtyDisplay = `${boxes} B + ${tablets} T`;
                    else if (boxes > 0) qtyDisplay = `${boxes} Box`;
                    else qtyDisplay = `${tablets} Piece`;
                    return {
                        name: item.name + (tablets > 0 ? " (Loose)" : ""),
                        quantity: item.quantity,
                        price: item.pricePerUnit,
                        qtyDisplay: qtyDisplay
                    };
                })
            }, user?.name || "ADMIN CORE");
            // 1. Save Sale to History
            const currentSales = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storage"].get('sales', []);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storage"].set('sales', [
                newSale,
                ...currentSales
            ]);
            // 2. Update Product Stock (Persistence)
            const currentProducts = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storage"].get('products', []);
            const updatedProducts = currentProducts.map((p)=>{
                const soldItem = cart.find((c)=>c.productId === p.id);
                if (soldItem) {
                    // Logic: Quantity sold is in tablets. We need to subtract from stock (which is in Boxes)
                    // Stock = Stock - (TotalTabletsSold / TabletsPerBox)
                    const boxesSold = soldItem.quantity / (p.unitsPerPack || 1);
                    return {
                        ...p,
                        stock: Math.max(0, p.stock - boxesSold)
                    };
                }
                return p;
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storage"].set('products', updatedProducts);
            setCart([]);
            setDiscount(0);
            setCashPaid(0);
            setShowSuccess(true); // Re-added setShowSuccess
            setTimeout(()=>setShowSuccess(false), 3000);
            refetchSales(); // This will just re-fetch mock data
            setIsSubmitting(false);
        }, 1000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-8 animate-fade-in-up",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-bold text-white uppercase",
                                        children: "Point of Sale"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 230,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/70 mt-1 italic",
                                        children: "Create new sales and manage billing."
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 231,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                lineNumber: 229,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-500",
                                    children: [
                                        "Today's Total: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "text-green-600",
                                            children: [
                                                "PKR ",
                                                subtotal.toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                            lineNumber: 234,
                                            columnNumber: 80
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                    lineNumber: 234,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                lineNumber: 233,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 228,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-6 lg:grid-cols-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 243,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Search medicine to add...",
                                                value: searchTerm,
                                                onChange: (e)=>setSearchTerm(e.target.value),
                                                className: "h-14 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 text-base focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 244,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 25
                                    }, this),
                                    productsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-center py-12",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "h-8 w-8 text-purple-600 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                            lineNumber: 256,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 255,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                                        children: filteredProducts.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>addToCart(product),
                                                disabled: product.stock <= 0,
                                                className: `card-premium rounded-2xl p-4 text-left hover:scale-[1.02] transition-transform ${product.stock <= 0 ? 'opacity-60 cursor-not-allowed' : ''}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 mb-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__["Pill"], {
                                                                    className: "h-5 w-5 text-purple-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                    lineNumber: 269,
                                                                    columnNumber: 49
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 268,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-medium text-gray-900 truncate",
                                                                        children: product.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 272,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: `text-xs ${product.stock <= 10 ? 'text-red-500 font-medium' : 'text-gray-500'}`,
                                                                        children: [
                                                                            "Stock: ",
                                                                            product.stock
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 273,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 271,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-black text-gray-400 uppercase tracking-tighter",
                                                                        children: "Box Price"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 278,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-lg font-black text-purple-600 leading-none",
                                                                        children: [
                                                                            "PKR ",
                                                                            product.salePrice
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 279,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 277,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col text-right",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-black text-gray-400 uppercase tracking-tighter",
                                                                        children: "Per Tablet"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 282,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-black text-blue-600 leading-none",
                                                                        children: [
                                                                            "PKR ",
                                                                            (product.salePrice / (product.unitsPerPack || 1)).toFixed(2)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 283,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 281,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 276,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, product.id, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 261,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 259,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "card-premium rounded-2xl p-6 mt-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-gray-900 mb-4",
                                                children: "Recent Sales"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 293,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: salesHistory?.slice(0, 5).map((sale)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between p-3 rounded-xl bg-gray-50/80",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                            className: "h-5 w-5 text-green-600"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                            lineNumber: 299,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 298,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "font-medium text-gray-900",
                                                                                children: sale.invoiceNo
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 302,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-gray-500",
                                                                                children: new Date(sale.date).toLocaleString()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 303,
                                                                                columnNumber: 49
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 301,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 297,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-right",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-semibold text-gray-900",
                                                                        children: [
                                                                            "PKR ",
                                                                            sale.total.toLocaleString()
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 307,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-500",
                                                                        children: [
                                                                            sale.items?.length,
                                                                            " items"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 308,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 306,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, sale.id, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 37
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 294,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                lineNumber: 240,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card-premium rounded-2xl p-6 h-fit sticky top-24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-gray-900",
                                                children: "Current Bill"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 319,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                        className: "h-5 w-5 text-purple-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 321,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "badge badge-info",
                                                        children: [
                                                            cart.length,
                                                            " items"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 322,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 320,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 318,
                                        columnNumber: 25
                                    }, this),
                                    cart.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-12",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                className: "h-12 w-12 text-gray-300 mx-auto mb-3"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 328,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500",
                                                children: "Cart is empty"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 329,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-400",
                                                children: "Add medicines to create a sale"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 330,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 327,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3 max-h-[300px] overflow-y-auto mb-6",
                                                children: cart.map((item)=>{
                                                    const boxes = Math.floor(item.quantity / item.unitsPerPack);
                                                    const tablets = item.quantity % item.unitsPerPack;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm transition-all hover:bg-white hover:shadow-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex-1 min-w-0",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "font-bold text-gray-900 text-sm truncate",
                                                                                children: item.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 343,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex flex-col gap-1 mt-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[10px] font-black text-purple-600 uppercase tracking-tight",
                                                                                        children: [
                                                                                            "Box: PKR ",
                                                                                            item.boxPrice.toFixed(0),
                                                                                            " | Tablet: PKR ",
                                                                                            item.pricePerUnit.toFixed(2)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 345,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-[10px] font-bold text-gray-400 uppercase",
                                                                                                children: "Override Unit Price:"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                                lineNumber: 349,
                                                                                                columnNumber: 65
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                type: "number",
                                                                                                value: item.manualPrice ?? "",
                                                                                                placeholder: item.pricePerUnit.toFixed(2),
                                                                                                onChange: (e)=>updateManualPrice(item.productId, parseFloat(e.target.value)),
                                                                                                className: "w-20 h-6 text-[10px] font-black border border-gray-100 rounded bg-white px-1 focus:ring-1 focus:ring-purple-500"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                                lineNumber: 350,
                                                                                                columnNumber: 65
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 348,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 344,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 342,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>removeFromCart(item.productId),
                                                                        className: "w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                            className: "h-4 w-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                            lineNumber: 364,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 360,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 341,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-2 gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex justify-between items-center px-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: "text-[10px] font-black text-gray-400 uppercase tracking-tighter",
                                                                                        children: "Boxes Qty"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 372,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    item.quantity >= item.stock * item.unitsPerPack && item.quantity % item.unitsPerPack === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[9px] font-bold text-orange-500 uppercase",
                                                                                        children: "Max"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 374,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 371,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex h-10 items-stretch bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-purple-500/20 transition-all",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>updateUnifiedQuantity(item.productId, boxes - 1, tablets),
                                                                                        className: "px-3 bg-gray-50 text-gray-400 hover:text-purple-600 active:bg-gray-100 transition-colors border-r border-gray-100 font-bold",
                                                                                        children: "-"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 378,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        type: "text",
                                                                                        inputMode: "numeric",
                                                                                        value: boxes,
                                                                                        onChange: (e)=>updateUnifiedQuantity(item.productId, parseInt(e.target.value) || 0, tablets),
                                                                                        className: "w-full text-center font-black text-gray-900 border-none bg-transparent text-sm focus:ring-0 p-0"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 384,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>updateUnifiedQuantity(item.productId, boxes + 1, tablets),
                                                                                        className: "px-3 bg-gray-50 text-gray-400 hover:text-purple-600 active:bg-gray-100 transition-colors border-l border-gray-100 font-bold",
                                                                                        children: "+"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 391,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 377,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 370,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex justify-between items-center px-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: "text-[10px] font-black text-gray-400 uppercase tracking-tighter",
                                                                                        children: "Tablets Loose"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 403,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    item.quantity >= item.stock * item.unitsPerPack && item.quantity % item.unitsPerPack !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[9px] font-bold text-orange-500 uppercase",
                                                                                        children: "Max"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 405,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 402,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex h-10 items-stretch bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-purple-500/20 transition-all",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>updateUnifiedQuantity(item.productId, boxes, tablets - 1),
                                                                                        className: "px-3 bg-gray-50 text-gray-400 hover:text-purple-600 active:bg-gray-100 transition-colors border-r border-gray-100 font-bold",
                                                                                        children: "-"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 409,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        type: "text",
                                                                                        inputMode: "numeric",
                                                                                        value: tablets,
                                                                                        onChange: (e)=>updateUnifiedQuantity(item.productId, boxes, parseInt(e.target.value) || 0),
                                                                                        className: "w-full text-center font-black text-gray-900 border-none bg-transparent text-sm focus:ring-0 p-0"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 415,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>updateUnifiedQuantity(item.productId, boxes, tablets + 1),
                                                                                        className: "px-3 bg-gray-50 text-gray-400 hover:text-purple-600 active:bg-gray-100 transition-colors border-l border-gray-100 font-bold",
                                                                                        children: "+"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 422,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 408,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 401,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 368,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "pt-2 flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide",
                                                                        children: [
                                                                            1,
                                                                            5,
                                                                            10
                                                                        ].map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>updateUnifiedQuantity(item.productId, boxes, q),
                                                                                className: "flex-shrink-0 px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-500 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50 transition-all shadow-sm",
                                                                                children: [
                                                                                    q,
                                                                                    " T"
                                                                                ]
                                                                            }, q, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 436,
                                                                                columnNumber: 61
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 434,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-right pl-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-[10px] font-black text-purple-400 uppercase tracking-tighter leading-none mb-1",
                                                                                children: "Subtotal"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 446,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-base font-black text-purple-600 leading-none",
                                                                                children: [
                                                                                    "PKR ",
                                                                                    (item.pricePerUnit * item.quantity).toFixed(0)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 447,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 445,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 433,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, item.productId, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 45
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 334,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-t border-gray-100 pt-4 space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-500",
                                                                children: "Subtotal"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 459,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-900",
                                                                children: [
                                                                    "PKR ",
                                                                    subtotal.toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 460,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 458,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pt-2 space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-bold text-gray-500 uppercase tracking-widest",
                                                                        children: "Discount (PKR)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 464,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        value: discount,
                                                                        onChange: (e)=>setDiscount(Number(e.target.value)),
                                                                        className: "w-24 h-8 rounded-lg border border-gray-200 px-3 text-right text-sm font-bold focus:ring-2 focus:ring-purple-500/20"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 465,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 463,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between border-t border-gray-100 pt-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-lg font-black text-gray-900",
                                                                        children: "Total"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 473,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-2xl font-black text-purple-600",
                                                                        children: [
                                                                            "PKR ",
                                                                            total.toLocaleString()
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 474,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 472,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 462,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gray-50 rounded-2xl p-4 space-y-3 mt-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-black text-gray-500 uppercase tracking-widest",
                                                                        children: "Cash Received"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 480,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        placeholder: "Enter cash amount",
                                                                        value: cashPaid || "",
                                                                        onChange: (e)=>setCashPaid(Number(e.target.value)),
                                                                        className: "w-32 h-10 rounded-xl border border-gray-200 px-4 text-right text-base font-black text-green-600 focus:ring-4 focus:ring-green-500/10"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 481,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 479,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between border-t border-dashed border-gray-200 pt-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-black text-gray-400 uppercase tracking-widest",
                                                                        children: "Change Return"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 490,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xl font-black text-orange-600",
                                                                        children: [
                                                                            "PKR ",
                                                                            change.toLocaleString()
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 491,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 489,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 457,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3 mt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setCart([]),
                                                        className: "flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors",
                                                        children: "Clear"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 497,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: completeSale,
                                                        disabled: isSubmitting,
                                                        className: "flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2",
                                                        children: [
                                                            isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                className: "h-4 w-4 animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 508,
                                                                columnNumber: 57
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 508,
                                                                columnNumber: 104
                                                            }, this),
                                                            "Complete Sale"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 503,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 496,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                lineNumber: 317,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 238,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                lineNumber: 226,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SuccessModal, {
                showSuccess: showSuccess,
                total: total
            }, void 0, false, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                lineNumber: 519,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
function SuccessModal({ showSuccess, total }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: showSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-8 text-center animate-fade-in-up shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                            className: "h-8 w-8 text-green-600"
                        }, void 0, false, {
                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                            lineNumber: 532,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 531,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold text-gray-900 mb-2",
                        children: "Sale Complete!"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 534,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500",
                        children: "Invoice has been generated"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 535,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-2xl font-bold text-purple-600 mt-4",
                        children: [
                            "PKR ",
                            total.toLocaleString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 536,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                lineNumber: 530,
                columnNumber: 21
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
            lineNumber: 529,
            columnNumber: 17
        }, this)
    }, void 0, false);
}
}),
];

//# sourceMappingURL=Documents_Hospital%20Dashboard_hospital-dashboard_75a16083._.js.map