"use client";

import { useState } from "react";
import {
    Plus,
    Search,
    Phone,
    Mail,
    MapPin,
    Package,
    ChevronRight,
    Loader2
} from "lucide-react";
import { useData } from "@/lib/hooks";

export default function SuppliersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: suppliers, loading, refetch } = useData<any[]>("/api/suppliers");

    const filteredSuppliers = suppliers?.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleAddSupplier = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const newSupplier = {
            id: Date.now().toString(),
            name: formData.get("name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            address: formData.get("address"),
            totalOrders: 0,
            lastOrder: null,
            status: 'Active'
        };

        const { storage } = await import("@/lib/storage");

        setTimeout(() => {
            const currentSuppliers = storage.get('suppliers', []);
            storage.set('suppliers', [...currentSuppliers, newSupplier]);

            setShowAddModal(false);
            refetch();
            setIsSubmitting(false);
            alert("Supplier successfully registered!");
        }, 800);
    };

    if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-10 w-10 text-purple-600 animate-spin" /></div>;

    return (
        <>
            <div className="flex flex-col gap-8 animate-fade-in-up">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tight">Vendors & Suppliers</h1>
                        <p className="text-white/70 mt-1 font-medium italic">Direct contact and order history with medicine suppliers.</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="btn-primary flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Supplier
                    </button>
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search supplier..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 shadow-sm"
                    />
                </div>

                {/* Suppliers Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredSuppliers.map((supplier) => (
                        <div key={supplier.id} className="card-premium rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30">
                                    {supplier.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">{supplier.name}</h3>
                                    <p className="text-xs text-purple-600 font-bold uppercase">ID: SUP-{supplier.id.toString().padStart(4, '0')}</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    {supplier.phone}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    {supplier.email}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    {supplier.address}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Total Orders</p>
                                    <p className="font-bold text-gray-900">{supplier.totalOrders}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Last Order</p>
                                    <p className="font-bold text-gray-900">{supplier.lastOrder ? new Date(supplier.lastOrder).toLocaleDateString() : "Never"}</p>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-3 rounded-xl bg-gray-50 text-gray-600 font-bold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                Order History
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>

            </div>

            <SupplierModal
                showAddModal={showAddModal}
                setShowAddModal={setShowAddModal}
                handleAddSupplier={handleAddSupplier}
                isSubmitting={isSubmitting}
            />
        </>
    );
}

function SupplierModal({
    showAddModal,
    setShowAddModal,
    handleAddSupplier,
    isSubmitting
}: any) {
    return (
        <>
            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl w-full max-w-lg p-6 animate-fade-in-up shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Add Supplier</h2>
                        </div>
                        <form onSubmit={handleAddSupplier} className="space-y-4">
                            <input name="name" required placeholder="Supplier Name" className="w-full h-11 border rounded-xl px-4" />
                            <input name="phone" required placeholder="Phone Number" className="w-full h-11 border rounded-xl px-4" />
                            <input name="email" required type="email" placeholder="Email Address" className="w-full h-11 border rounded-xl px-4" />
                            <textarea name="address" required placeholder="Office Address" className="w-full border rounded-xl px-4 py-2 min-h-[100px]" />
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3 border rounded-xl">Cancel</button>
                                <button disabled={isSubmitting} type="submit" className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-bold">
                                    {isSubmitting ? "..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
