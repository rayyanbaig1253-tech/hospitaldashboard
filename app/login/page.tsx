"use client";

import { useEffect } from "react";
import { Pill, Chrome, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        // Automatically bypass login for this session as requested
        handleLogin('credentials');
    }, []);

    const handleLogin = (type: string) => {
        // Fake login logic
        localStorage.setItem("user", JSON.stringify({ name: "Demo User", email: "demo@irsoftware.com" }));
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-fade-in-up">
                {/* Logo Section */}
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/20 rotate-3 animate-pulse">
                        <Pill className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
                        Medi<span className="text-purple-500">Stock</span>
                    </h1>
                    <p className="text-zinc-400 font-medium">Pharmacy Management System v2.0</p>
                </div>

                {/* Login Card */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-white mb-1">Welcome back</h2>
                        <p className="text-zinc-500 text-sm">Please sign in to access your dashboard</p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => handleLogin('google')}
                            className="w-full h-14 bg-white hover:bg-zinc-100 text-zinc-950 font-bold rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-white/5"
                        >
                            <Chrome className="h-5 w-5" />
                            Sign in with Google
                        </button>

                        {/* Demo Login Option */}
                        <button
                            onClick={() => handleLogin('credentials')}
                            className="w-full h-14 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 border border-zinc-700 shadow-xl"
                        >
                            <User className="h-5 w-5 text-purple-400" />
                            Quick Demo Login
                        </button>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-zinc-800"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-zinc-900 px-2 text-zinc-500 font-black tracking-widest">Secure Access</span>
                            </div>
                        </div>

                        <p className="text-center text-zinc-600 text-[10px] leading-relaxed uppercase tracking-widest">
                            Authorized personnel only. All access is logged and monitored for security purposes.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-zinc-500 text-xs">
                        &copy; 2025 MediStock Solutions. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
