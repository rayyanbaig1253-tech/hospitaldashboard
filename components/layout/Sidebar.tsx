"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Pill,
    Package,
    Wallet,
    Users,
    Settings,
    LogOut,
    ShoppingCart,
    TruckIcon,
    BarChart3,
    Bell,
    ChevronRight,
    X,
    FileText,
    Contact,
    Calculator
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Pill, label: "Products", href: "/products" },
    { icon: ShoppingCart, label: "Sales", href: "/sales" },
    { icon: TruckIcon, label: "Purchases", href: "/purchases" },
    { icon: Package, label: "Stock", href: "/stock" },
    { icon: TruckIcon, label: "Transfers", href: "/inventory/transfer" },
    { icon: Wallet, label: "Finance", href: "/finance" },
    { icon: BarChart3, label: "Reports", href: "/reports" },
    { icon: Users, label: "Suppliers", href: "/suppliers" },
    { icon: Bell, label: "Alerts", href: "/alerts" },
    { icon: FileText, label: "Invoices", href: "/invoices" },
    { icon: Contact, label: "HR", href: "/hr" },
    { icon: Calculator, label: "Accounts", href: "/accounts" },
    { icon: Users, label: "Branches", href: "/branches" },
    { icon: Settings, label: "Settings", href: "/settings" },
];

interface SidebarProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setOpen }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={cn(
            "fixed left-0 top-0 z-40 h-screen w-64 sidebar-gradient text-white transition-transform duration-300 lg:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            {/* Mobile Close Button */}
            <button
                onClick={() => setOpen(false)}
                className="lg:hidden absolute right-4 top-6 p-2 rounded-lg bg-white/10"
            >
                <X className="h-4 w-4" />
            </button>
            {/* Logo Section */}
            <div className="flex h-20 items-center px-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                        <Pill className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tighter text-white">MediStock</h1>
                        <p className="text-[10px] text-white/60 font-black uppercase tracking-widest">Management Core</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-1 p-4 mt-2">
                <p className="text-xs font-medium text-white/40 uppercase tracking-wider px-3 mb-2">Main Menu</p>
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-white text-purple-600 shadow-lg"
                                    : "text-white/80 hover:bg-white/10 hover:text-white"

                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="flex-1">{item.label}</span>
                            {isActive && <ChevronRight className="h-4 w-4" />}
                        </Link>
                    );
                })}
            </div>

            {/* User Profile */}
            <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/10">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center text-sm font-bold">
                        AD
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-white/60">admin@pharma.com</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <LogOut className="h-4 w-4 text-white/60" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
