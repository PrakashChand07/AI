"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Plus, LogOut, Menu } from 'lucide-react';
import logo from '@/assets/images/logo.png';
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const TopNavbar = ({ navLinks = [] }) => {
  const router = useRouter();
  const { user, isAuthenticated, loading, logout, updateUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 md:h-28 flex items-center justify-between relative">
        {/* Left: Mobile Toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 -ml-2 text-slate-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <Plus className="w-6 h-6 rotate-45" /> : <Menu className="w-6 h-6" />}
          </button>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center cursor-pointer"
            onClick={() => router.push('/')}
          >
            <Image src={logo} alt="Zifto Logo" className="h-8 md:h-10 w-auto object-contain" />
          </motion.div>
        </div>

        {/* Center: Desktop Links */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden xl:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-sm font-medium text-slate-400"
        >
          {!loading && (
            isAuthenticated ? (
              <>
                <Link href="/create-storybook" className="hover:text-white transition-colors w-max">Create Storybook</Link>
                <Link href="/my-storybooks" className="hover:text-white transition-colors w-max">My Storybooks</Link>
                <Link href="/buy-credits" className="hover:text-white transition-colors w-max">Buy Credits</Link>
              </>
            ) : (
              <>
                <Link href="/#features" className="hover:text-white transition-colors w-max">Features</Link>
                <Link href="/#how-it-works" className="hover:text-white transition-colors w-max">How it Works</Link>
                <Link href="/#pricing" className="hover:text-white transition-colors w-max">Pricing</Link>
                <Link href="/contact" className="hover:text-white transition-colors w-max">Contact</Link>
              </>
            )
          )}
        </motion.div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* Mobile Credits */}
          {!loading && isAuthenticated && (
            <Link href="/buy-credits" className="xl:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#7080FF]/10 rounded-full border border-[#7080FF]/30 text-[#7080FF] hover:bg-[#7080FF]/25 shadow-[0_0_15px_-5px_rgba(112,128,255,0.3)] transition-all">
              <Coins className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">{user?.credits || 0}</span>
            </Link>
          )}

          {/* Desktop Right Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden xl:flex items-center gap-4"
          >
            {!loading && (
              isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 hover:border-[#7080FF]/50 transition-colors">
                    <Coins className="text-yellow-400 w-4 h-4" />
                    <span className="text-white text-sm font-medium">{user?.credits || 0}</span>
                    <Link href="/buy-credits" className="w-5 h-5 flex items-center justify-center rounded-full bg-[#7080FF]/20 text-[#7080FF] hover:bg-[#7080FF] hover:text-white transition-all">
                      <Plus className="w-3 h-3" />
                    </Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-1.5 px-4 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 text-sm font-semibold"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
                  >
                    <span>Log In</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7080FF] transition-all group-hover:w-full" />
                  </Link>
                  <Link
                    href="/register"
                    className="group relative px-6 py-2.5 text-sm font-bold bg-white text-black rounded-full overflow-hidden transition-transform hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                    <span className="relative z-10">Get Started</span>
                  </Link>
                </>
              )
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Card */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden absolute top-[100%] left-4 right-4 mt-2 bg-zinc-950/95 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(112,128,255,0.2)] z-50 p-2"
          >
            <div className="flex flex-col gap-1">
              {isAuthenticated ? (
                <>
                  <Link onClick={() => setIsMobileMenuOpen(false)} href="/create-storybook" className="flex items-center gap-3 text-sm font-medium text-slate-300 hover:text-white bg-transparent hover:bg-white/5 py-3.5 px-4 rounded-2xl transition-all">Create Storybook</Link>
                  <Link onClick={() => setIsMobileMenuOpen(false)} href="/my-storybooks" className="flex items-center gap-3 text-sm font-medium text-slate-300 hover:text-white bg-transparent hover:bg-white/5 py-3.5 px-4 rounded-2xl transition-all">My Storybooks</Link>
                  <Link onClick={() => setIsMobileMenuOpen(false)} href="/buy-credits" className="flex items-center gap-3 text-sm font-bold text-[#7080FF] bg-transparent hover:bg-[#7080FF]/10 py-3.5 px-4 rounded-2xl transition-all">Buy Credits</Link>
                  <div className="h-px bg-white/5 mx-2 my-1"></div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex justify-start text-left text-sm font-bold text-red-500 bg-transparent hover:bg-red-500/10 py-3.5 px-4 rounded-2xl transition-all"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link onClick={() => setIsMobileMenuOpen(false)} href="/#features" className="flex items-center gap-3 text-sm font-medium text-slate-300 hover:text-white bg-transparent hover:bg-white/5 py-3.5 px-4 rounded-2xl transition-all">Features</Link>
                  <Link onClick={() => setIsMobileMenuOpen(false)} href="/#how-it-works" className="flex items-center gap-3 text-sm font-medium text-slate-300 hover:text-white bg-transparent hover:bg-white/5 py-3.5 px-4 rounded-2xl transition-all">How it Works</Link>
                  <Link onClick={() => setIsMobileMenuOpen(false)} href="/#pricing" className="flex items-center gap-3 text-sm font-medium text-slate-300 hover:text-white bg-transparent hover:bg-white/5 py-3.5 px-4 rounded-2xl transition-all">Pricing</Link>
                  <Link onClick={() => setIsMobileMenuOpen(false)} href="/contact" className="flex items-center gap-3 text-sm font-medium text-slate-300 hover:text-white bg-transparent hover:bg-white/5 py-3.5 px-4 rounded-2xl transition-all">Contact</Link>
                  <div className="grid grid-cols-2 gap-2 mt-2 p-2 pt-0">
                    <Link
                      onClick={() => setIsMobileMenuOpen(false)}
                      href="/login"
                      className="flex items-center justify-center py-3.5 text-sm font-medium text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-colors"
                    >
                      Log In
                    </Link>
                    <Link
                      onClick={() => setIsMobileMenuOpen(false)}
                      href="/register"
                      className="flex items-center justify-center py-3.5 text-sm font-bold bg-[#7080FF] text-white shadow-[0_0_20px_-5px_rgba(112,128,255,0.4)] rounded-xl relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                      Get Started
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default TopNavbar;