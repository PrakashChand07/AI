"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Mail, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import logo from '@/assets/images/logo.png';

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onForgot = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.success) {
        console.log("Email sent", data);
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        console.log("Failed", data.error);
        setError(data.error);
      }
    } catch (error) {
      console.log("Failed", error.message);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] overflow-hidden">
      {/* Tech Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7080FF]/50 to-transparent" />
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7080FF]/50 to-transparent" />

      <div className="h-full w-full flex flex-col items-center justify-center py-8 px-4 relative">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[380px] relative z-10"
        >
          <div className="mb-4 flex justify-start">
            <Link
              href="/login"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-500 transition-all duration-300 hover:bg-[#7080FF] hover:text-white border border-white/10 hover:border-[#7080FF] shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative group">
            {/* Glowing Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-b from-[#7080FF] to-purple-600 rounded-[2rem] opacity-20 group-hover:opacity-40 blur transition duration-500" />

            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-[2rem] shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-36 mx-auto mb-16">
                  <Image src={logo} alt="Zifto Logo" className="w-full h-10 object-contain" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  Forgot Password?
                </h1>
                <p className="text-slate-400 text-sm">
                  Enter your email address to receive a password reset OTP.
                </p>
              </div>

              {error && <div className="mb-4 text-red-500 text-center text-sm font-medium p-2 bg-red-500/10 rounded-lg border border-red-500/20">{error}</div>}

              <form onSubmit={onForgot} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email address</label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-[#7080FF] transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-white placeholder:text-slate-600 focus:border-[#7080FF] focus:ring-1 focus:ring-[#7080FF] transition-all outline-none font-mono text-xs"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#7080FF] hover:bg-[#5e6ce6] text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(112,128,255,0.4)] flex items-center justify-center gap-2 mt-6 relative overflow-hidden group/btn text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:animate-shimmer" />
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 pt-5 border-t border-white/5 text-center">
                <p className="text-xs text-slate-400">
                  Back To
                  <Link
                    href="/login"
                    className="ml-2 text-[#7080FF] hover:text-[#8ba2ff] font-medium transition-colors hover:underline decoration-[#7080FF]/30 underline-offset-4"
                  >
                    Log In
                  </Link>
                </p>
              </div>

              <div className="mt-5 flex justify-center gap-4 text-[9px] text-slate-600 font-mono uppercase tracking-wider">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Encrypted</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Fast Access</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;