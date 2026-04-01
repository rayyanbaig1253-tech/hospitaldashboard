(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "storage",
    ()=>storage
]);
"use client";
const storage = {
    get: (key, defaultValue = [])=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const stored = localStorage.getItem(`jailwatch_clean_${key}`);
        if (!stored) return defaultValue;
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error(`Error parsing localStorage key: jailwatch_clean_${key}`, e);
            return defaultValue;
        }
    },
    set: (key, value)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        localStorage.setItem(`jailwatch_clean_${key}`, JSON.stringify(value));
        // Dispatch custom event to notify other hooks/components
        window.dispatchEvent(new Event('jailwatch_storage_change'));
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/mockData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/financialCalculations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateDashboardStats",
    ()=>calculateDashboardStats,
    "calculateFinanceSummary",
    ()=>calculateFinanceSummary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/storage.ts [app-client] (ecmascript)");
;
function calculateDashboardStats() {
    const sales = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('sales', []);
    const products = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('products', []);
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
    const sales = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('sales', []);
    const purchases = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('purchases', []);
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
    const products = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('products', []);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/hooks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useData",
    ()=>useData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/mockData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$financialCalculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/financialCalculations.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
function useData(url) {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useData.useCallback[fetchData]": ()=>{
            let key = '';
            let defaultData = [];
            if (url.includes('products')) {
                key = 'products';
                defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockProducts"];
            } else if (url.includes('sales')) {
                key = 'sales';
                defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockSales"];
            } else if (url.includes('suppliers')) {
                key = 'suppliers';
                defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockSuppliers"];
            } else if (url.includes('finance') || url.includes('reports')) {
                key = 'finance';
                defaultData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$financialCalculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateFinanceSummary"])();
            } else if (url.includes('purchases')) {
                key = 'purchases';
                defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockPurchases"];
            } else if (url.includes('alerts')) {
                key = 'alerts';
                defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockAlerts"];
            } else if (url.includes('branches')) {
                key = 'branches';
                defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockBranches"];
            } else if (url.includes('dashboard')) {
                key = 'dashboard';
                defaultData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$financialCalculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateDashboardStats"])();
            } else if (url.includes('invoices')) {
                key = 'sales';
                defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockSales"];
            } else if (url.includes('batches')) {
                key = 'batches';
                defaultData = [];
            }
            const storedData = key ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get(key, defaultData) : defaultData;
            setData(storedData);
            setLoading(false);
        }
    }["useData.useCallback[fetchData]"], [
        url
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useData.useEffect": ()=>{
            fetchData();
            // Listen for storage changes to sync data across components
            window.addEventListener('jailwatch_storage_change', fetchData);
            return ({
                "useData.useEffect": ()=>window.removeEventListener('jailwatch_storage_change', fetchData)
            })["useData.useEffect"];
        }
    }["useData.useEffect"], [
        fetchData
    ]);
    return {
        data,
        loading,
        error,
        refetch: fetchData
    };
}
_s(useData, "3VOdwmYM+Xfn1K8AA3J0x5968ms=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/imageUtils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Image compression utility for OCR and database storage
 * Target size: 250KB - 350KB
 */ __turbopack_context__.s([
    "compressImage",
    ()=>compressImage
]);
async function compressImage(imageSrc, maxWidth = 1920, maxHeight = 1920, quality = 0.7) {
    return new Promise((resolve, reject)=>{
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = ()=>{
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;
            // Calculate new dimensions (if needed)
            if (width > maxWidth || height > maxHeight) {
                if (width > height) {
                    height *= maxWidth / width;
                    width = maxWidth;
                } else {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                return reject(new Error("Could not get canvas context"));
            }
            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height);
            // Use image/jpeg for better compression of photos/invoices
            const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
            console.log(`[ImageCompression] Original dimensions: ${img.width}x${img.height}`);
            console.log(`[ImageCompression] New dimensions: ${width}x${height}`);
            console.log(`[ImageCompression] Final size: ${(compressedDataUrl.length / 1024).toFixed(2)} KB`);
            resolve(compressedDataUrl);
        };
        img.onerror = (err)=>reject(err);
        img.src = imageSrc;
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExpiryScanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/scan-line.js [app-client] (ecmascript) <export default as ScanLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clipboard$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/clipboard.js [app-client] (ecmascript) <export default as Clipboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/pill.js [app-client] (ecmascript) <export default as Pill>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/script.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$imageUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/imageUtils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const MEDICINE_KNOWLEDGE_BASE = [
    {
        name: "Ibuflam 600mg",
        manufacturer: "Lichtenstein",
        batchPrefix: "DV",
        mfgDelay: 36,
        expDelay: 24
    },
    {
        name: "Panadol CF",
        manufacturer: "GSK",
        batchPrefix: "BN",
        mfgDelay: 24,
        expDelay: 36
    },
    {
        name: "Arinac Forte",
        manufacturer: "Abbott",
        batchPrefix: "AR",
        mfgDelay: 12,
        expDelay: 24
    },
    {
        name: "Augmentin 625mg",
        manufacturer: "GSK",
        batchPrefix: "AG",
        mfgDelay: 18,
        expDelay: 24
    },
    {
        name: "Nexum 40mg",
        manufacturer: "Getz",
        batchPrefix: "NX",
        mfgDelay: 24,
        expDelay: 24
    },
    {
        name: "Softin 10mg",
        manufacturer: "Hilton",
        batchPrefix: "SF",
        mfgDelay: 12,
        expDelay: 36
    },
    {
        name: "Disprin",
        manufacturer: "Reckitt",
        batchPrefix: "DS",
        mfgDelay: 48,
        expDelay: 12
    },
    {
        name: "Brufen 400mg",
        manufacturer: "Abbott",
        batchPrefix: "BR",
        mfgDelay: 24,
        expDelay: 24
    },
    {
        name: "Flagyl 400mg",
        manufacturer: "Sanofi",
        batchPrefix: "FL",
        mfgDelay: 18,
        expDelay: 36
    },
    {
        name: "Trevia Met 50/500",
        manufacturer: "Getz",
        batchPrefix: "TM",
        mfgDelay: 12,
        expDelay: 24
    },
    {
        name: "Trevia Met 50/1000",
        manufacturer: "Getz",
        batchPrefix: "TM",
        mfgDelay: 12,
        expDelay: 24
    },
    {
        name: "Caldib-C",
        manufacturer: "GSK",
        batchPrefix: "CD",
        mfgDelay: 12,
        expDelay: 12
    }
];
function formatDateToISO(date) {
    return date.toISOString().split('T')[0];
}
function ExpiryScanner({ onScanComplete, onClose, productName }) {
    _s();
    const [scanning, setScanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scannedItems, setScannedItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showConfirmation, setShowConfirmation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [manualMode, setManualMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Clipboard Paste Support
    const handlePaste = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ExpiryScanner.useCallback[handlePaste]": async (e)=>{
            const item = e.clipboardData?.items[0];
            if (item?.type.startsWith('image/')) {
                const file = item.getAsFile();
                if (file) {
                    const reader = new FileReader();
                    reader.onload = ({
                        "ExpiryScanner.useCallback[handlePaste]": async (event)=>{
                            const originalBase64 = event.target?.result;
                            try {
                                const compressedBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$imageUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compressImage"])(originalBase64);
                                simulateScan(compressedBase64, "pasted_image_context");
                            } catch (err) {
                                console.error("Compression failed, using original:", err);
                                simulateScan(originalBase64, "pasted_image_context");
                            }
                        }
                    })["ExpiryScanner.useCallback[handlePaste]"];
                    reader.readAsDataURL(file);
                }
            }
        }
    }["ExpiryScanner.useCallback[handlePaste]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExpiryScanner.useEffect": ()=>{
            window.addEventListener('paste', handlePaste);
            return ({
                "ExpiryScanner.useEffect": ()=>window.removeEventListener('paste', handlePaste)
            })["ExpiryScanner.useEffect"];
        }
    }["ExpiryScanner.useEffect"], [
        handlePaste
    ]);
    // IMAGE PREPROCESSING ENGINE
    const preprocessImage = async (imageSrc)=>{
        return new Promise((resolve)=>{
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = ()=>{
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return resolve(imageSrc);
                // Target size for OCR optimization
                const scale = Math.min(1.5, 2000 / Math.max(img.width, img.height));
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                // Apply High Contrast Grayscale
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                for(let i = 0; i < data.length; i += 4){
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const avg = 0.299 * r + 0.587 * g + 0.114 * b;
                    // Dynamic thresholding for sharper text
                    const val = avg > 140 ? 255 : 0;
                    data[i] = data[i + 1] = data[i + 2] = val;
                }
                ctx.putImageData(imageData, 0, 0);
                resolve(canvas.toDataURL('image/png', 1.0));
            };
            img.onerror = ()=>resolve(imageSrc);
            img.src = imageSrc;
        });
    };
    // Enhanced Fuzzy Neural Text Parser
    const parseDetectedText = (text)=>{
        // 0. Normalize: Clean noisy OCR output
        const cleanText = text.replace(/[\n\t\r]/g, ' ').replace(/\s+/g, ' ');
        const upperText = cleanText.toUpperCase();
        let name = "Unknown Medicine";
        let batch = "NOT DETECTED";
        let mfg = ""; // Empty instead of today's date
        let exp = ""; // Empty instead of today's date
        // 1. SMART NAME DETECTION (Fuzzy)
        for (const item of MEDICINE_KNOWLEDGE_BASE){
            const brand = item.name.split(' ')[0].toLowerCase();
            if (cleanText.toLowerCase().includes(brand)) {
                name = item.name;
                break;
            }
        }
        // 2. ADVANCED BATCH DETECTION (Pattern matching)
        // Hierarchy: 1. Strict Prefixes, 2. Loose Prefixes, 3. Alphanumeric Strings near dates
        const strictBatchRegex = /(?:[Bb][Aa][Tt][Cc][Hh]|[Ll][Oo][Tt]|[Cc][Hh][.-]?[Bb]|[Bb][.-][Nn][Oo])[.\s]*[:\-]?[\s]*([A-Z0-9-]{3,15})/i;
        const looseBatchRegex = /\b(?:BN|CN|LOT|B\/N|C\.No)[:\s]*([A-Z0-9-]{3,15})/i;
        const sbMatch = cleanText.match(strictBatchRegex);
        const lbMatch = cleanText.match(looseBatchRegex);
        if (sbMatch && sbMatch[1]) {
            batch = sbMatch[1].trim();
        } else if (lbMatch && lbMatch[1]) {
            batch = lbMatch[1].trim();
        } else {
            // Context-Aware Fallback: Find ALL potential codes (3-15 chars) but filter them
            const potentialCodes = Array.from(cleanText.matchAll(/\b([A-Z0-9-]{3,15})\b/g));
            const medicineNameWords = MEDICINE_KNOWLEDGE_BASE.map((m)=>m.name.split(' ')[0].toLowerCase());
            const garbageWords = [
                'TABLETS',
                'TABLET',
                'CAPSULES',
                'DOSAGE',
                'KEEP',
                'PLACE',
                'REACH',
                'CHILDREN',
                'STRIPS',
                'STRIP',
                'PRICE',
                'PKR',
                'EXP',
                'MFG',
                'DATE'
            ];
            for (const match of potentialCodes){
                const code = match[1].trim();
                const lowerCode = code.toLowerCase();
                // Skip if it's a known medicine name word
                if (medicineNameWords.includes(lowerCode)) continue;
                // Skip if it's common box text
                if (garbageWords.some((w)=>lowerCode.includes(w.toLowerCase()))) continue;
                // Skip if it's just a year or month (already handled by dates)
                if (/^\d{2}$/.test(code) || /^\d{4}$/.test(code)) continue;
                // If it contains at least one digit and passes filters, it's likely the batch
                if (/[0-9]/.test(code)) {
                    batch = code;
                    break;
                }
            }
        }
        // 3. ADVANCED DATE PARSING (Temporal Logic & Pharma Prefixes)
        const allDates = [];
        // Pharma specific keywords to help context
        const mfgPrefixes = [
            'MFG',
            'MANF',
            'M:',
            'M/G'
        ];
        const expPrefixes = [
            'EXP',
            'ED:',
            'E:',
            'EXPD'
        ];
        const batchPrefixes = [
            'B:',
            'BN:',
            'L:',
            'BATCH',
            'LOT'
        ];
        // Pattern 1: DD/MM/YYYY or DD-MM-YY (Full Dates)
        const fullDateRegex = /\b(\d{1,2})[\s\/\.\-]+(\d{1,2})[\s\/\.\-]+(\d{2,4})\b/g;
        let fdMatch;
        while((fdMatch = fullDateRegex.exec(cleanText)) !== null){
            let day = parseInt(fdMatch[1]);
            let month = parseInt(fdMatch[2]);
            let year = parseInt(fdMatch[3]);
            if (month > 12 && day <= 12) {
                [day, month] = [
                    month,
                    day
                ];
            }
            if (year < 100) year += 2000;
            if (month >= 1 && month <= 12 && year > 2020 && year < 2045) {
                // Check immediate context (20 chars before) for prefixes
                const context = cleanText.substring(Math.max(0, fdMatch.index - 20), fdMatch.index).toUpperCase();
                let prefix = "";
                if (mfgPrefixes.some((p)=>context.includes(p))) prefix = "mfg";
                if (expPrefixes.some((p)=>context.includes(p))) prefix = "exp";
                allDates.push({
                    year,
                    month,
                    day,
                    index: fdMatch.index,
                    prefix
                });
            }
        }
        // Pattern 2: MM/YYYY or MM.YYYY (Month/Year fallback)
        const partialDateRegex = /\b(\d{1,2})[\s\/\.\-]+(\d{2,4})\b/g;
        let pdMatch;
        while((pdMatch = partialDateRegex.exec(cleanText)) !== null){
            let month = parseInt(pdMatch[1]);
            let year = parseInt(pdMatch[2]);
            if (month > 1000) {
                [month, year] = [
                    year,
                    month
                ];
            }
            if (year < 100) year += 2000;
            const currentIndex = pdMatch.index;
            const isPart = allDates.some((ad)=>Math.abs(ad.index - currentIndex) < 10);
            if (!isPart && month >= 1 && month <= 12 && year > 2020 && year < 2045) {
                const context = cleanText.substring(Math.max(0, currentIndex - 15), currentIndex).toUpperCase();
                let prefix = "";
                if (mfgPrefixes.some((p)=>context.includes(p))) prefix = "mfg";
                if (expPrefixes.some((p)=>context.includes(p))) prefix = "exp";
                allDates.push({
                    year,
                    month,
                    day: 28,
                    index: currentIndex,
                    prefix
                });
            }
        }
        if (allDates.length > 0) {
            // Priority 1: Use Prefixes
            const mfgMatch = allDates.find((d)=>d.prefix === "mfg");
            const expMatch = allDates.find((d)=>d.prefix === "exp");
            if (expMatch) {
                exp = `${expMatch.year}-${String(expMatch.month).padStart(2, '0')}-${String(expMatch.day).padStart(2, '0')}`;
            }
            if (mfgMatch) {
                mfg = `${mfgMatch.year}-${String(mfgMatch.month).padStart(2, '0')}-${String(mfgMatch.day).padStart(2, '0')}`;
            }
            // Priority 2: Fallback to temporal order if prefixes missing
            if (!exp || !mfg) {
                allDates.sort((a, b)=>a.year * 400 + a.month * 32 + a.day - (b.year * 400 + b.month * 32 + b.day));
                if (!exp) {
                    const latest = allDates[allDates.length - 1];
                    exp = `${latest.year}-${String(latest.month).padStart(2, '0')}-${String(latest.day).padStart(2, '0')}`;
                }
                if (!mfg && allDates.length >= 2) {
                    const earliest = allDates[0];
                    if (earliest !== allDates[allDates.length - 1]) {
                        mfg = `${earliest.year}-${String(earliest.month).padStart(2, '0')}-${String(earliest.day).padStart(2, '0')}`;
                    }
                }
            }
        }
        return {
            name,
            batch,
            mfg,
            exp,
            mrp: null
        }; // Add mrp: null as fallback
    };
    // Real OCR Scanning using Tesseract.js
    const simulateScan = async (imageData, fileName)=>{
        setScanning(true);
        try {
            const source = imageData || "https://tesseract.projectnaptha.com/img/eng_bw.png";
            // Try specialized Carton OCR API
            const response = await fetch('/api/ocr/carton', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: source
                })
            });
            let filteredText = "";
            let result = null;
            if (response.ok) {
                result = await response.json();
                // Special case: Carton API returns structured data directly
                if (result.data && !result.data.text) {
                    filteredText = `Batch: ${result.data.batchNo} Exp: ${result.data.expiryDate}`;
                } else {
                    filteredText = result.data.text || "";
                }
            } else {
                // Fallback to Tesseract.js
                console.warn('Professional OCR API failed, falling back to local Tesseract');
                if (!window.Tesseract) throw new Error("Tesseract not ready");
                const processedImage = await preprocessImage(source);
                const result = await window.Tesseract.recognize(processedImage, 'eng');
                filteredText = result.data.text;
            }
            console.log("OCR Result Text:", filteredText);
            const parsed = parseDetectedText(filteredText);
            const detected = [
                {
                    id: Math.random().toString(36).substr(2, 9),
                    productName: result.data.productName || (parsed.name === "Unknown Medicine" && fileName ? fileName.split('.')[0] : parsed.name),
                    batchNo: result.data.batchNo || parsed.batch,
                    mfgDate: result.data.mfgDate || parsed.mfg || formatDateToISO(new Date(new Date().setFullYear(new Date().getFullYear() - 1))),
                    expiryDate: result.data.expiryDate || parsed.exp || formatDateToISO(new Date(new Date().setFullYear(new Date().getFullYear() + 2))),
                    mrp: result.data.mrp || null
                }
            ];
            setScannedItems(detected);
            setShowConfirmation(true);
        } catch (error) {
            console.error("Scanning Error:", error);
            const detected = [
                {
                    id: Math.random().toString(36).substr(2, 9),
                    productName: productName || (fileName ? fileName.split('.')[0] : "Medicine Box"),
                    batchNo: "BATCH-SCAN-PENDING",
                    mfgDate: "2024-01-01",
                    expiryDate: "2026-12-31",
                    mrp: null
                }
            ];
            setScannedItems(detected);
            setShowConfirmation(true);
        } finally{
            setScanning(false);
        }
    };
    const handleFileUpload = (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event)=>{
                const originalBase64 = event.target?.result;
                try {
                    const compressedBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$imageUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compressImage"])(originalBase64);
                    simulateScan(compressedBase64, file.name);
                } catch (err) {
                    console.error("Compression failed, using original:", err);
                    simulateScan(originalBase64, file.name);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const handleConfirm = ()=>{
        onScanComplete(scannedItems);
        onClose();
    };
    const removeItem = (id)=>{
        setScannedItems(scannedItems.filter((item)=>item.id !== id));
    };
    const updateItem = (id, field, value)=>{
        setScannedItems(scannedItems.map((item)=>item.id === id ? {
                ...item,
                [field]: field === 'mrp' ? parseFloat(value) || null : value
            } : item));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/70 backdrop-blur-md z-[200] flex items-center justify-center p-4 overflow-y-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js",
                strategy: "lazyOnload",
                onLoad: ()=>console.log("Tesseract Script Loaded")
            }, void 0, false, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                lineNumber: 376,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl animate-fade-in-up relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-black text-gray-900 uppercase tracking-tight",
                                        children: "AI Multi-Vision Scanner"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 384,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500 font-medium",
                                        children: "Auto-detecting medicines, batches, and expiries."
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 385,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 383,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-3 hover:bg-gray-100 rounded-2xl transition-all",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-6 w-6 text-gray-400"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                    lineNumber: 388,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 387,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                        lineNumber: 382,
                        columnNumber: 17
                    }, this),
                    !scanning && !showConfirmation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-purple-50 border border-purple-100 rounded-3xl p-6 flex items-start gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 bg-white rounded-2xl shadow-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clipboard$3e$__["Clipboard"], {
                                            className: "h-6 w-6 text-purple-600"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                            lineNumber: 396,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 395,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-black text-xs text-purple-600 uppercase tracking-widest mb-1",
                                                children: "Clipboard Ready"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 399,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-purple-800/70 font-medium leading-relaxed",
                                                children: "You can now **simply paste (Ctrl+V)** any image you have copied directly into this window."
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 400,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 398,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 394,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>fileInputRef.current?.click(),
                                        className: "group flex flex-col items-center justify-center p-10 border-4 border-dashed border-gray-100 rounded-[2.5rem] hover:border-purple-400 hover:bg-purple-50 transition-all",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-5 bg-white rounded-3xl shadow-sm mb-4 group-hover:scale-110 transition-transform",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                    className: "h-8 w-8 text-purple-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                    lineNumber: 410,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 409,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-black text-gray-900 uppercase text-xs tracking-widest",
                                                children: "Select Image"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 412,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 405,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>simulateScan(),
                                        className: "group flex flex-col items-center justify-center p-10 border-4 border-dashed border-gray-100 rounded-[2.5rem] hover:border-blue-400 hover:bg-blue-50 transition-all",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-5 bg-white rounded-3xl shadow-sm mb-4 group-hover:scale-110 transition-transform",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                    className: "h-8 w-8 text-blue-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                    lineNumber: 420,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 419,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-black text-gray-900 uppercase text-xs tracking-widest",
                                                children: "Life Camera"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 422,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 415,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 404,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: fileInputRef,
                                type: "file",
                                accept: "image/*",
                                onChange: handleFileUpload,
                                className: "hidden"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 426,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                        lineNumber: 393,
                        columnNumber: 21
                    }, this),
                    scanning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center py-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 439,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "h-20 w-20 text-purple-600 animate-spin relative z-10"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 440,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__["ScanLine"], {
                                        className: "h-10 w-10 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 441,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 438,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-xl font-black text-gray-900 uppercase tracking-tight",
                                children: "De-constructing Image..."
                            }, void 0, false, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 443,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 mt-2 font-medium",
                                children: "Scanning for medicine names and data stamps"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 444,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                        lineNumber: 437,
                        columnNumber: 21
                    }, this),
                    showConfirmation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6 animate-fade-in",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-black text-gray-900 uppercase text-sm tracking-widest",
                                        children: [
                                            "Detected (",
                                            scannedItems.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 451,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            const knowledgeItem = MEDICINE_KNOWLEDGE_BASE[0];
                                            setScannedItems([
                                                ...scannedItems,
                                                {
                                                    id: Math.random().toString(36).substr(2, 9),
                                                    productName: knowledgeItem.name,
                                                    batchNo: "B" + Math.floor(1000 + Math.random() * 9000),
                                                    mfgDate: formatDateToISO(new Date()),
                                                    expiryDate: formatDateToISO(new Date()),
                                                    mrp: null
                                                }
                                            ]);
                                        },
                                        className: "text-xs font-black text-purple-600 uppercase flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 463,
                                                columnNumber: 33
                                            }, this),
                                            " Add Item"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 452,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 450,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar",
                                children: scannedItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-5 bg-gray-50/50 rounded-3xl border border-gray-100 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-2 bg-white rounded-xl shadow-sm",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__["Pill"], {
                                                            className: "h-4 w-4 text-purple-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                            lineNumber: 472,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: item.productName,
                                                        onChange: (e)=>updateItem(item.id, 'productName', e.target.value),
                                                        placeholder: "Medicine Name",
                                                        className: "flex-1 bg-transparent border-0 font-black text-gray-900 uppercase text-sm focus:ring-0 outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                        lineNumber: 474,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>removeItem(item.id),
                                                        className: "p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                            lineNumber: 481,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                        lineNumber: 480,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 470,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block",
                                                                children: "Batch No"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                                lineNumber: 486,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: item.batchNo,
                                                                onChange: (e)=>updateItem(item.id, 'batchNo', e.target.value),
                                                                className: "w-full bg-white border-0 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500/10"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                                lineNumber: 487,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                        lineNumber: 485,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block",
                                                                children: "MFG Date"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                                lineNumber: 494,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "date",
                                                                value: item.mfgDate,
                                                                onChange: (e)=>updateItem(item.id, 'mfgDate', e.target.value),
                                                                className: "w-full bg-white border-0 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500/10"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                                lineNumber: 495,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                        lineNumber: 493,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block",
                                                                children: "Expiry Date"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                                lineNumber: 503,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "date",
                                                                value: item.expiryDate,
                                                                onChange: (e)=>updateItem(item.id, 'expiryDate', e.target.value),
                                                                className: "w-full bg-white border-0 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500/10"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                                lineNumber: 504,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                        lineNumber: 502,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 484,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 block",
                                                        children: "Retail Price (MRP)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                        lineNumber: 513,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-bold text-gray-400",
                                                                children: "PKR"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                                lineNumber: 515,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                value: item.mrp || "",
                                                                onChange: (e)=>updateItem(item.id, 'mrp', e.target.value),
                                                                placeholder: "0.00",
                                                                className: "flex-1 bg-white border-0 rounded-xl px-4 py-2 text-xs font-black text-blue-600 shadow-sm focus:ring-2 focus:ring-blue-500/10"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                                lineNumber: 516,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                        lineNumber: 514,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 512,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 469,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 467,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 pt-4 sticky bottom-0 bg-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowConfirmation(false),
                                        className: "flex-1 py-4 text-gray-400 font-black uppercase text-xs tracking-widest",
                                        children: "Rescan"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 530,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleConfirm,
                                        className: "flex-2 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-purple-200",
                                        children: "Import Detected Stock"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 531,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 529,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                        lineNumber: 449,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                lineNumber: 381,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
        lineNumber: 375,
        columnNumber: 9
    }, this);
}
_s(ExpiryScanner, "fySqdMgd0QxUoIiYfkpGt+bP4kE=");
_c = ExpiryScanner;
var _c;
__turbopack_context__.k.register(_c, "ExpiryScanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PurchasesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/scan-line.js [app-client] (ecmascript) <export default as ScanLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$components$2f$expiry$2f$ExpiryScanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/script.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$imageUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/imageUtils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const getSimilarity = (s1, s2)=>{
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    if (longer.length === 0) return 1.0;
    const bigrams = (str)=>{
        const result = [];
        for(let i = 0; i < str.length - 1; i++)result.push(str.slice(i, i + 2));
        return result;
    };
    const s1Bigrams = bigrams(s1.toLowerCase());
    const s2Bigrams = bigrams(s2.toLowerCase());
    let intersection = 0;
    s1Bigrams.forEach((bg1)=>{
        if (s2Bigrams.includes(bg1)) intersection++;
    });
    return 2.0 * intersection / (s1Bigrams.length + s2Bigrams.length);
};
function PurchasesPage() {
    _s();
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isScanning, setIsScanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showScanner, setShowScanner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentScanIdx, setCurrentScanIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [aiLoading, setAiLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAiSupplierMatched, setIsAiSupplierMatched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAiInvMatched, setIsAiInvMatched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAiDateMatched, setIsAiDateMatched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadingText, setLoadingText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Analyzing Invoice...");
    const [loadingSubText, setLoadingSubText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Extracting medicines, quantities, and prices");
    const [isScanningCarton, setIsScanningCarton] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [detectedSupplierName, setDetectedSupplierName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [detectedInvoiceNo, setDetectedInvoiceNo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [detectedDate, setDetectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { data: suppliers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"])("/api/suppliers");
    const { data: products } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"])("/api/products");
    const { data: purchaseHistory, refetch: refetchHistory } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"])("/api/purchases");
    const handleDeletePurchase = (id)=>{
        if (confirm("Are you sure you want to delete this purchase record?")) {
            const currentPurchases = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('purchases', []);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('purchases', currentPurchases.filter((p)=>p.id !== id));
            refetchHistory();
            alert("Purchase record deleted.");
        }
    };
    const [formItems, setFormItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [invoiceNo, setInvoiceNo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedSupplierId, setSelectedSupplierId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [shipmentDate, setShipmentDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date().toISOString().split('T')[0]);
    // Debug: Monitor formItems changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PurchasesPage.useEffect": ()=>{
            console.log('🔍 formItems STATE CHANGED:', formItems);
            console.log('🔍 Total items in state:', formItems.length);
            if (formItems.length > 0) {
                console.log('🔍 First item data:', {
                    qty: formItems[0].quantity,
                    bonus: formItems[0].bonusQty,
                    rate: formItems[0].purchasePrice,
                    batch: formItems[0].batchNo
                });
            }
        }
    }["PurchasesPage.useEffect"], [
        formItems
    ]);
    const preprocessImage = async (imageSrc)=>{
        return new Promise((resolve)=>{
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = ()=>{
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return resolve(imageSrc);
                const scale = Math.min(1.5, 2000 / Math.max(img.width, img.height));
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/png', 1.0));
                if (isScanningCarton) {
                    setLoadingText("Scanning Carton...");
                    setLoadingSubText("Detecting Expiry, MFG, and Batch Details");
                } else {
                    setLoadingText("Analyzing Invoice...");
                    setLoadingSubText("Extracting medicines, quantities, and prices");
                }
                setAiLoading(true);
            };
            img.onerror = ()=>{
                console.error("Image load failed");
                resolve(imageSrc);
            };
            img.src = imageSrc;
        });
    };
    const processAIInvoice = async (imageData)=>{
        setAiLoading(true);
        try {
            setLoadingText("🚀 Professional OCR Processing...");
            setLoadingSubText("Using advanced Gemini AI for maximum accuracy");
            const response = await fetch('/api/ocr/invoice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: imageData
                })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'OCR failed');
            }
            const result = await response.json();
            const data = result.data;
            if (data.items && data.items.length > 0) {
                const formatted = data.items.map((item)=>{
                    const matchingProduct = products?.find((p)=>p.name.toLowerCase().includes(item.name.toLowerCase()) || item.name.toLowerCase().includes(p.name.toLowerCase()));
                    const qtyVal = parseFloat(item.qty) || 0;
                    const bonusVal = parseFloat(item.bonus) || 0;
                    const rateVal = parseFloat(item.rate) || 0;
                    const discPctVal = parseFloat(item.discountPercent) || 0;
                    const taxPctVal = parseFloat(item.taxPercent) || 0;
                    const brand = item.brand || "Unknown Brand";
                    const category = item.category || "Others";
                    // Simple logic for net if AI didn't provide it or if we want to be safe
                    const gross = qtyVal * rateVal;
                    const discAmt = gross * discPctVal / 100;
                    const taxAmt = (gross - discAmt) * taxPctVal / 100;
                    const netVal = parseFloat(item.net) || gross - discAmt + taxAmt;
                    const totalQtyVal = qtyVal + bonusVal;
                    return {
                        id: Math.random().toString(36).substr(2, 9),
                        productId: matchingProduct?.id || "",
                        name: matchingProduct?.name || item.name,
                        tempScannedName: item.name,
                        batchNo: item.batch || "B-NEW",
                        mfgDate: item.mfgDate || "",
                        expiryDate: item.expiry || "2026-12-01",
                        quantity: qtyVal,
                        bonusQty: bonusVal,
                        totalQty: totalQtyVal,
                        purchasePrice: rateVal,
                        discountPercent: discPctVal.toFixed(2),
                        taxPercent: taxPctVal.toFixed(2),
                        netAmount: netVal,
                        effectiveCost: totalQtyVal > 0 ? netVal / totalQtyVal : rateVal,
                        remarks: item.remarks || (discPctVal > 0 ? `Disc: ${discPctVal}%` : "✨ Gemini AI Mapped"),
                        packing: matchingProduct?.packing || "Unit",
                        brand: brand,
                        category: category
                    };
                });
                setFormItems(formatted);
                if (data.invoiceNo) setInvoiceNo(data.invoiceNo);
                if (data.date) setShipmentDate(data.date);
                if (data.supplierName) setDetectedSupplierName(data.supplierName);
                alert(`✅ SUCCESS: Gemini AI found ${formatted.length} items.`);
            } else {
                throw new Error("Gemini could not find any items in the invoice.");
            }
        } catch (error) {
            console.error('OCR Grid Error:', error);
            alert(`Vision Error: ${error.message}`);
        } finally{
            setAiLoading(false);
        }
    };
    const handleSavePurchase = async (e)=>{
        e.preventDefault();
        setIsSubmitting(true);
        const currentProducts = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('products', []);
        let updatedProducts = [
            ...currentProducts
        ];
        let hasNewProducts = false;
        // AUTO-CREATE MISSING PRODUCTS
        const updatedFormItems = formItems.map((item)=>{
            if (!item.productId) {
                const newProductId = Math.random().toString(36).substr(2, 9);
                const newProduct = {
                    id: newProductId,
                    name: item.name,
                    brand: item.brand || "Unknown Brand",
                    category: item.category || "Others",
                    unitsPerPack: 1,
                    stock: 0,
                    salePrice: item.purchasePrice * 1.2,
                    batches: []
                };
                updatedProducts.push(newProduct);
                hasNewProducts = true;
                return {
                    ...item,
                    productId: newProductId
                };
            }
            return item;
        });
        if (hasNewProducts) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('products', updatedProducts);
            console.log('🚀 Automatically created new products:', updatedProducts.filter((p)=>!currentProducts.find((cp)=>cp.id === p.id)).map((p)=>p.name));
        }
        // Use the updated form items with new product IDs for the rest of the logic
        const finalFormItems = updatedFormItems;
        // STEP 2: HARD BACKEND VALIDATION & PROTECTION 🛡️
        try {
            finalFormItems.forEach((item, idx)=>{
                let qty = parseFloat(item.quantity) || 0;
                let bonus = parseFloat(item.bonusQty) || 0;
                // Rule: If Purch Qty is 0/Null, check if there's a rescue (Already done in UI but double check)
                // If the user manually cleared it to 0, we must warn.
                const totalQty = qty + bonus;
                if (totalQty <= 0) {
                    throw new Error(`Row ${idx + 1} (${item.name}) has VALIDATION ERROR: Total Quantity is 0.\n\nPlease enter a valid Purchase Qty or Bonus.`);
                }
            });
        } catch (error) {
            alert(`⚠️ VALIDATION FAILED\n\n${error.message}`);
            setIsSubmitting(false);
            return;
        }
        let currentSupplierId = selectedSupplierId;
        let selectedSupplier = suppliers?.find((s)=>s.id === selectedSupplierId);
        // AUTO-CREATE NEW SUPPLIER IF DETECTED
        if (!currentSupplierId && detectedSupplierName) {
            const newSupplier = {
                id: Date.now().toString(),
                name: detectedSupplierName,
                phone: "OCR-EXTRACTED",
                email: "auto@supplier.com",
                address: "Extracted from Image",
                totalOrders: 1,
                lastOrder: new Date().toISOString(),
                status: 'Active'
            };
            const currentSuppliers = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('suppliers', []);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('suppliers', [
                ...currentSuppliers,
                newSupplier
            ]);
            currentSupplierId = newSupplier.id;
            selectedSupplier = newSupplier;
            console.log('🚀 Automatically created and assigned new supplier:', detectedSupplierName);
        }
        if (!currentSupplierId) {
            alert("Please select a supplier or ensure one is detected from the invoice.");
            setIsSubmitting(false);
            return;
        }
        const newPurchase = {
            id: Date.now().toString(),
            invoiceNo: invoiceNo,
            date: shipmentDate,
            supplier: {
                id: currentSupplierId,
                name: selectedSupplier?.name || "Unknown Supplier"
            },
            items: finalFormItems.map((item)=>{
                const qty = parseFloat(item.quantity) || 0;
                const bonus = parseFloat(item.bonusQty) || 0;
                const price = parseFloat(item.purchasePrice) || 0;
                const totalQty = qty + bonus;
                // Discount & Tax Logic
                const discountPercent = parseFloat(item.discountPercent) || 0;
                const taxPercent = parseFloat(item.taxPercent) || 0;
                const grossAmount = qty * price;
                const discountAmount = grossAmount * discountPercent / 100;
                const taxableAmount = grossAmount - discountAmount;
                const taxAmount = taxableAmount * taxPercent / 100;
                const netAmount = taxableAmount + taxAmount;
                const effectiveCost = totalQty > 0 ? netAmount / totalQty : 0;
                return {
                    ...item,
                    product: products?.find((p)=>p.id === item.productId),
                    purchQty: qty,
                    bonusQty: bonus,
                    totalQty: totalQty,
                    discountPercent: discountPercent,
                    discountAmount: discountAmount,
                    taxPercent: taxPercent,
                    taxAmount: taxAmount,
                    netAmount: netAmount,
                    effectiveCost: effectiveCost
                };
            }),
            total: 0 // Will be recalculated below
        };
        // Recalculate Total
        newPurchase.total = newPurchase.items.reduce((sum, item)=>sum + item.netAmount, 0);
        setTimeout(()=>{
            // 1. Save to Purchase History
            const currentPurchases = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('purchases', []);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('purchases', [
                newPurchase,
                ...currentPurchases
            ]);
            // 2. Update Batch Ledger (The primary source of truth)
            const currentBatches = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('batches', []);
            const newBatches = [
                ...currentBatches
            ];
            newPurchase.items.forEach((item)=>{
                // Add new batch record
                newBatches.push({
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                    productId: item.productId,
                    batchNo: item.batchNo,
                    mfgDate: item.mfgDate,
                    expiryDate: item.expiryDate,
                    // Detailed Financials
                    purchQty: item.purchQty,
                    bonusQty: item.bonusQty,
                    quantity: item.totalQty,
                    rate: parseFloat(item.purchasePrice) || 0,
                    purchasePrice: parseFloat(item.purchasePrice) || 0,
                    discountPercent: item.discountPercent,
                    discountAmount: item.discountAmount,
                    taxPercent: item.taxPercent,
                    taxAmount: item.taxAmount,
                    netAmount: item.netAmount,
                    effectiveUnitCost: item.effectiveCost,
                    purchaseId: newPurchase.id,
                    createdAt: new Date().toISOString()
                });
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('batches', newBatches);
            // 3. Update Product Stock & Batches (For high-level viewing)
            const updatedProductsWithStock = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('products', updatedProducts).map((p)=>{
                const purchasedItems = finalFormItems.filter((item)=>item.productId === p.id);
                if (purchasedItems.length > 0) {
                    const addedTotal = purchasedItems.reduce((sum, item)=>sum + (parseFloat(item.quantity) || 0) + (parseFloat(item.bonusQty) || 0), 0);
                    // Add new batches to the product's own batches array for display in the Products grid
                    const newProductBatches = purchasedItems.map((item)=>({
                            id: Math.random().toString(36).substr(2, 9),
                            batchNo: item.batchNo,
                            mfgDate: item.mfgDate,
                            expiryDate: item.expiryDate,
                            quantity: (parseFloat(item.quantity) || 0) + (parseFloat(item.bonusQty) || 0)
                        }));
                    return {
                        ...p,
                        stock: (p.stock || 0) + addedTotal,
                        batches: [
                            ...newProductBatches,
                            ...p.batches || []
                        ] // Push to front so newest shows first
                    };
                }
                return p;
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('products', updatedProductsWithStock);
            // 4. Update Supplier Stats
            const currentSuppliers = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('suppliers', []);
            const updatedSuppliers = currentSuppliers.map((s)=>{
                if (s.id === currentSupplierId) {
                    return {
                        ...s,
                        totalOrders: (Number(s.totalOrders) || 0) + 1,
                        lastOrder: new Date().toISOString()
                    };
                }
                return s;
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('suppliers', updatedSuppliers);
            setShowForm(false);
            setFormItems([]);
            setIsSubmitting(false);
            alert("Batch Ledger Updated: Stock has been recorded per batch for full auditability.");
        }, 800);
    };
    const addItem = ()=>{
        setFormItems([
            ...formItems,
            {
                productId: "",
                batchNo: "",
                mfgDate: "",
                expiryDate: "",
                quantity: 0,
                bonusQty: 0,
                purchasePrice: 0,
                discountPercent: 0,
                taxPercent: 0,
                remarks: ""
            }
        ]);
    };
    const removeItem = (idx)=>{
        setFormItems(formItems.filter((_, i)=>i !== idx));
    };
    const handleScanComplete = (data)=>{
        if (!data || currentScanIdx === null) return;
        // If data is array (from ExpiryScanner), use it directly
        if (Array.isArray(data) && data.length > 0) {
            const scanned = data[0]; // Take first item (since we scan one row at a time)
            const n = [
                ...formItems
            ];
            if (scanned.batchNo && scanned.batchNo !== "BATCH-SCAN-PENDING") n[currentScanIdx].batchNo = scanned.batchNo;
            if (scanned.expiryDate) n[currentScanIdx].expiryDate = scanned.expiryDate;
            if (scanned.mfgDate) n[currentScanIdx].mfgDate = scanned.mfgDate;
            if (scanned.mrp) n[currentScanIdx].purchasePrice = scanned.mrp; // Map MRP to purchase price as a starting point
            setFormItems(n);
            setShowScanner(false);
            if (scanned.expiryDate) alert(`✨ AI Detected Expiry: ${scanned.expiryDate}`);
            setCurrentScanIdx(null);
            return;
        }
        // Fallback for legacy raw image data (if ever used)
        setIsScanningCarton(true);
        setAiLoading(true);
        // ... (Legacy logic preserved just in case, or removed if redundant)
        // Since ExpiryScanner now returns objects, we can likely skip the OCR here 
        // OR warn that legacy mode is deprecated.
        console.warn("Received raw data in handleScanComplete, expected ScannedItem[]");
        setAiLoading(false);
        setShowScanner(false);
    };
    const formatDetectedDate = (raw)=>{
        const parts = raw.split(/[\/\-\.]/);
        // Ensure parts are 2-digits or 4-digits
        const cleanParts = parts.map((p)=>p.trim().padStart(2, '0'));
        if (cleanParts.length === 2) {
            // MM/YY or MM/YYYY
            const month = cleanParts[0];
            const year = cleanParts[1].length === 2 ? `20${cleanParts[1]}` : cleanParts[1];
            return `${year}-${month}-01`;
        } else if (cleanParts.length === 3) {
            // DD/MM/YY or DD/MM/YYYY or MM/DD/YYYY
            let day = cleanParts[0];
            let month = cleanParts[1];
            let year = cleanParts[2].length === 2 ? `20${cleanParts[2]}` : cleanParts[2];
            // Heuristic for PKR/International: Try to identify if part[1] is definitely a month
            const p0 = parseInt(day);
            const p1 = parseInt(month);
            if (p0 > 12 && p1 <= 12) {
            // Definitely DD-MM-YYYY
            } else if (p1 > 12 && p0 <= 12) {
                // Likely MM-DD-YYYY
                const tmp = day;
                day = month;
                month = tmp;
            }
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        return "";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-8 animate-fade-in-up",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-black text-gray-900 uppercase tracking-tight",
                                        children: "IR Procurement"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                        lineNumber: 525,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 mt-1 font-medium",
                                        children: "Record new inventory shipments and track purchase history."
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                        lineNumber: 526,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                lineNumber: 524,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setShowForm(true);
                                    if (formItems.length === 0) addItem();
                                },
                                className: "btn-primary flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                        lineNumber: 535,
                                        columnNumber: 25
                                    }, this),
                                    "New Purchase Record"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                lineNumber: 528,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                        lineNumber: 523,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-premium rounded-3xl overflow-hidden border-0 shadow-2xl shadow-purple-100/50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-white",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                lineNumber: 544,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-bold uppercase tracking-tight",
                                                children: "Recent Purchases"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                lineNumber: 545,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                        lineNumber: 543,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-64",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                lineNumber: 548,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Search invoices...",
                                                className: "w-full bg-white/10 border border-white/20 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/50 focus:bg-white/20 transition-all outline-none"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                lineNumber: 549,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                        lineNumber: 547,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                lineNumber: 542,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "bg-gray-50/50 border-b border-gray-100",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                        children: "Invoice #"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 560,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                        children: "Supplier"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 561,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                        children: "Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 562,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                        children: "Items"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 563,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                        children: "Total Value"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 564,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right",
                                                        children: "Actions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 565,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                lineNumber: 559,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                            lineNumber: 558,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "divide-y divide-gray-50",
                                            children: [
                                                purchaseHistory?.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "hover:bg-purple-50/30 transition-colors group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6 font-black text-gray-900",
                                                                children: p.invoiceNo
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 571,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-xs uppercase",
                                                                            children: p.supplier.name.charAt(0)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                            lineNumber: 574,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-semibold text-gray-700",
                                                                            children: p.supplier.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                            lineNumber: 577,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 573,
                                                                    columnNumber: 45
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 572,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6 text-sm text-gray-500 font-medium",
                                                                children: new Date(p.date).toLocaleDateString()
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 580,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg text-xs font-black",
                                                                    children: [
                                                                        p.items.length,
                                                                        " MEDICINES"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 582,
                                                                    columnNumber: 45
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 581,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6 font-black text-purple-600",
                                                                children: [
                                                                    "PKR ",
                                                                    p.total.toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 586,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6 text-right",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-end gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            className: "p-2 hover:bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400 hover:text-purple-600 transition-all",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 590,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                            lineNumber: 589,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleDeletePurchase(p.id),
                                                                            className: "p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 596,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                            lineNumber: 592,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 588,
                                                                    columnNumber: 45
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 587,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, p.id, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 570,
                                                        columnNumber: 37
                                                    }, this)),
                                                (!purchaseHistory || purchaseHistory.length === 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 6,
                                                        className: "py-20 text-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col items-center gap-3 opacity-20",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                                    className: "h-16 w-16"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 606,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-black uppercase tracking-widest",
                                                                    children: "No Procurement Records"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 607,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 605,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 604,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 603,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                            lineNumber: 568,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 557,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                lineNumber: 556,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                        lineNumber: 541,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                lineNumber: 522,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PurchaseModal, {
                showForm: showForm,
                setShowForm: setShowForm,
                handleSavePurchase: handleSavePurchase,
                suppliers: suppliers,
                products: products,
                formItems: formItems,
                setFormItems: setFormItems,
                addItem: addItem,
                removeItem: removeItem,
                isSubmitting: isSubmitting,
                onScanItem: (idx)=>{
                    setCurrentScanIdx(idx);
                    setShowScanner(true);
                },
                aiLoading: aiLoading,
                processAIInvoice: processAIInvoice,
                invoiceNo: invoiceNo,
                setInvoiceNo: setInvoiceNo,
                shipmentDate: shipmentDate,
                setShipmentDate: setShipmentDate,
                selectedSupplierId: selectedSupplierId,
                setSelectedSupplierId: setSelectedSupplierId,
                isAiSupplierMatched: isAiSupplierMatched,
                isAiInvMatched: isAiInvMatched,
                loadingText: loadingText,
                loadingSubText: loadingSubText,
                detectedSupplierName: detectedSupplierName,
                detectedInvoiceNo: detectedInvoiceNo
            }, void 0, false, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                lineNumber: 618,
                columnNumber: 13
            }, this),
            showScanner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$components$2f$expiry$2f$ExpiryScanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onClose: ()=>setShowScanner(false),
                onScanComplete: handleScanComplete
            }, void 0, false, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                lineNumber: 650,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
}
_s(PurchasesPage, "jI+og7A1r72OuG56rvyl4MOw3XM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"]
    ];
});
_c = PurchasesPage;
function PurchaseModal({ showForm, setShowForm, handleSavePurchase, suppliers, products, formItems, setFormItems, addItem, removeItem, isSubmitting, onScanItem, aiLoading, processAIInvoice, invoiceNo, setInvoiceNo, shipmentDate, setShipmentDate, selectedSupplierId, setSelectedSupplierId, isAiSupplierMatched, isAiInvMatched, isAiDateMatched, loadingText, loadingSubText, detectedSupplierName, detectedInvoiceNo, detectedDate }) {
    _s1();
    const fileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handlePaste = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PurchaseModal.useCallback[handlePaste]": async (e)=>{
            const item = e.clipboardData?.items[0];
            if (item?.type.startsWith('image/') && showForm) {
                const file = item.getAsFile();
                if (file) {
                    const reader = new FileReader();
                    reader.onload = ({
                        "PurchaseModal.useCallback[handlePaste]": async (event)=>{
                            const originalBase64 = event.target?.result;
                            try {
                                const compressedBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$imageUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compressImage"])(originalBase64);
                                processAIInvoice(compressedBase64);
                            } catch (err) {
                                console.error("Compression failed, using original:", err);
                                processAIInvoice(originalBase64);
                            }
                        }
                    })["PurchaseModal.useCallback[handlePaste]"];
                    reader.readAsDataURL(file);
                }
            }
        }
    }["PurchaseModal.useCallback[handlePaste]"], [
        showForm,
        processAIInvoice
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PurchaseModal.useEffect": ()=>{
            window.addEventListener('paste', handlePaste);
            return ({
                "PurchaseModal.useEffect": ()=>window.removeEventListener('paste', handlePaste)
            })["PurchaseModal.useEffect"];
        }
    }["PurchaseModal.useEffect"], [
        handlePaste
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js",
                strategy: "lazyOnload"
            }, void 0, false, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                lineNumber: 718,
                columnNumber: 13
            }, this),
            showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-[2rem] w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-fade-in-up shadow-2xl relative border border-white/20",
                    children: [
                        aiLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-12 w-12 text-purple-600 animate-spin mb-4"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 727,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-black text-gray-800 uppercase animate-pulse",
                                    children: loadingText
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 728,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-bold text-gray-400 mt-2",
                                    children: loadingSubText
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 729,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                            lineNumber: 726,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-10 transition-all",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-black text-gray-900 uppercase tracking-tight",
                                            children: "New Stock Receipt"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                            lineNumber: 734,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 font-medium text-sm",
                                            children: "Enter shipment details from invoice."
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                            lineNumber: 735,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 733,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowForm(false),
                                    className: "p-3 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-6 w-6"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                        lineNumber: 738,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 737,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                            lineNumber: 732,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSavePurchase,
                            className: "p-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onDragOver: (e)=>{
                                                e.preventDefault();
                                                e.currentTarget.classList.add('border-purple-500', 'bg-purple-50');
                                            },
                                            onDragLeave: (e)=>{
                                                e.preventDefault();
                                                e.currentTarget.classList.remove('border-purple-500', 'bg-purple-50');
                                            },
                                            onDrop: (e)=>{
                                                e.preventDefault();
                                                e.currentTarget.classList.remove('border-purple-500', 'bg-purple-50');
                                                const file = e.dataTransfer.files[0];
                                                if (file && file.type.startsWith('image/')) {
                                                    const reader = new FileReader();
                                                    reader.onload = async (event)=>{
                                                        const originalBase64 = event.target?.result;
                                                        try {
                                                            const compressedBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$imageUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compressImage"])(originalBase64);
                                                            processAIInvoice(compressedBase64);
                                                        } catch (err) {
                                                            processAIInvoice(originalBase64);
                                                        }
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            },
                                            onClick: ()=>fileRef.current?.click(),
                                            className: "group cursor-pointer border-4 border-dashed border-gray-100 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-4 hover:border-blue-400 hover:bg-blue-50 transition-all",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "file",
                                                    ref: fileRef,
                                                    className: "hidden",
                                                    accept: "image/*",
                                                    onChange: (e)=>{
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onload = async (event)=>{
                                                                const originalBase64 = event.target?.result;
                                                                try {
                                                                    const compressedBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$imageUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compressImage"])(originalBase64);
                                                                    processAIInvoice(compressedBase64);
                                                                } catch (err) {
                                                                    processAIInvoice(originalBase64);
                                                                }
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 769,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-5 bg-white rounded-3xl shadow-sm group-hover:scale-110 transition-transform",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        className: "h-8 w-8 text-blue-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 786,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 785,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-black text-gray-900 uppercase text-xs tracking-widest",
                                                            children: "Drop Invoice Image or Paste (Ctrl+V)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 789,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-400 text-[10px] font-bold mt-1 uppercase",
                                                            children: "AI will automatically fill the form below"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 790,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 788,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                            lineNumber: 745,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid md:grid-cols-3 gap-6 mb-10 mt-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "text-[10px] font-black text-purple-600 uppercase tracking-widest flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                            lineNumber: 799,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        " Supplier Entity"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 798,
                                                                    columnNumber: 45
                                                                }, this),
                                                                isAiSupplierMatched ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full animate-pulse uppercase",
                                                                    children: "✨ AI Matched"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 802,
                                                                    columnNumber: 49
                                                                }, this) : detectedSupplierName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full animate-pulse uppercase",
                                                                    children: [
                                                                        "✨ New Supplier: ",
                                                                        detectedSupplierName
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 804,
                                                                    columnNumber: 49
                                                                }, this) : null
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 797,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: selectedSupplierId,
                                                            onChange: (e)=>setSelectedSupplierId(e.target.value),
                                                            className: "w-full h-14 bg-gray-50/50 border border-gray-100 rounded-[1.25rem] px-6 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all outline-none",
                                                            required: true,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Choose Supplier"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 813,
                                                                    columnNumber: 45
                                                                }, this),
                                                                suppliers?.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: s.id,
                                                                        children: s.name || s.id
                                                                    }, s.id, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 814,
                                                                        columnNumber: 73
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 807,
                                                            columnNumber: 41
                                                        }, this),
                                                        detectedSupplierName && !selectedSupplierId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 p-3 bg-purple-50 border border-purple-100 rounded-xl flex items-center gap-2 animate-bounce-subtle",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-black text-purple-600 uppercase",
                                                                    children: "Detected:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 819,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-bold text-gray-900",
                                                                    children: detectedSupplierName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 820,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 818,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 796,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "text-[10px] font-black text-purple-600 uppercase tracking-widest flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                            lineNumber: 827,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        " Invoice Reference"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 826,
                                                                    columnNumber: 45
                                                                }, this),
                                                                isAiInvMatched && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full animate-pulse uppercase",
                                                                    children: "✨ AI Read"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 830,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 825,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: invoiceNo,
                                                            onChange: (e)=>setInvoiceNo(e.target.value),
                                                            placeholder: "e.g. INV-2024-001",
                                                            className: "w-full h-14 bg-gray-50/50 border border-gray-100 rounded-[1.25rem] px-6 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all outline-none",
                                                            required: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 833,
                                                            columnNumber: 41
                                                        }, this),
                                                        detectedInvoiceNo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 p-2 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-black text-blue-600 uppercase",
                                                                    children: "Detected:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 842,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-bold text-gray-700",
                                                                    children: detectedInvoiceNo
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 843,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 841,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 824,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "text-[10px] font-black text-purple-600 uppercase tracking-widest flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                            lineNumber: 850,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        " Shipment Date"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 849,
                                                                    columnNumber: 45
                                                                }, this),
                                                                isAiDateMatched && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full animate-pulse uppercase",
                                                                    children: "✨ AI Read"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 853,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 848,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "date",
                                                            value: shipmentDate,
                                                            onChange: (e)=>setShipmentDate(e.target.value),
                                                            className: "w-full h-14 bg-gray-50/50 border border-gray-100 rounded-[1.25rem] px-6 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all outline-none",
                                                            required: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 856,
                                                            columnNumber: 41
                                                        }, this),
                                                        detectedDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 p-2 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-black text-blue-600 uppercase",
                                                                    children: "Detected:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 865,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-bold text-gray-700",
                                                                    children: detectedDate
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 866,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 864,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 847,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                            lineNumber: 795,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 744,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4 mb-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between px-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                    children: "Inventory Line Items"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 874,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                    children: [
                                                        "Total Items: ",
                                                        formItems.length
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 875,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                            lineNumber: 873,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                formItems.map((item, idx)=>{
                                                    const qty = parseFloat(item.quantity) || 0;
                                                    const bonus = parseFloat(item.bonusQty) || 0;
                                                    const price = parseFloat(item.purchasePrice) || 0;
                                                    const totalQty = qty + bonus;
                                                    // Discount & Tax Logic (Explicitly from state)
                                                    const discountPercent = parseFloat(item.discountPercent) || 0;
                                                    const taxPercent = parseFloat(item.taxPercent) || 0;
                                                    const grossAmount = qty * price;
                                                    const discountAmount = grossAmount * discountPercent / 100;
                                                    const taxableAmount = grossAmount - discountAmount;
                                                    const taxAmount = taxableAmount * taxPercent / 100;
                                                    const netAmount = taxableAmount + taxAmount;
                                                    const effectiveCost = totalQty > 0 ? (netAmount / totalQty).toFixed(2) : "0.00";
                                                    // Confidence-based styling
                                                    const confidence = item.confidence || 100;
                                                    const needsReview = item.needsReview || confidence < 70;
                                                    let confidenceBorderColor = 'border-green-200';
                                                    let confidenceBgColor = 'bg-green-50/30';
                                                    let confidenceTextColor = 'text-green-600';
                                                    let confidenceIcon = '✅';
                                                    if (confidence < 50) {
                                                        confidenceBorderColor = 'border-red-300';
                                                        confidenceBgColor = 'bg-red-50/50';
                                                        confidenceTextColor = 'text-red-600';
                                                        confidenceIcon = '⚠️';
                                                    } else if (confidence < 70) {
                                                        confidenceBorderColor = 'border-yellow-300';
                                                        confidenceBgColor = 'bg-yellow-50/50';
                                                        confidenceTextColor = 'text-yellow-600';
                                                        confidenceIcon = '⚡';
                                                    }
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `bg-gray-50/50 p-6 rounded-[2.5rem] border-2 ${item.isAiSuggested ? confidenceBorderColor : 'border-gray-100'} animate-fade-in group hover:shadow-xl hover:shadow-purple-500/5 transition-all ${item.isAiSuggested && needsReview ? confidenceBgColor : ''}`,
                                                        children: [
                                                            item.isAiSuggested && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between mb-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[8px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full animate-pulse uppercase",
                                                                                children: "✨ AI Suggested"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 924,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: `text-[8px] font-black ${confidenceTextColor} ${confidenceBgColor} px-2 py-0.5 rounded-full uppercase`,
                                                                                children: [
                                                                                    confidenceIcon,
                                                                                    " ",
                                                                                    confidence,
                                                                                    "% Confidence"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 925,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            item.extractionMethod && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[8px] font-black text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full uppercase",
                                                                                children: item.extractionMethod
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 929,
                                                                                columnNumber: 65
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 923,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    needsReview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[8px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full uppercase animate-pulse",
                                                                        children: "👁️ Please Review"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 935,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 922,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid md:grid-cols-12 gap-4 items-end mb-6",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-3 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                                                    children: "Medicine Name"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                    lineNumber: 946,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 945,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                value: item.productId || "",
                                                                                onChange: (e)=>{
                                                                                    const newItems = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    newItems[idx].productId = e.target.value;
                                                                                    setFormItems(newItems);
                                                                                },
                                                                                className: `w-full h-12 border-2 ${!item.productId ? 'border-red-300 bg-red-50 animate-pulse' : needsReview ? confidenceBorderColor + ' ' + confidenceBgColor : 'border-gray-200 bg-white'} rounded-xl px-4 text-xs font-bold focus:ring-4 focus:ring-purple-500/10 transition-all outline-none`,
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                        value: "",
                                                                                        children: item.tempScannedName ? `⚠️ MAP: ${item.tempScannedName}` : "Select Medicine"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 957,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    !item.productId && item.tempScannedName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("optgroup", {
                                                                                        label: "⚡ AI Suggestions",
                                                                                        children: products?.map((p)=>({
                                                                                                ...p,
                                                                                                score: getSimilarity(p.name, item.tempScannedName)
                                                                                            })).filter((p)=>p.score > 0.3).sort((a, b)=>b.score - a.score).slice(0, 3).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                                value: p.id,
                                                                                                children: [
                                                                                                    "⚡ ",
                                                                                                    p.name
                                                                                                ]
                                                                                            }, `sugg-${p.id}`, true, {
                                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                                lineNumber: 968,
                                                                                                columnNumber: 77
                                                                                            }, this))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 961,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("optgroup", {
                                                                                        label: "All Medicines",
                                                                                        children: products?.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                                value: p.id,
                                                                                                children: p.name
                                                                                            }, p.id, false, {
                                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                                lineNumber: 975,
                                                                                                columnNumber: 92
                                                                                            }, this))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 974,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 948,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            item.detected?.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 px-2 py-1 bg-purple-50 rounded-lg flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[7px] font-black text-purple-600 uppercase",
                                                                                        children: "Detected:"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 980,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[10px] font-bold text-gray-600 truncate",
                                                                                        children: item.detected.name
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 981,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 979,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 944,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-3 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                                                children: "Batch Number"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 986,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "relative",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        value: item.batchNo || "",
                                                                                        onChange: (e)=>{
                                                                                            const n = [
                                                                                                ...formItems
                                                                                            ];
                                                                                            n[idx].batchNo = e.target.value;
                                                                                            setFormItems(n);
                                                                                        },
                                                                                        onBlur: (e)=>{
                                                                                            const batchNo = e.target.value.trim();
                                                                                            if (!batchNo) return;
                                                                                            const allBatches = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('batches', []);
                                                                                            const existingBatch = allBatches.find((b)=>b.batchNo === batchNo);
                                                                                            if (existingBatch) {
                                                                                                const n = [
                                                                                                    ...formItems
                                                                                                ];
                                                                                                n[idx].mfgDate = existingBatch.mfgDate || "";
                                                                                                n[idx].expiryDate = existingBatch.expiryDate || "";
                                                                                                setFormItems(n);
                                                                                            }
                                                                                        },
                                                                                        placeholder: "Batch",
                                                                                        className: `w-full h-12 bg-white border ${item.batchNo && !item.expiryDate ? 'border-orange-300 ring-4 ring-orange-500/5' : 'border-gray-200'} rounded-xl px-4 text-xs font-bold pr-10 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none`
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 988,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        type: "button",
                                                                                        onClick: ()=>onScanItem(idx),
                                                                                        className: `absolute right-2 top-1/2 -translate-y-1/2 p-1.5 ${item.batchNo && !item.expiryDate ? 'bg-orange-50 text-orange-600 animate-pulse' : 'hover:bg-purple-50 text-purple-600'} rounded-lg transition-all`,
                                                                                        title: item.batchNo && !item.expiryDate ? "Expiry Missing: Click to Scan Carton" : "Scan Batch/Expiry",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__["ScanLine"], {
                                                                                            className: "h-4 w-4"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                            lineNumber: 1012,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1006,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    item.batchNo && !item.expiryDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "absolute -top-7 left-0 flex items-center gap-1 text-[8px] font-black text-orange-600 uppercase animate-bounce",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                                                                className: "h-2.5 w-2.5"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                                lineNumber: 1016,
                                                                                                columnNumber: 69
                                                                                            }, this),
                                                                                            " Expiry Missing - Scan Carton"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1015,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 987,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            item.detected?.batchNo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 px-2 py-1 bg-gray-50 rounded-lg flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[7px] font-black text-gray-400 uppercase",
                                                                                        children: "Detected:"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1022,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[10px] font-bold text-gray-600",
                                                                                        children: item.detected.batchNo
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1023,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1021,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 985,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-2 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                                                children: "MFG Date"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1028,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "date",
                                                                                value: item.mfgDate || "",
                                                                                onChange: (e)=>{
                                                                                    const n = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    n[idx].mfgDate = e.target.value;
                                                                                    setFormItems(n);
                                                                                },
                                                                                className: "w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-xs font-bold focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1029,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1027,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-2 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                                                children: "Expiry Date"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1032,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "date",
                                                                                value: item.expiryDate || "",
                                                                                onChange: (e)=>{
                                                                                    const n = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    n[idx].expiryDate = e.target.value;
                                                                                    setFormItems(n);
                                                                                },
                                                                                className: "w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-xs font-bold focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1033,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1031,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-2 space-y-2 text-right",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block",
                                                                                children: "Action"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1036,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>removeItem(idx),
                                                                                className: "h-12 px-6 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all font-black text-xs uppercase",
                                                                                children: "Remove"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1037,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1035,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 943,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid md:grid-cols-12 gap-4 items-center pt-6 border-t border-gray-100",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-1 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: "text-[10px] font-black text-blue-500 uppercase",
                                                                                        children: "Purch Qty"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1051,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    item.isAiSuggested && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[8px] text-purple-600 font-bold",
                                                                                        children: "✨"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1052,
                                                                                        columnNumber: 84
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1050,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                value: item.quantity ?? 0,
                                                                                onChange: (e)=>{
                                                                                    const n = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    n[idx].quantity = e.target.value;
                                                                                    setFormItems(n);
                                                                                },
                                                                                className: `w-full h-11 bg-blue-50/50 border ${!item.quantity || item.quantity == 0 ? 'border-red-400 ring-2 ring-red-200 animate-pulse' : 'border-blue-100'} rounded-xl px-4 text-xs font-black text-blue-700 focus:bg-white transition-all outline-none`
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1054,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            (!item.quantity || item.quantity == 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-[8px] font-black text-red-500 uppercase tracking-tighter",
                                                                                children: "⚠️ Req"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1060,
                                                                                columnNumber: 100
                                                                            }, this),
                                                                            item.detected?.qty !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-[8px] font-black text-blue-500 text-center uppercase tracking-tighter",
                                                                                children: [
                                                                                    "AI: ",
                                                                                    item.detected.qty
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1062,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1049,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-1 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-green-500 uppercase",
                                                                                children: "Bonus"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1066,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                value: item.bonusQty ?? 0,
                                                                                onChange: (e)=>{
                                                                                    const n = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    n[idx].bonusQty = e.target.value;
                                                                                    setFormItems(n);
                                                                                },
                                                                                className: "w-full h-11 bg-green-50/50 border border-green-100 rounded-xl px-4 text-xs font-black text-green-700 focus:bg-white transition-all outline-none"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1067,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            item.detected?.bonus !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-[8px] font-black text-green-500 text-center uppercase tracking-tighter",
                                                                                children: [
                                                                                    "AI: ",
                                                                                    item.detected.bonus
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1069,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1065,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-1 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase",
                                                                                children: "Total Qty"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1073,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-11 flex items-center px-4 bg-gray-100 rounded-xl text-xs font-black text-gray-600",
                                                                                children: totalQty
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1074,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            item.detected?.qty !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-[8px] font-black text-gray-400 text-center uppercase tracking-tighter",
                                                                                children: [
                                                                                    "AI: ",
                                                                                    item.detected.qty + (item.detected.bonus || 0)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1076,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1072,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-2 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: "text-[10px] font-black text-purple-500 uppercase",
                                                                                        children: "Unit Price (Rate)"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1081,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    item.isAiSuggested && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[8px] text-purple-600 font-bold",
                                                                                        children: "✨"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1082,
                                                                                        columnNumber: 84
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1080,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                value: item.purchasePrice ?? 0,
                                                                                onChange: (e)=>{
                                                                                    const n = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    n[idx].purchasePrice = e.target.value;
                                                                                    setFormItems(n);
                                                                                },
                                                                                className: "w-full h-11 bg-purple-50/50 border border-purple-100 rounded-xl px-4 text-xs font-black text-purple-700 focus:bg-white transition-all outline-none"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1084,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            item.detected?.rate !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-[8px] font-black text-purple-500 text-center uppercase tracking-tighter",
                                                                                children: [
                                                                                    "AI: ",
                                                                                    item.detected.rate
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1086,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1079,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-1 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-orange-500 uppercase",
                                                                                children: "Disc %"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1091,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                value: item.discountPercent ?? 0,
                                                                                onChange: (e)=>{
                                                                                    const n = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    n[idx].discountPercent = e.target.value;
                                                                                    setFormItems(n);
                                                                                },
                                                                                className: "w-full h-11 bg-orange-50/50 border border-orange-100 rounded-xl px-2 text-xs font-black text-orange-700 focus:bg-white transition-all outline-none text-center"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1092,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            (item.detected?.discountPercent !== undefined || item.detected?.discount !== undefined) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-[8px] font-black text-orange-500 text-center uppercase tracking-tighter",
                                                                                children: [
                                                                                    "AI: ",
                                                                                    item.detected?.discountPercent || item.detected?.discount,
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1103,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1090,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-1 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-red-500 uppercase",
                                                                                children: "Tax %"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1108,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                value: item.taxPercent ?? 0,
                                                                                onChange: (e)=>{
                                                                                    const n = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    n[idx].taxPercent = e.target.value;
                                                                                    setFormItems(n);
                                                                                },
                                                                                className: "w-full h-11 bg-red-50/50 border border-red-100 rounded-xl px-2 text-xs font-black text-red-700 focus:bg-white transition-all outline-none text-center"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1109,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            (item.detected?.taxPercent !== undefined || item.detected?.tax !== undefined) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-[8px] font-black text-red-500 text-center uppercase tracking-tighter",
                                                                                children: [
                                                                                    "AI: ",
                                                                                    item.detected?.taxPercent || item.detected?.tax,
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1120,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1107,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-2 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase",
                                                                                children: "Net Amount"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1125,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-11 flex items-center px-4 bg-gray-50 rounded-xl text-xs font-black text-gray-700",
                                                                                children: netAmount.toFixed(2)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1126,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            item.detected?.net !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-[8px] font-black text-gray-400 text-center uppercase tracking-tighter",
                                                                                children: [
                                                                                    "AI Net: ",
                                                                                    item.detected.net.toFixed(2)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1130,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1124,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-2 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase",
                                                                                children: "Eff. Cost / Unit"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1135,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-11 flex items-center px-4 bg-yellow-50 text-yellow-700 border border-yellow-100 rounded-xl text-xs font-black",
                                                                                children: effectiveCost
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1136,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1134,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-2 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase",
                                                                                children: "Remarks / Scheme"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1142,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "text",
                                                                                value: item.remarks || "",
                                                                                onChange: (e)=>{
                                                                                    const n = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    n[idx].remarks = e.target.value;
                                                                                    setFormItems(n);
                                                                                },
                                                                                placeholder: "e.g. 10% Off",
                                                                                className: "w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold focus:bg-white transition-all outline-none"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1143,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            item.detected?.discount !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-[8px] font-black text-orange-500 text-center uppercase tracking-tighter",
                                                                                children: [
                                                                                    "AI Disc: ",
                                                                                    item.detected.discount,
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1145,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1141,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 1048,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, idx, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 919,
                                                        columnNumber: 45
                                                    }, this);
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: addItem,
                                                    className: "w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 1158,
                                                            columnNumber: 41
                                                        }, this),
                                                        " Add Manual Item"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 1153,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                            lineNumber: 878,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 872,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sticky bottom-0 bg-white/80 backdrop-blur-xl p-8 border-t border-gray-100 -mx-8 -mb-8 rounded-b-[2rem]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: isSubmitting,
                                        className: "w-full h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-purple-200 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed",
                                        children: [
                                            isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "h-5 w-5 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                lineNumber: 1170,
                                                columnNumber: 41
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                lineNumber: 1172,
                                                columnNumber: 41
                                            }, this),
                                            isSubmitting ? 'Recording Shipment...' : 'Confirm & Save Stock Record'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                        lineNumber: 1164,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 1163,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                            lineNumber: 742,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                    lineNumber: 724,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                lineNumber: 723,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
}
_s1(PurchaseModal, "8va3vhib6d8slqkF4XCYjRQXIUQ=");
_c1 = PurchaseModal;
var _c, _c1;
__turbopack_context__.k.register(_c, "PurchasesPage");
__turbopack_context__.k.register(_c1, "PurchaseModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_Hospital%20Dashboard_hospital-dashboard_29d2692c._.js.map