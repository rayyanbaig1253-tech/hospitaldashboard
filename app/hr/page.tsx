"use client";

import { Users, UserPlus, FileText, TrendingUp, Search, MoreVertical, ShieldCheck, Mail, Phone, Calendar } from "lucide-react";
import { useState } from "react";

const staff = [
    { id: 1, name: "Dr. Ahmed Khan", role: "Chief Pharmacist", status: "Active", email: "ahmed@pharma.com", phone: "+92 300 1234567", joinDate: "2023-01-15" },
    { id: 2, name: "Sarah Williams", role: "Inventory Manager", status: "Active", email: "sarah@pharma.com", phone: "+92 301 7654321", joinDate: "2023-03-20" },
    { id: 3, name: "Zubair Ali", role: "Sales Associate", status: "On Leave", email: "zubair@pharma.com", phone: "+92 302 9876543", joinDate: "2023-06-10" },
    { id: 4, name: "Maria Garcia", role: "Accountant", status: "Active", email: "maria@pharma.com", phone: "+92 303 5550123", joinDate: "2023-08-05" },
];

export default function HRPage() {
    const [staffList, setStaffList] = useState(staff);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newStaff, setNewStaff] = useState({ name: "", role: "", email: "", phone: "" });

    const handleAddStaff = (e: any) => {
        e.preventDefault();
        const entry = {
            id: staffList.length + 1,
            ...newStaff,
            status: "Active",
            joinDate: new Date().toISOString().split('T')[0]
        };
        setStaffList([...staffList, entry]);
        setIsAddModalOpen(false);
        setNewStaff({ name: "", role: "", email: "", phone: "" });
    };

    const filteredStaff = staffList.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight italic">Global HR & Staffing</h1>
                    <p className="text-gray-500 mt-1 font-medium">Manage hospital personnel, roles, and performance.</p>
                </div>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <UserPlus className="h-4 w-4" />
                    Admit New Staff
                </button>
            </div>

            {/* HR KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Staff", value: staffList.length.toString(), icon: Users, color: "text-purple-600", bg: "bg-purple-50" },

                    { label: "Active Now", value: staffList.filter(s => s.status === 'Active').length.toString(), icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50" },
                    { label: "On Leave", value: staffList.filter(s => s.status === 'On Leave').length.toString(), icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
                    { label: "Efficiency", value: "94%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
                ].map((kpi, i) => (
                    <div key={i} className="card-premium p-6 rounded-3xl border-0 shadow-xl shadow-gray-100 flex items-center gap-4 group hover:scale-105 transition-all">
                        <div className={`p-4 rounded-2xl ${kpi.bg} ${kpi.color}`}>
                            <kpi.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{kpi.label}</p>
                            <h4 className="text-2xl font-black text-gray-900">{kpi.value}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Staff Directory */}
            <div className="card-premium rounded-[2.5rem] overflow-hidden border-0 shadow-2xl shadow-purple-100/50">
                <div className="p-8 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white">
                        <Users className="h-6 w-6 text-purple-400" />

                        <h3 className="text-xl font-bold uppercase tracking-tight">Personnel Directory</h3>
                    </div>
                    <div className="relative w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search by name or role..."
                            className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/40 focus:bg-white/20 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-0">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="py-5 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name / Role</th>
                                <th className="py-5 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Info</th>
                                <th className="py-5 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Join Date</th>
                                <th className="py-5 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                <th className="py-5 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredStaff.map((p) => (
                                <tr key={p.id} className="group hover:bg-gray-50/80 transition-all duration-300">
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20">
                                                {p.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 text-base">{p.name}</p>
                                                <p className="text-xs font-bold text-purple-600 uppercase tracking-tighter">{p.role}</p>

                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                                <Mail className="h-3 w-3" /> {p.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                                <Phone className="h-3 w-3" /> {p.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8 text-center text-sm font-black text-gray-400">{p.joinDate}</td>
                                    <td className="py-6 px-8 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="py-6 px-8 text-right relative">
                                        <button 
                                            onClick={() => setStaffList(staffList.map(s => s.id === p.id 
                                                ? { ...s, status: s.status === 'Active' ? 'On Leave' : 'Active' } 
                                                : s
                                            ))}
                                            className={`group/btn flex items-center gap-2 ml-auto px-4 py-2 rounded-xl border transition-all ${
                                                p.status === 'Active' 
                                                ? 'bg-orange-50 border-orange-100 text-orange-600 hover:bg-orange-100' 
                                                : 'bg-green-50 border-green-100 text-green-600 hover:bg-green-100'
                                            }`}
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                                                {p.status === 'Active' ? 'Set On Leave' : 'Set Active'}
                                            </span>
                                            <MoreVertical className="h-4 w-4 opacity-40 group-hover/btn:opacity-100" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing {filteredStaff.length} Employee Records</p>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all">Prev</button>
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all">Next</button>
                    </div>
                </div>
            </div>

            {/* Admit Staff Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-8 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">

                            <h3 className="text-2xl font-black uppercase tracking-tight italic">Admit New Staff</h3>
                            <p className="text-purple-100 text-sm mt-1 font-medium">Capture essential personnel information.</p>
                        </div>

                        <form onSubmit={handleAddStaff} className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="e.g. Dr. John Doe"
                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                                        value={newStaff.name}
                                        onChange={e => setNewStaff({...newStaff, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Job Role</label>
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="e.g. Pharmacist"
                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                                        value={newStaff.role}
                                        onChange={e => setNewStaff({...newStaff, role: e.target.value})}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                                        <input 
                                            type="email" 
                                            placeholder="john@hospital.com"
                                            className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                                            value={newStaff.email}
                                            onChange={e => setNewStaff({...newStaff, email: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone</label>
                                        <input 
                                            type="text" 
                                            placeholder="+92..."
                                            className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                                            value={newStaff.phone}
                                            onChange={e => setNewStaff({...newStaff, phone: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button 
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all text-gray-500"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 py-4 bg-purple-600 hover:bg-purple-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all text-white shadow-xl shadow-purple-600/20"

                                >
                                    Complete Admission
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

