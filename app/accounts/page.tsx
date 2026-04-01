"use client";

import { Wallet, TrendingUp, TrendingDown, Clock, Search, Filter, ArrowUpRight, ArrowDownRight, MoreHorizontal, Receipt, Calculator, Banknote } from "lucide-react";

const transactions = [
    { id: 1, type: "Revenue", category: "OTC Sales", amount: 15420.50, date: "2024-03-26", status: "Completed", icon: ArrowUpRight, color: "text-green-600" },
    { id: 2, type: "Expense", category: "Supplier Payment", amount: 8200.00, date: "2024-03-25", status: "Pending", icon: ArrowDownRight, color: "text-red-500" },
    { id: 3, type: "Revenue", category: "Prescription Billing", amount: 12100.25, date: "2024-03-25", status: "Completed", icon: ArrowUpRight, color: "text-green-600" },
    { id: 4, type: "Expense", category: "Utility Bill", amount: 450.00, date: "2024-03-24", status: "Completed", icon: ArrowDownRight, color: "text-red-500" },
];

export default function AccountsPage() {
    return (
        <div className="flex flex-col gap-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight italic flex items-center gap-3">
                        <Calculator className="h-8 w-8 text-purple-600" /> Professional Accounts
                    </h1>

                    <p className="text-gray-500 mt-1 font-medium text-sm">Monitor revenue, expenses, and overall financial health.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase text-gray-500 hover:bg-gray-50 transition-all tracking-widest shadow-sm">
                        Export Report
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        <Banknote className="h-4 w-4" />
                        Record Transaction
                    </button>
                </div>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card-premium p-8 rounded-[2.5rem] bg-gradient-to-br from-purple-600 to-indigo-700 text-white relative overflow-hidden group">

                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-500">
                        <TrendingUp className="h-32 w-32" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-100">Total Balance</p>
                    <h2 className="text-5xl font-black mt-2 mb-6">PKR 482,900.50</h2>
                    <div className="flex items-center gap-2 text-purple-100 text-xs font-bold bg-white/10 w-fit px-3 py-1.5 rounded-full">
                        <ArrowUpRight className="h-3 w-3" /> +12% from last month
                    </div>

                </div>

                <div className="card-premium p-8 rounded-[2.5rem] bg-white border border-gray-50 shadow-2xl shadow-gray-100 flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-4">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly Revenue</p>
                        <h3 className="text-3xl font-black text-gray-900 mt-1">PKR 125,400</h3>
                    </div>
                    <div className="mt-4 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
                    </div>
                </div>

                <div className="card-premium p-8 rounded-[2.5rem] bg-white border border-gray-50 shadow-2xl shadow-gray-100 flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-4">
                            <TrendingDown className="h-6 w-6" />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly Expenses</p>
                        <h3 className="text-3xl font-black text-gray-900 mt-1">PKR 42,150</h3>
                    </div>
                    <div className="mt-4 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-red-500 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Transaction History & Ledger */}
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 card-premium rounded-[2.5rem] bg-white border border-gray-50 shadow-2xl shadow-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Financial Ledger</h3>
                        <div className="flex gap-2">
                             <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:bg-gray-100 transition-all"><Filter className="h-4 w-4" /></button>
                             <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:bg-gray-100 transition-all"><Search className="h-4 w-4" /></button>
                        </div>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="py-4 px-8 text-[10px] font-black text-gray-400 uppercase">Transaction Info</th>
                                    <th className="py-4 px-8 text-[10px] font-black text-gray-400 uppercase">Category</th>
                                    <th className="py-4 px-8 text-[10px] font-black text-gray-400 uppercase text-center">Amount</th>
                                    <th className="py-4 px-8 text-[10px] font-black text-gray-400 uppercase text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {transactions.map((t) => (
                                    <tr key={t.id} className="group hover:bg-gray-50/50 transition-all">
                                        <td className="py-5 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl ${t.color.replace('text', 'bg')}/10 ${t.color} flex items-center justify-center`}>
                                                    <t.icon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{t.type}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase">{t.date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-8">
                                            <span className="text-xs font-bold text-gray-600 italic"># {t.category}</span>
                                        </td>
                                        <td className="py-5 px-8 text-center">
                                            <p className={`font-black ${t.color}`}>
                                                {t.type === 'Revenue' ? '+' : '-'} PKR {t.amount.toLocaleString()}
                                            </p>
                                        </td>
                                        <td className="py-5 px-8 text-right">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                                                t.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                                {t.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card-premium rounded-[2.5rem] bg-gray-900 border-0 p-8 text-white flex flex-col justify-between overflow-hidden relative shadow-2xl shadow-blue-900/10">
                    <div className="absolute bottom-0 right-0 p-8 opacity-5">
                        <Wallet className="h-48 w-48" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-8">
                            <Clock className="h-5 w-5 text-purple-400" />
                            <h3 className="font-bold uppercase tracking-widest text-sm italic">Quick Stats</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pending Payouts</p>
                                <h4 className="text-2xl font-black mt-1">PKR 12,500.00</h4>
                            </div>
                            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expected Revenue</p>
                                <h4 className="text-2xl font-black mt-1">PKR 85,900.00</h4>
                            </div>
                        </div>
                    </div>
                    <button className="w-full py-4 mt-8 bg-purple-600 hover:bg-purple-500 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-purple-600/20">
                        View Detailed Analytics
                    </button>

                </div>
            </div>
        </div>
    );
}
