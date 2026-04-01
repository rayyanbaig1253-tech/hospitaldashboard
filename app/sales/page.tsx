"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Trash2,
    Printer,
    ShoppingCart,
    Check,
    X,
    Pill,
    Loader2
} from "lucide-react";
import { useData } from "@/lib/hooks";
import { printInvoice } from "@/lib/print";
import { storage } from "@/lib/storage";

type CartItem = {
    productId: number;
    name: string;
    quantity: number; // Total Tablets
    pricePerUnit: number; // Price per Tablet
    boxPrice: number;
    manualPrice?: number;
    unitsPerPack: number; // Total Tablets per Box
    stripsPerBox: number;
    tabletsPerStrip: number;
    discount?: number;
    batch: string;
    batchId?: number;
    stock: number; // Boxes available
};

export default function SalesPage() {
    // Mock user session
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser({ name: "Demo User" });
        }
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [cashPaid, setCashPaid] = useState(0);

    const { data: products, loading: productsLoading } = useData<any[]>("/api/products");
    const { data: salesHistory, refetch: refetchSales } = useData<any[]>("/api/sales");

    const filteredProducts = products?.filter((p: any) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const addToCart = (product: any) => {
        const existingItem = cart.find(item => item.productId === product.id);
        const stripsPerBox = Math.max(1, Number(product.stripsPerBox) || 1);
        const tabletsPerStrip = Math.max(1, Number(product.tabletsPerStrip) || 1);
        const unitsPerPack = stripsPerBox * tabletsPerStrip;
        const totalAvailableUnits = (Number(product.stock) || 0) * unitsPerPack;

        // Default to adding 1 strip (tabletsPerStrip tablets)
        const amountToAdd = totalAvailableUnits >= tabletsPerStrip ? tabletsPerStrip : totalAvailableUnits;

        if (existingItem) {
            if (existingItem.quantity + tabletsPerStrip > totalAvailableUnits) return;

            setCart(cart.map(item =>
                (item.productId === product.id)
                    ? { ...item, quantity: Math.min(totalAvailableUnits, item.quantity + tabletsPerStrip) }
                    : item
            ));
        } else {
            if (totalAvailableUnits <= 0) return;

            setCart([...cart, {
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
            }]);
        }
    };

    const updateUnifiedQuantity = (productId: number, boxes: number, strips: number, tablets: number) => {
        setCart(prevCart => {
            const item = prevCart.find(i => i.productId === productId);
            if (!item) return prevCart;

            const spb = item.stripsPerBox;
            const tps = item.tabletsPerStrip;
            
            // Clean inputs to avoid NaN
            const b = isNaN(boxes) ? 0 : Math.max(0, boxes);
            const s = isNaN(strips) ? 0 : Math.max(0, strips);
            const t = isNaN(tablets) ? 0 : Math.max(0, tablets);

            const totalUnits = (b * spb * tps) + (s * tps) + t;

            if (totalUnits <= 0) {
                return prevCart.filter(i => i.productId !== productId);
            }

            // Cap at stock
            const maxUnits = (item.stock || 0) * (item.unitsPerPack || 1);
            const finalUnits = Math.min(totalUnits, maxUnits);

            return prevCart.map(i =>
                (i.productId === productId) ? { ...i, quantity: finalUnits } : i
            );
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    };

    const updateManualPrice = (productId: number, price: number) => {
        setCart(prevCart => prevCart.map(i =>
            (i.productId === productId) ? { ...i, manualPrice: price } : i
        ));
    };

    const totalItemDiscount = cart.reduce((sum, item) => {
        // Box discount only applies for each FULL box sold
        const boxes = Math.floor(item.quantity / item.unitsPerPack);
        return sum + (boxes * (item.discount || 0));
    }, 0);
    const subtotal = Math.round(cart.reduce((sum, item) => {
        const unitPrice = item.manualPrice !== undefined ? item.manualPrice : item.pricePerUnit;
        return sum + (unitPrice * item.quantity);
    }, 0) * 100) / 100;
    const tax = 0;
    const calculatedTotal = subtotal + tax - totalItemDiscount - discount;
    const total = Math.max(0, calculatedTotal);
    const change = cashPaid > total ? cashPaid - total : 0;

    const completeSale = async () => {
        if (cart.length === 0 || isSubmitting) return;

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(async () => {
            const activeBranch = storage.get('activeBranch', null);
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
                items: cart.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    quantity: item.quantity,
                    pricePerUnit: item.manualPrice !== undefined ? item.manualPrice : item.pricePerUnit,
                    boxPrice: item.boxPrice,
                    unitsPerPack: item.unitsPerPack,
                    discount: item.discount,
                    batch: item.batch,
                    batchId: item.batchId,
                })),
                soldBy: user?.name || "ADMIN CORE"
            };

            printInvoice({
                id: newSale.id,
                total: newSale.total,
                discount: newSale.discount,
                paidAmount: newSale.paidAmount,
                changeAmount: newSale.changeAmount,
                items: newSale.items.map(item => {
                    const spb = (item as any).stripsPerBox || 1;
                    const tps = (item as any).tabletsPerStrip || 1;
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
            const currentSales = storage.get('sales', []);
            storage.set('sales', [newSale, ...currentSales]);

            // 2. Update Batches (Branch-specific stock)
            const currentBatches = storage.get('batches', []);
            const updatedBatches = currentBatches.map((b: any) => {
                // Find if this product+branch was in the cart
                const soldItem = cart.find(c => c.productId === b.productId && b.branchId == branchId);
                if (soldItem) {
                    const boxesSold = soldItem.quantity / (soldItem.unitsPerPack || 1);
                    return { ...b, quantity: Math.max(0, b.quantity - boxesSold) };
                }
                return b;
            });
            storage.set('batches', updatedBatches);

            // 3. Update Product Stock (Persistence - mirrored sum)
            const currentProducts = storage.get('products', []);
            const updatedProducts = currentProducts.map((p: any) => {
                const soldItem = cart.find(c => c.productId === p.id);
                if (soldItem && p.batches) {
                    const boxesSold = soldItem.quantity / (p.unitsPerPack || 1);
                    
                    // Update the mirrored nested batch for this branch
                    const targetNestedBatch = p.batches.find((b: any) => b.branchId == branchId);
                    if (targetNestedBatch) {
                        targetNestedBatch.quantity = Math.max(0, targetNestedBatch.quantity - boxesSold);
                    }
                    
                    // Update global stock property (sum of all branches for this product)
                    const totalNewStock = p.batches.reduce((sum: number, b: any) => sum + (b.quantity || 0), 0);
                    return { ...p, stock: totalNewStock };
                }
                return p;
            });
            storage.set('products', updatedProducts);

            setCart([]);
            setDiscount(0);
            setCashPaid(0);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            refetchSales();
            setIsSubmitting(false);
            // Trigger global change event
            window.dispatchEvent(new Event('jailwatch_storage_change'));
        }, 1000);
    };

    return (
        <>
            <div className="flex flex-col gap-8 animate-fade-in-up">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white uppercase">Point of Sale</h1>
                        <p className="text-white/70 mt-1 italic">Create new sales and manage billing.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Today's Total: <strong className="text-green-600">PKR {subtotal.toLocaleString()}</strong></span>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Products Selection */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search medicine to add..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 text-base focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-sm"
                            />
                        </div>

                        {/* Products Grid */}
                        {productsLoading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
                            </div>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredProducts.map((product: any) => (
                                    <button
                                        key={product.id}
                                        onClick={() => addToCart(product)}
                                        disabled={product.stock <= 0}
                                        className={`card-premium rounded-2xl p-4 text-left hover:scale-[1.02] transition-transform ${product.stock <= 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                                                <Pill className="h-5 w-5 text-purple-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 truncate">{product.name}</p>
                                                <p className={`text-xs ${product.stock <= 10 ? 'text-red-500 font-medium' : 'text-gray-500'}`}>Stock: {product.stock}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Box Price</span>
                                                <span className="text-lg font-black text-purple-600 leading-none">PKR {Number(product.salePrice).toFixed(2)}</span>
                                            </div>
                                            <div className="flex flex-col text-right">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Per Tablet</span>
                                                <span className="text-sm font-black text-blue-600 leading-none">PKR {(product.salePrice / (product.unitsPerPack || 1)).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Recent Sales */}
                        <div className="card-premium rounded-2xl p-6 mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales</h3>
                            <div className="space-y-3">
                                {salesHistory?.slice(0, 5).map((sale: any) => (
                                    <div key={sale.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/80">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                                <Check className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{sale.invoiceNo}</p>
                                                <p className="text-xs text-gray-500">{new Date(sale.date).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900">PKR {sale.total.toLocaleString()}</p>
                                            <p className="text-xs text-gray-500">{sale.items?.length} items</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cart / Bill */}
                    <div className="card-premium rounded-2xl p-6 h-fit sticky top-24">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Current Bill</h3>
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5 text-purple-600" />
                                <span className="badge badge-info">{cart.length} items</span>
                            </div>
                        </div>

                        {cart.length === 0 ? (
                            <div className="text-center py-12">
                                <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">Cart is empty</p>
                                <p className="text-sm text-gray-400">Add medicines to create a sale</p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-3 max-h-[300px] overflow-y-auto mb-6">
                                    {cart.map((item) => {
                                        const spb = item.stripsPerBox || 1;
                                        const tps = item.tabletsPerStrip || 1;
                                        const unitsPerBox = item.unitsPerPack || 1;

                                        const boxes = Math.floor(item.quantity / unitsPerBox);
                                        const remainder = item.quantity % unitsPerBox;
                                        const strips = Math.floor(remainder / tps);
                                        const tablets = remainder % tps;

                                        return (
                                            <div key={item.productId} className="flex flex-col gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm transition-all hover:bg-white hover:shadow-md">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-bold text-gray-900 text-sm truncate">{item.name}</p>
                                                        <div className="flex flex-col gap-1 mt-1">
                                                            <span className="text-[9px] font-black text-purple-600 uppercase tracking-tight">
                                                                Box: {item.boxPrice.toFixed(0)} | Strip: {(item.boxPrice / spb).toFixed(1)} | Tab: {item.pricePerUnit.toFixed(2)}
                                                            </span>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[9px] font-bold text-gray-400 uppercase leading-none">Price Override (Per Tab):</span>
                                                                <input
                                                                    type="number"
                                                                    value={item.manualPrice ?? ""}
                                                                    placeholder={item.pricePerUnit.toFixed(2)}
                                                                    onChange={(e) => updateManualPrice(item.productId, parseFloat(e.target.value))}
                                                                    className="w-16 h-5 text-[9px] font-black border border-gray-100 rounded bg-white px-1 focus:ring-1 focus:ring-purple-500"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.productId)}
                                                        className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-3 gap-2">
                                                    {/* Boxes Input */}
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-black text-gray-400 uppercase block text-center">Boxes</label>
                                                        <div className="flex h-9 items-stretch bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                                            <button onClick={() => updateUnifiedQuantity(item.productId, boxes - 1, strips, tablets)} className="px-2 bg-gray-50 text-gray-400 border-r">-</button>
                                                            <input type="text" inputMode="numeric" value={boxes} onChange={(e) => updateUnifiedQuantity(item.productId, parseInt(e.target.value) || 0, strips, tablets)} className="w-full text-center font-black text-gray-900 border-none bg-transparent text-xs p-0" />
                                                            <button onClick={() => updateUnifiedQuantity(item.productId, boxes + 1, strips, tablets)} className="px-2 bg-gray-50 text-gray-400 border-l">+</button>
                                                        </div>
                                                    </div>

                                                    {/* Strips Input */}
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-black text-gray-500 uppercase block text-center">Strips</label>
                                                        <div className="flex h-9 items-stretch bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                                            <button onClick={() => updateUnifiedQuantity(item.productId, boxes, strips - 1, tablets)} className="px-2 bg-gray-50 text-gray-400 border-r">-</button>
                                                            <input type="text" inputMode="numeric" value={strips} onChange={(e) => updateUnifiedQuantity(item.productId, boxes, parseInt(e.target.value) || 0, tablets)} className="w-full text-center font-black text-gray-900 border-none bg-transparent text-xs p-0" />
                                                            <button onClick={() => updateUnifiedQuantity(item.productId, boxes, strips + 1, tablets)} className="px-2 bg-gray-50 text-gray-400 border-l">+</button>
                                                        </div>
                                                    </div>

                                                    {/* Tablets Input */}
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-black text-blue-500 uppercase block text-center">Tablets</label>
                                                        <div className="flex h-9 items-stretch bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                                            <button onClick={() => updateUnifiedQuantity(item.productId, boxes, strips, tablets - 1)} className="px-2 bg-gray-50 text-gray-400 border-r">-</button>
                                                            <input type="text" inputMode="numeric" value={tablets} onChange={(e) => updateUnifiedQuantity(item.productId, boxes, strips, parseInt(e.target.value) || 0)} className="w-full text-center font-black text-gray-900 border-none bg-transparent text-xs p-0" />
                                                            <button onClick={() => updateUnifiedQuantity(item.productId, boxes, strips, tablets + 1)} className="px-2 bg-gray-50 text-gray-400 border-l">+</button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Item Total Display */}
                                                <div className="pt-2 flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                                                        {[1, 2, 5, 10].map(q => (
                                                            <button
                                                                key={q}
                                                                onClick={() => updateUnifiedQuantity(item.productId, boxes, strips, q)}
                                                                className="flex-shrink-0 px-2 py-1 bg-white border border-gray-200 rounded-lg text-[9px] font-bold text-gray-500 hover:text-purple-600 transition-all"
                                                            >
                                                                {q} T
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <div className="text-right pl-3">
                                                        <p className="text-[9px] font-black text-purple-400 uppercase tracking-tighter leading-none mb-1">Subtotal</p>
                                                        <p className="text-sm font-black text-purple-600 leading-none">
                                                            PKR {(item.pricePerUnit * item.quantity).toFixed(0)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="border-t border-gray-100 pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span className="text-gray-900">PKR {subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="pt-2 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Discount (PKR)</label>
                                            <input
                                                type="number"
                                                value={discount}
                                                onChange={(e) => setDiscount(Number(e.target.value))}
                                                className="w-24 h-8 rounded-lg border border-gray-200 px-3 text-right text-sm font-bold focus:ring-2 focus:ring-purple-500/20"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                            <span className="text-lg font-black text-gray-900">Total</span>
                                            <span className="text-2xl font-black text-purple-600">PKR {total.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-2xl p-4 space-y-3 mt-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Cash Received</label>
                                            <input
                                                type="number"
                                                placeholder="Enter cash amount"
                                                value={cashPaid || ""}
                                                onChange={(e) => setCashPaid(Number(e.target.value))}
                                                className="w-32 h-10 rounded-xl border border-gray-200 px-4 text-right text-base font-black text-green-600 focus:ring-4 focus:ring-green-500/10"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Change Return</label>
                                            <span className="text-xl font-black text-orange-600">PKR {change.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={() => setCart([])}
                                        className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Clear
                                    </button>
                                    <button
                                        onClick={completeSale}
                                        disabled={isSubmitting}
                                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Printer className="h-4 w-4" />}
                                        Complete Sale
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </div>

            <SuccessModal showSuccess={showSuccess} total={total} />
        </>
    );
}

function SuccessModal({ showSuccess, total }: any) {
    return (
        <>
            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-8 text-center animate-fade-in-up shadow-2xl">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                            <Check className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Sale Complete!</h3>
                        <p className="text-gray-500">Invoice has been generated</p>
                        <p className="text-2xl font-bold text-purple-600 mt-4">PKR {total.toLocaleString()}</p>
                    </div>
                </div>
            )}
        </>
    );
}
