(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/print.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
                    <h1>MediStock</h1>
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
"[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SalesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/printer.js [app-client] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/pill.js [app-client] (ecmascript) <export default as Pill>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$print$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/print.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/storage.ts [app-client] (ecmascript)");
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
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showSuccess, setShowSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [discount, setDiscount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [cashPaid, setCashPaid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const { data: products, loading: productsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"])("/api/products");
    const { data: salesHistory, refetch: refetchSales } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"])("/api/sales");
    const filteredProducts = products?.filter((p)=>p.name.toLowerCase().includes(searchTerm.toLowerCase())) || [];
    const addToCart = (product)=>{
        const existingItem = cart.find((item)=>item.productId === product.id);
        const stripsPerBox = Math.max(1, Number(product.stripsPerBox) || 1);
        const tabletsPerStrip = Math.max(1, Number(product.tabletsPerStrip) || 1);
        const unitsPerPack = stripsPerBox * tabletsPerStrip;
        const totalAvailableUnits = (Number(product.stock) || 0) * unitsPerPack;
        // Default to adding 1 strip (tabletsPerStrip tablets)
        const amountToAdd = totalAvailableUnits >= tabletsPerStrip ? tabletsPerStrip : totalAvailableUnits;
        if (existingItem) {
            if (existingItem.quantity + tabletsPerStrip > totalAvailableUnits) return;
            setCart(cart.map((item)=>item.productId === product.id ? {
                    ...item,
                    quantity: Math.min(totalAvailableUnits, item.quantity + tabletsPerStrip)
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
                    stripsPerBox: stripsPerBox,
                    tabletsPerStrip: tabletsPerStrip,
                    discount: Number(product.defaultDiscount) || 0,
                    batch: product.batches?.[0]?.batchNo || "N/A",
                    batchId: product.batches?.[0]?.id,
                    stock: product.stock
                }
            ]);
        }
    };
    const updateUnifiedQuantity = (productId, boxes, strips, tablets)=>{
        setCart((prevCart)=>{
            const item = prevCart.find((i)=>i.productId === productId);
            if (!item) return prevCart;
            const spb = item.stripsPerBox;
            const tps = item.tabletsPerStrip;
            // Clean inputs to avoid NaN
            const b = isNaN(boxes) ? 0 : Math.max(0, boxes);
            const s = isNaN(strips) ? 0 : Math.max(0, strips);
            const t = isNaN(tablets) ? 0 : Math.max(0, tablets);
            const totalUnits = b * spb * tps + s * tps + t;
            if (totalUnits <= 0) {
                return prevCart.filter((i)=>i.productId !== productId);
            }
            // Cap at stock
            const maxUnits = (item.stock || 0) * (item.unitsPerPack || 1);
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
    const subtotal = Math.round(cart.reduce((sum, item)=>{
        const unitPrice = item.manualPrice !== undefined ? item.manualPrice : item.pricePerUnit;
        return sum + unitPrice * item.quantity;
    }, 0) * 100) / 100;
    const tax = 0;
    const calculatedTotal = subtotal + tax - totalItemDiscount - discount;
    const total = Math.max(0, calculatedTotal);
    const change = cashPaid > total ? cashPaid - total : 0;
    const completeSale = async ()=>{
        if (cart.length === 0 || isSubmitting) return;
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(async ()=>{
            const activeBranch = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('activeBranch', null);
            const branchId = activeBranch?.id;
            const newSale = {
                id: Date.now(),
                invoiceNo: `INV-${Date.now().toString().slice(-6)}`,
                date: new Date().toISOString(),
                branchId: branchId,
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$print$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["printInvoice"])({
                id: newSale.id,
                total: newSale.total,
                discount: newSale.discount,
                paidAmount: newSale.paidAmount,
                changeAmount: newSale.changeAmount,
                items: newSale.items.map((item)=>{
                    const spb = item.stripsPerBox || 1;
                    const tps = item.tabletsPerStrip || 1;
                    const unitsPerBox = item.unitsPerPack || 1;
                    const boxes = Math.floor(item.quantity / unitsPerBox);
                    const remainder = item.quantity % unitsPerBox;
                    const strips = Math.floor(remainder / tps);
                    const tablets = remainder % tps;
                    let qtyDisplay = [];
                    if (boxes > 0) qtyDisplay.push(`${boxes} Box`);
                    if (strips > 0) qtyDisplay.push(`${strips} Strip`);
                    if (tablets > 0) qtyDisplay.push(`${tablets} Tablet`);
                    return {
                        name: item.name + (item.quantity % unitsPerBox !== 0 ? " (Loose)" : ""),
                        quantity: item.quantity,
                        price: item.pricePerUnit,
                        qtyDisplay: qtyDisplay.join(" + ") || "0 Unit"
                    };
                })
            }, user?.name || "ADMIN CORE");
            // 1. Save Sale to History
            const currentSales = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('sales', []);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('sales', [
                newSale,
                ...currentSales
            ]);
            // 2. Update Batches (Branch-specific stock)
            const currentBatches = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('batches', []);
            const updatedBatches = currentBatches.map((b)=>{
                // Find if this product+branch was in the cart
                const soldItem = cart.find((c)=>c.productId === b.productId && b.branchId == branchId);
                if (soldItem) {
                    const boxesSold = soldItem.quantity / (soldItem.unitsPerPack || 1);
                    return {
                        ...b,
                        quantity: Math.max(0, b.quantity - boxesSold)
                    };
                }
                return b;
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('batches', updatedBatches);
            // 3. Update Product Stock (Persistence - mirrored sum)
            const currentProducts = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('products', []);
            const updatedProducts = currentProducts.map((p)=>{
                const soldItem = cart.find((c)=>c.productId === p.id);
                if (soldItem && p.batches) {
                    const boxesSold = soldItem.quantity / (p.unitsPerPack || 1);
                    // Update the mirrored nested batch for this branch
                    const targetNestedBatch = p.batches.find((b)=>b.branchId == branchId);
                    if (targetNestedBatch) {
                        targetNestedBatch.quantity = Math.max(0, targetNestedBatch.quantity - boxesSold);
                    }
                    // Update global stock property (sum of all branches for this product)
                    const totalNewStock = p.batches.reduce((sum, b)=>sum + (b.quantity || 0), 0);
                    return {
                        ...p,
                        stock: totalNewStock
                    };
                }
                return p;
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('products', updatedProducts);
            setCart([]);
            setDiscount(0);
            setCashPaid(0);
            setShowSuccess(true);
            setTimeout(()=>setShowSuccess(false), 3000);
            refetchSales();
            setIsSubmitting(false);
            // Trigger global change event
            window.dispatchEvent(new Event('jailwatch_storage_change'));
        }, 1000);
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
                                        className: "text-3xl font-bold text-white uppercase",
                                        children: "Point of Sale"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 271,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/70 mt-1 italic",
                                        children: "Create new sales and manage billing."
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 272,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                lineNumber: 270,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-500",
                                    children: [
                                        "Today's Total: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "text-green-600",
                                            children: [
                                                "PKR ",
                                                subtotal.toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                            lineNumber: 275,
                                            columnNumber: 80
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                    lineNumber: 275,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                lineNumber: 274,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 269,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-6 lg:grid-cols-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 284,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Search medicine to add...",
                                                value: searchTerm,
                                                onChange: (e)=>setSearchTerm(e.target.value),
                                                className: "h-14 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 text-base focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 285,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 283,
                                        columnNumber: 25
                                    }, this),
                                    productsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-center py-12",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "h-8 w-8 text-purple-600 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                            lineNumber: 297,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 296,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                                        children: filteredProducts.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>addToCart(product),
                                                disabled: product.stock <= 0,
                                                className: `card-premium rounded-2xl p-4 text-left hover:scale-[1.02] transition-transform ${product.stock <= 0 ? 'opacity-60 cursor-not-allowed' : ''}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 mb-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__["Pill"], {
                                                                    className: "h-5 w-5 text-purple-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                    lineNumber: 310,
                                                                    columnNumber: 49
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 309,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-medium text-gray-900 truncate",
                                                                        children: product.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 313,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: `text-xs ${product.stock <= 10 ? 'text-red-500 font-medium' : 'text-gray-500'}`,
                                                                        children: [
                                                                            "Stock: ",
                                                                            product.stock
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 314,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 312,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-black text-gray-400 uppercase tracking-tighter",
                                                                        children: "Box Price"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 319,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-lg font-black text-purple-600 leading-none",
                                                                        children: [
                                                                            "PKR ",
                                                                            Number(product.salePrice).toFixed(2)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 320,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 318,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col text-right",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-black text-gray-400 uppercase tracking-tighter",
                                                                        children: "Per Tablet"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 323,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-black text-blue-600 leading-none",
                                                                        children: [
                                                                            "PKR ",
                                                                            (product.salePrice / (product.unitsPerPack || 1)).toFixed(2)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 324,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 322,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, product.id, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 302,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 300,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "card-premium rounded-2xl p-6 mt-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-gray-900 mb-4",
                                                children: "Recent Sales"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 334,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: salesHistory?.slice(0, 5).map((sale)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between p-3 rounded-xl bg-gray-50/80",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                            className: "h-5 w-5 text-green-600"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                            lineNumber: 340,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 339,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "font-medium text-gray-900",
                                                                                children: sale.invoiceNo
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 343,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-gray-500",
                                                                                children: new Date(sale.date).toLocaleString()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 344,
                                                                                columnNumber: 49
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 342,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 338,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-right",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-semibold text-gray-900",
                                                                        children: [
                                                                            "PKR ",
                                                                            sale.total.toLocaleString()
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 348,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-500",
                                                                        children: [
                                                                            sale.items?.length,
                                                                            " items"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 349,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 347,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, sale.id, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 337,
                                                        columnNumber: 37
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 335,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 333,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                lineNumber: 281,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card-premium rounded-2xl p-6 h-fit sticky top-24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-gray-900",
                                                children: "Current Bill"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 360,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                        className: "h-5 w-5 text-purple-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 362,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "badge badge-info",
                                                        children: [
                                                            cart.length,
                                                            " items"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 363,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 361,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 359,
                                        columnNumber: 25
                                    }, this),
                                    cart.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-12",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                className: "h-12 w-12 text-gray-300 mx-auto mb-3"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 369,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500",
                                                children: "Cart is empty"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 370,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-400",
                                                children: "Add medicines to create a sale"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 371,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                        lineNumber: 368,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3 max-h-[300px] overflow-y-auto mb-6",
                                                children: cart.map((item)=>{
                                                    const spb = item.stripsPerBox || 1;
                                                    const tps = item.tabletsPerStrip || 1;
                                                    const unitsPerBox = item.unitsPerPack || 1;
                                                    const boxes = Math.floor(item.quantity / unitsPerBox);
                                                    const remainder = item.quantity % unitsPerBox;
                                                    const strips = Math.floor(remainder / tps);
                                                    const tablets = remainder % tps;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm transition-all hover:bg-white hover:shadow-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex-1 min-w-0",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "font-bold text-gray-900 text-sm truncate",
                                                                                children: item.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 390,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex flex-col gap-1 mt-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[9px] font-black text-purple-600 uppercase tracking-tight",
                                                                                        children: [
                                                                                            "Box: ",
                                                                                            item.boxPrice.toFixed(0),
                                                                                            " | Strip: ",
                                                                                            (item.boxPrice / spb).toFixed(1),
                                                                                            " | Tab: ",
                                                                                            item.pricePerUnit.toFixed(2)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 392,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-[9px] font-bold text-gray-400 uppercase leading-none",
                                                                                                children: "Price Override (Per Tab):"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                                lineNumber: 396,
                                                                                                columnNumber: 65
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                type: "number",
                                                                                                value: item.manualPrice ?? "",
                                                                                                placeholder: item.pricePerUnit.toFixed(2),
                                                                                                onChange: (e)=>updateManualPrice(item.productId, parseFloat(e.target.value)),
                                                                                                className: "w-16 h-5 text-[9px] font-black border border-gray-100 rounded bg-white px-1 focus:ring-1 focus:ring-purple-500"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                                lineNumber: 397,
                                                                                                columnNumber: 65
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 395,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 391,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 389,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>removeFromCart(item.productId),
                                                                        className: "w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                            className: "h-4 w-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                            lineNumber: 411,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 407,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 388,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-3 gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[9px] font-black text-gray-400 uppercase block text-center",
                                                                                children: "Boxes"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 418,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex h-9 items-stretch bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>updateUnifiedQuantity(item.productId, boxes - 1, strips, tablets),
                                                                                        className: "px-2 bg-gray-50 text-gray-400 border-r",
                                                                                        children: "-"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 420,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        type: "text",
                                                                                        inputMode: "numeric",
                                                                                        value: boxes,
                                                                                        onChange: (e)=>updateUnifiedQuantity(item.productId, parseInt(e.target.value) || 0, strips, tablets),
                                                                                        className: "w-full text-center font-black text-gray-900 border-none bg-transparent text-xs p-0"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 421,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>updateUnifiedQuantity(item.productId, boxes + 1, strips, tablets),
                                                                                        className: "px-2 bg-gray-50 text-gray-400 border-l",
                                                                                        children: "+"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 422,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 419,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 417,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[9px] font-black text-gray-500 uppercase block text-center",
                                                                                children: "Strips"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 428,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex h-9 items-stretch bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>updateUnifiedQuantity(item.productId, boxes, strips - 1, tablets),
                                                                                        className: "px-2 bg-gray-50 text-gray-400 border-r",
                                                                                        children: "-"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 430,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        type: "text",
                                                                                        inputMode: "numeric",
                                                                                        value: strips,
                                                                                        onChange: (e)=>updateUnifiedQuantity(item.productId, boxes, parseInt(e.target.value) || 0, tablets),
                                                                                        className: "w-full text-center font-black text-gray-900 border-none bg-transparent text-xs p-0"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 431,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>updateUnifiedQuantity(item.productId, boxes, strips + 1, tablets),
                                                                                        className: "px-2 bg-gray-50 text-gray-400 border-l",
                                                                                        children: "+"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 432,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 429,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 427,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[9px] font-black text-blue-500 uppercase block text-center",
                                                                                children: "Tablets"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 438,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex h-9 items-stretch bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>updateUnifiedQuantity(item.productId, boxes, strips, tablets - 1),
                                                                                        className: "px-2 bg-gray-50 text-gray-400 border-r",
                                                                                        children: "-"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 440,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        type: "text",
                                                                                        inputMode: "numeric",
                                                                                        value: tablets,
                                                                                        onChange: (e)=>updateUnifiedQuantity(item.productId, boxes, strips, parseInt(e.target.value) || 0),
                                                                                        className: "w-full text-center font-black text-gray-900 border-none bg-transparent text-xs p-0"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 441,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>updateUnifiedQuantity(item.productId, boxes, strips, tablets + 1),
                                                                                        className: "px-2 bg-gray-50 text-gray-400 border-l",
                                                                                        children: "+"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                        lineNumber: 442,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 439,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 437,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 415,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "pt-2 flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide",
                                                                        children: [
                                                                            1,
                                                                            2,
                                                                            5,
                                                                            10
                                                                        ].map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>updateUnifiedQuantity(item.productId, boxes, strips, q),
                                                                                className: "flex-shrink-0 px-2 py-1 bg-white border border-gray-200 rounded-lg text-[9px] font-bold text-gray-500 hover:text-purple-600 transition-all",
                                                                                children: [
                                                                                    q,
                                                                                    " T"
                                                                                ]
                                                                            }, q, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 451,
                                                                                columnNumber: 61
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 449,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-right pl-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-[9px] font-black text-purple-400 uppercase tracking-tighter leading-none mb-1",
                                                                                children: "Subtotal"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 461,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-black text-purple-600 leading-none",
                                                                                children: [
                                                                                    "PKR ",
                                                                                    (item.pricePerUnit * item.quantity).toFixed(0)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                                lineNumber: 462,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 460,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 448,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, item.productId, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 45
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 375,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-t border-gray-100 pt-4 space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-500",
                                                                children: "Subtotal"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 474,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-900",
                                                                children: [
                                                                    "PKR ",
                                                                    subtotal.toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 475,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 473,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pt-2 space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-bold text-gray-500 uppercase tracking-widest",
                                                                        children: "Discount (PKR)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 479,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        value: discount,
                                                                        onChange: (e)=>setDiscount(Number(e.target.value)),
                                                                        className: "w-24 h-8 rounded-lg border border-gray-200 px-3 text-right text-sm font-bold focus:ring-2 focus:ring-purple-500/20"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 480,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 478,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between border-t border-gray-100 pt-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-lg font-black text-gray-900",
                                                                        children: "Total"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 488,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-2xl font-black text-purple-600",
                                                                        children: [
                                                                            "PKR ",
                                                                            total.toLocaleString()
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 489,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 487,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 477,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gray-50 rounded-2xl p-4 space-y-3 mt-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-black text-gray-500 uppercase tracking-widest",
                                                                        children: "Cash Received"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 495,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        placeholder: "Enter cash amount",
                                                                        value: cashPaid || "",
                                                                        onChange: (e)=>setCashPaid(Number(e.target.value)),
                                                                        className: "w-32 h-10 rounded-xl border border-gray-200 px-4 text-right text-base font-black text-green-600 focus:ring-4 focus:ring-green-500/10"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 496,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 494,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between border-t border-dashed border-gray-200 pt-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-black text-gray-400 uppercase tracking-widest",
                                                                        children: "Change Return"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 505,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xl font-black text-orange-600",
                                                                        children: [
                                                                            "PKR ",
                                                                            change.toLocaleString()
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                        lineNumber: 506,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 504,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 493,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 472,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3 mt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setCart([]),
                                                        className: "flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors",
                                                        children: "Clear"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 512,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: completeSale,
                                                        disabled: isSubmitting,
                                                        className: "flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2",
                                                        children: [
                                                            isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                className: "h-4 w-4 animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 523,
                                                                columnNumber: 57
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                                lineNumber: 523,
                                                                columnNumber: 104
                                                            }, this),
                                                            "Complete Sale"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                        lineNumber: 518,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                                lineNumber: 511,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                                lineNumber: 358,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 279,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                lineNumber: 267,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SuccessModal, {
                showSuccess: showSuccess,
                total: total
            }, void 0, false, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                lineNumber: 534,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(SalesPage, "jVAdAA2yRpli1J8Ge7L3kJ5xL2M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"]
    ];
});
_c = SalesPage;
function SuccessModal({ showSuccess, total }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: showSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-8 text-center animate-fade-in-up shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                            className: "h-8 w-8 text-green-600"
                        }, void 0, false, {
                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                            lineNumber: 547,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 546,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold text-gray-900 mb-2",
                        children: "Sale Complete!"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 549,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500",
                        children: "Invoice has been generated"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 550,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-2xl font-bold text-purple-600 mt-4",
                        children: [
                            "PKR ",
                            total.toLocaleString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                        lineNumber: 551,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
                lineNumber: 545,
                columnNumber: 21
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/sales/page.tsx",
            lineNumber: 544,
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

//# sourceMappingURL=Documents_Hospital%20Dashboard_hospital-dashboard_7150756a._.js.map