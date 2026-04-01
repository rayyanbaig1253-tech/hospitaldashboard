(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/Hospital Dashboard/hospital-dashboard/lib/storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Downloads/Hospital Dashboard/hospital-dashboard/lib/mockData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Hospital Dashboard/hospital-dashboard/lib/hooks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useData",
    ()=>useData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hospital Dashboard/hospital-dashboard/lib/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hospital Dashboard/hospital-dashboard/lib/mockData.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useData(url) {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useData.useCallback[fetchData]": ()=>{
            let key = '';
            let defaultData = [];
            if (url.includes('products')) {
                key = 'products';
                defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockProducts"];
            } else if (url.includes('sales')) {
                key = 'sales';
                defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockSales"];
            } else if (url.includes('suppliers')) {
                key = 'suppliers';
                defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockSuppliers"];
            } else if (url.includes('finance') || url.includes('reports')) {
                key = 'finance';
                defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockFinance"];
            } else if (url.includes('purchases')) {
                key = 'purchases';
                defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockPurchases"];
            } else if (url.includes('alerts')) {
                key = 'alerts';
                defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockAlerts"];
            } else if (url.includes('dashboard')) {
                key = 'dashboard';
                defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockDashboardData"];
            } else if (url.includes('invoices')) {
                key = 'sales';
                defaultData = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockSales"];
            } else if (url.includes('batches')) {
                key = 'batches';
                defaultData = [];
            }
            const storedData = key ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get(key, defaultData) : defaultData;
            setData(storedData);
            setLoading(false);
        }
    }["useData.useCallback[fetchData]"], [
        url
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
"[project]/Downloads/Hospital Dashboard/hospital-dashboard/lib/print.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
                        width: 80mm;
                        margin: 0;
                        padding: 5mm;
                        font-size: 12px;
                        line-height: 1.2;
                    }
                    .text-center { text-align: center; }
                    .text-right { text-align: right; }
                    .bold { font-weight: bold; }
                    .divider { border-top: 1px dashed #000; margin: 5px 0; }
                    .header h1 { margin: 0; font-size: 20px; }
                    .item-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
                    .item-details { font-size: 10px; margin-left: 5px; }
                    .totals-box { border: 1px solid #000; padding: 5px; margin: 10px 0; }
                    @media print {
                        @page { margin: 0; }
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SalesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Downloads/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Downloads/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/Downloads/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/printer.js [app-client] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/Downloads/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Downloads/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__ = __turbopack_context__.i("[project]/Downloads/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/pill.js [app-client] (ecmascript) <export default as Pill>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Downloads/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hospital Dashboard/hospital-dashboard/lib/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$print$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hospital Dashboard/hospital-dashboard/lib/print.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hospital Dashboard/hospital-dashboard/lib/storage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function SalesPage() {
    _s();
    // Mock user session
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SalesPage.useEffect": ()=>{
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser({
                    name: "Demo User"
                });
            }
        }
    }["SalesPage.useEffect"], []);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showSuccess, setShowSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [discount, setDiscount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [cashPaid, setCashPaid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const { data: products, loading: productsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"])("/api/products");
    const { data: salesHistory, refetch: refetchSales } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"])("/api/sales");
    const filteredProducts = products?.filter((p)=>p.name.toLowerCase().includes(searchTerm.toLowerCase())) || [];
    const addToCart = (product)=>{
        const existingItem = cart.find((item)=>item.productId === product.id);
        const unitsPerPack = Math.max(1, Number(product.unitsPerPack) || 1);
        // Default to adding 1 strip, or whatever is left if stock is low
        const amountToAdd = product.stock >= unitsPerPack ? unitsPerPack : product.stock;
        if (existingItem) {
            if (existingItem.quantity + 1 > product.stock) return;
            setCart(cart.map((item)=>item.productId === product.id ? {
                    ...item,
                    quantity: Math.min(product.stock, item.quantity + 1)
                } : item));
        } else {
            if (product.stock <= 0) return;
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
            // Cap at stock
            const finalUnits = Math.min(totalUnits, item.stock);
            return prevCart.map((i)=>i.productId === productId ? {
                    ...i,
                    quantity: finalUnits
                } : i);
        });
    };
    const removeFromCart = (productId)=>{
        setCart((prevCart)=>prevCart.filter((item)=>item.productId !== productId));
    };
    const totalItemDiscount = cart.reduce((sum, item)=>{
        // Box discount only applies for each FULL box sold
        const boxes = Math.floor(item.quantity / item.unitsPerPack);
        return sum + boxes * (item.discount || 0);
    }, 0);
    const subtotal = cart.reduce((sum, item)=>sum + item.pricePerUnit * item.quantity, 0);
    const tax = Math.round(subtotal * 0.05);
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
                        pricePerUnit: item.pricePerUnit,
                        boxPrice: item.boxPrice,
                        unitsPerPack: item.unitsPerPack,
                        discount: item.discount,
                        batch: item.batch,
                        batchId: item.batchId
                    })),
                soldBy: user?.name || "ADMIN CORE"
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$print$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["printInvoice"])({
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
            const currentSales = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('sales', []);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('sales', [
                newSale,
                ...currentSales
            ]);
            // 2. Update Product Stock (Persistence)
            const currentProducts = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('products', []);
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
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('products', updatedProducts);
            setCart([]);
            setDiscount(0);
            setCashPaid(0);
            setShowSuccess(true); // Re-added setShowSuccess
            setTimeout(()=>setShowSuccess(false), 3000);
            refetchSales(); // This will just re-fetch mock data
            setIsSubmitting(false);
        }, 1000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-8 animate-fade-in-up",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-bold text-gray-900",
                                        children: "Point of Sale"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 217,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 mt-1",
                                        children: "Create new sales and manage billing."
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 218,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                lineNumber: 216,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-500",
                                    children: [
                                        "Today's Total: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "text-green-600",
                                            children: [
                                                "PKR ",
                                                subtotal.toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                            lineNumber: 221,
                                            columnNumber: 80
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                    lineNumber: 221,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                lineNumber: 220,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 215,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-6 lg:grid-cols-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 230,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Search medicine to add...",
                                                value: searchTerm,
                                                onChange: (e)=>setSearchTerm(e.target.value),
                                                className: "h-14 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 text-base focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 231,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 229,
                                        columnNumber: 25
                                    }, this),
                                    productsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-center py-12",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "h-8 w-8 text-purple-600 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                            lineNumber: 243,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                                        children: filteredProducts.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>addToCart(product),
                                                disabled: product.stock <= 0,
                                                className: `card-premium rounded-2xl p-4 text-left hover:scale-[1.02] transition-transform ${product.stock <= 0 ? 'opacity-60 cursor-not-allowed' : ''}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 mb-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__["Pill"], {
                                                                    className: "h-5 w-5 text-purple-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                    lineNumber: 256,
                                                                    columnNumber: 49
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 255,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-medium text-gray-900 truncate",
                                                                        children: product.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 259,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: `text-xs ${product.stock <= 10 ? 'text-red-500 font-medium' : 'text-gray-500'}`,
                                                                        children: [
                                                                            "Stock: ",
                                                                            product.stock
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 260,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 258,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-black text-gray-400 uppercase tracking-tighter",
                                                                        children: "Box Price"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 265,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-lg font-black text-purple-600 leading-none",
                                                                        children: [
                                                                            "PKR ",
                                                                            product.salePrice
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 266,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 264,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col text-right",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-black text-gray-400 uppercase tracking-tighter",
                                                                        children: "Per Tablet"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 269,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-black text-blue-600 leading-none",
                                                                        children: [
                                                                            "PKR ",
                                                                            (product.salePrice / (product.unitsPerPack || 1)).toFixed(2)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 270,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 268,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, product.id, true, {
                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 248,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 246,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "card-premium rounded-2xl p-6 mt-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-gray-900 mb-4",
                                                children: "Recent Sales"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 280,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: salesHistory?.slice(0, 5).map((sale)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between p-3 rounded-xl bg-gray-50/80",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                            className: "h-5 w-5 text-green-600"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                            lineNumber: 286,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 285,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "font-medium text-gray-900",
                                                                                children: sale.invoiceNo
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 289,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-gray-500",
                                                                                children: new Date(sale.date).toLocaleString()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 290,
                                                                                columnNumber: 49
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 288,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 284,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-right",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-semibold text-gray-900",
                                                                        children: [
                                                                            "PKR ",
                                                                            sale.total.toLocaleString()
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 294,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-500",
                                                                        children: [
                                                                            sale.items?.length,
                                                                            " items"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 295,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 293,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, sale.id, true, {
                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 37
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 281,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 279,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                lineNumber: 227,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card-premium rounded-2xl p-6 h-fit sticky top-24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-gray-900",
                                                children: "Current Bill"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 306,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                        className: "h-5 w-5 text-purple-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "badge badge-info",
                                                        children: [
                                                            cart.length,
                                                            " items"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 307,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 305,
                                        columnNumber: 25
                                    }, this),
                                    cart.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-12",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                className: "h-12 w-12 text-gray-300 mx-auto mb-3"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 315,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500",
                                                children: "Cart is empty"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 316,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-400",
                                                children: "Add medicines to create a sale"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 317,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 314,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3 max-h-[300px] overflow-y-auto mb-6",
                                                children: cart.map((item)=>{
                                                    const boxes = Math.floor(item.quantity / item.unitsPerPack);
                                                    const tablets = item.quantity % item.unitsPerPack;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm transition-all hover:bg-white hover:shadow-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex-1 min-w-0",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "font-bold text-gray-900 text-sm truncate",
                                                                                children: item.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 330,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-1.5 mt-1",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[10px] font-black text-purple-600 uppercase tracking-tight",
                                                                                    children: [
                                                                                        "Box: PKR ",
                                                                                        item.boxPrice.toFixed(0),
                                                                                        " | Tablet: PKR ",
                                                                                        item.pricePerUnit.toFixed(2)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                    lineNumber: 332,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 331,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 329,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>removeFromCart(item.productId),
                                                                        className: "w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                            className: "h-4 w-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                            lineNumber: 341,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 337,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 328,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-2 gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex justify-between items-center px-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: "text-[10px] font-black text-gray-400 uppercase tracking-tighter",
                                                                                        children: "Boxes Qty"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 349,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    item.quantity >= item.stock * item.unitsPerPack && item.quantity % item.unitsPerPack === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[9px] font-bold text-orange-500 uppercase",
                                                                                        children: "Max"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 351,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 348,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex h-10 items-stretch bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-purple-500/20 transition-all",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>updateUnifiedQuantity(item.productId, boxes - 1, tablets),
                                                                                        className: "px-3 bg-gray-50 text-gray-400 hover:text-purple-600 active:bg-gray-100 transition-colors border-r border-gray-100 font-bold",
                                                                                        children: "-"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 355,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        type: "text",
                                                                                        inputMode: "numeric",
                                                                                        value: boxes,
                                                                                        onChange: (e)=>updateUnifiedQuantity(item.productId, parseInt(e.target.value) || 0, tablets),
                                                                                        className: "w-full text-center font-black text-gray-900 border-none bg-transparent text-sm focus:ring-0 p-0"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 361,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>updateUnifiedQuantity(item.productId, boxes + 1, tablets),
                                                                                        className: "px-3 bg-gray-50 text-gray-400 hover:text-purple-600 active:bg-gray-100 transition-colors border-l border-gray-100 font-bold",
                                                                                        children: "+"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 368,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 354,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 347,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex justify-between items-center px-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: "text-[10px] font-black text-gray-400 uppercase tracking-tighter",
                                                                                        children: "Tablets Loose"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 380,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    item.quantity >= item.stock * item.unitsPerPack && item.quantity % item.unitsPerPack !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[9px] font-bold text-orange-500 uppercase",
                                                                                        children: "Max"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 382,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 379,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex h-10 items-stretch bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-purple-500/20 transition-all",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>updateUnifiedQuantity(item.productId, boxes, tablets - 1),
                                                                                        className: "px-3 bg-gray-50 text-gray-400 hover:text-purple-600 active:bg-gray-100 transition-colors border-r border-gray-100 font-bold",
                                                                                        children: "-"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 386,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        type: "text",
                                                                                        inputMode: "numeric",
                                                                                        value: tablets,
                                                                                        onChange: (e)=>updateUnifiedQuantity(item.productId, boxes, parseInt(e.target.value) || 0),
                                                                                        className: "w-full text-center font-black text-gray-900 border-none bg-transparent text-sm focus:ring-0 p-0"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 392,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>updateUnifiedQuantity(item.productId, boxes, tablets + 1),
                                                                                        className: "px-3 bg-gray-50 text-gray-400 hover:text-purple-600 active:bg-gray-100 transition-colors border-l border-gray-100 font-bold",
                                                                                        children: "+"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 399,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 385,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 378,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 345,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "pt-2 flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide",
                                                                        children: [
                                                                            1,
                                                                            5,
                                                                            10
                                                                        ].map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>updateUnifiedQuantity(item.productId, boxes, q),
                                                                                className: "flex-shrink-0 px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-500 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50 transition-all shadow-sm",
                                                                                children: [
                                                                                    q,
                                                                                    " T"
                                                                                ]
                                                                            }, q, true, {
                                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 413,
                                                                                columnNumber: 61
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 411,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-right pl-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-[10px] font-black text-purple-400 uppercase tracking-tighter leading-none mb-1",
                                                                                children: "Subtotal"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 423,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-base font-black text-purple-600 leading-none",
                                                                                children: [
                                                                                    "PKR ",
                                                                                    (item.pricePerUnit * item.quantity).toFixed(0)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 424,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 422,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 410,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, item.productId, true, {
                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 327,
                                                        columnNumber: 45
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 321,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-t border-gray-100 pt-4 space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-500",
                                                                children: "Subtotal"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 436,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-900",
                                                                children: [
                                                                    "PKR ",
                                                                    subtotal.toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 437,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-500",
                                                                children: "Tax (5%)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 440,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-900",
                                                                children: [
                                                                    "PKR ",
                                                                    tax.toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 441,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 439,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pt-2 space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-bold text-gray-500 uppercase tracking-widest",
                                                                        children: "Discount (PKR)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 445,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        value: discount,
                                                                        onChange: (e)=>setDiscount(Number(e.target.value)),
                                                                        className: "w-24 h-8 rounded-lg border border-gray-200 px-3 text-right text-sm font-bold focus:ring-2 focus:ring-purple-500/20"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 446,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 444,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between border-t border-gray-100 pt-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-lg font-black text-gray-900",
                                                                        children: "Total"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 454,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-2xl font-black text-purple-600",
                                                                        children: [
                                                                            "PKR ",
                                                                            total.toLocaleString()
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 455,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 453,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 443,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gray-50 rounded-2xl p-4 space-y-3 mt-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-black text-gray-500 uppercase tracking-widest",
                                                                        children: "Cash Received"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 461,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        placeholder: "Enter cash amount",
                                                                        value: cashPaid || "",
                                                                        onChange: (e)=>setCashPaid(Number(e.target.value)),
                                                                        className: "w-32 h-10 rounded-xl border border-gray-200 px-4 text-right text-base font-black text-green-600 focus:ring-4 focus:ring-green-500/10"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 462,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 460,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between border-t border-dashed border-gray-200 pt-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-black text-gray-400 uppercase tracking-widest",
                                                                        children: "Change Return"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 471,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xl font-black text-orange-600",
                                                                        children: [
                                                                            "PKR ",
                                                                            change.toLocaleString()
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 472,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 470,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 459,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 434,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3 mt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setCart([]),
                                                        className: "flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors",
                                                        children: "Clear"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: completeSale,
                                                        disabled: isSubmitting,
                                                        className: "flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2",
                                                        children: [
                                                            isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                className: "h-4 w-4 animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 489,
                                                                columnNumber: 57
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 489,
                                                                columnNumber: 104
                                                            }, this),
                                                            "Complete Sale"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 484,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 477,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                lineNumber: 304,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 225,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                lineNumber: 213,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SuccessModal, {
                showSuccess: showSuccess,
                total: total
            }, void 0, false, {
                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                lineNumber: 500,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(SalesPage, "jVAdAA2yRpli1J8Ge7L3kJ5xL2M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"]
    ];
});
_c = SalesPage;
function SuccessModal({ showSuccess, total }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: showSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-8 text-center animate-fade-in-up shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                            className: "h-8 w-8 text-green-600"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                            lineNumber: 513,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 512,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold text-gray-900 mb-2",
                        children: "Sale Complete!"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 515,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500",
                        children: "Invoice has been generated"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 516,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-2xl font-bold text-purple-600 mt-4",
                        children: [
                            "PKR ",
                            total.toLocaleString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 517,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                lineNumber: 511,
                columnNumber: 21
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
            lineNumber: 510,
            columnNumber: 17
        }, this)
    }, void 0, false);
}
_c1 = SuccessModal;
var _c, _c1;
__turbopack_context__.k.register(_c, "SalesPage");
__turbopack_context__.k.register(_c1, "SuccessModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_Hospital%20Dashboard_hospital-dashboard_a30962a9._.js.map