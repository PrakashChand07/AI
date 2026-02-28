"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';
import { Coins, Plus, LogOut, Menu } from 'lucide-react';
import logo from '@/assets/images/logo.png';
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const TopNavbar = ({ navLinks = [] }) => {
  const router = useRouter();
  const { user, isAuthenticated, loading, logout, updateUser } = useAuth();
  const [userCredits, setUserCredits] = useState(0);

  useEffect(() => {
    if (user?.credits !== undefined) {
      setUserCredits(user.credits);
    }
  }, [user]);

  // Listen for credits-updated event
  useEffect(() => {
    const handleCreditsUpdate = (e) => {
      if (e.detail?.credits !== undefined) {
        setUserCredits(e.detail.credits);
      }
    };

    window.addEventListener('credits-updated', handleCreditsUpdate);

    return () => {
      window.removeEventListener('credits-updated', handleCreditsUpdate);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <Image src={logo} alt="Zifto Logo" className="h-10 object-contain" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400"
        >
          {isAuthenticated ? (
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
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          {!loading && (
            isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 hover:border-[#7080FF]/50 transition-colors">
                  <Coins className="text-yellow-400 w-4 h-4" />
                  <span className="text-white text-sm font-medium">{userCredits}</span>
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
    </nav>
  );
};

export default TopNavbar;