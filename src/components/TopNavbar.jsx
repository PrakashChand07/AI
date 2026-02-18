"use client";

import { useEffect, useRef, useState } from "react";
import Gumshoe from 'gumshoejs';
import IconifyIcon from "./wrappers/IconifyIcon";
import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/images/logo.png';
import useScrollEvent from "@/hooks/useScrollEvent";
const TopNavbar = ({
  navLinks = []
}) => {
  const navRef = useRef(null);
  const {
    scrollY
  } = useScrollEvent();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userCredits, setUserCredits] = useState(0);

  useEffect(() => {
    checkAuth();
    document.body.classList.add('bg-default-900');
    try {
      if (navRef.current && typeof window !== 'undefined' && window.location.pathname === '/') {
        const navLinks = document.querySelectorAll('.navbar-nav a');
        if (navLinks.length > 0) {
          new Gumshoe('.navbar-nav a', {
            offset: 80
          });
        }
      }
    } catch (error) {
      console.log('Gumshoe initialization skipped:', error.message);
    }
    return () => {
      document.body.classList.remove('bg-default-900');
    };
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUserCredits(data.data.credits || 0);
      }
    } catch (error) {
      console.error("Auth check failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout");
      setIsAuthenticated(false);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return <>
    <header id="navbar-sticky" className={`navbar ${scrollY >= 50 && 'nav-sticky'}`}>
      <div className="container">
        <nav>
          <Link href="/" className="logo">
            <Image src={logo} height={40} width={124} className="h-10" alt="WebAi Logo" />
          </Link>
          <div className="lg:hidden flex items-center ms-auto px-2.5">
            <button className="hs-collapse-toggle inline-flex items-center justify-center h-9 w-12 rounded-md border border-white/20 bg-default-100/5" type="button" id="hs-unstyled-collapse" data-hs-collapse="#mobileMenu" data-hs-type="collapse">
              <IconifyIcon icon="lucide:menu" className="h-5 w-5 stroke-white" />
            </button>
          </div>
          <div ref={navRef} id="mobileMenu" className="hs-collapse transition-all duration-300 lg:basis-auto basis-full grow hidden lg:flex items-center justify-center mx-auto mt-2 lg:mt-0">
            <ul id="navbar-navlist" className="navbar-nav">
              {navLinks.map((item, idx) => <li key={item.link + idx} className="nav-item">
                <a href={item.link} className="nav-link">
                  {item.label}
                </a>
              </li>)}
            </ul>
            <div className="lg:hidden flex items-center pt-4 mt-4 lg:pt-0 lg:mt-0 border-t border-white/10 lg:border-none">
              {!loading && (
                isAuthenticated ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 px-6 py-2 bg-white/5 rounded-full border border-white/10">
                      <IconifyIcon icon="lucide:coins" className="text-yellow-400 w-5 h-5" />
                      <span className="text-white font-medium">{userCredits} Credits</span>
                      <Link href="/buy-credits" className="text-xs text-primary hover:text-primary-hover underline ml-2">Buy</Link>
                    </div>
                    <button onClick={handleLogout} className="inline-flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-2 px-6 rounded-full hover:bg-red-500 hover:text-white transition-all duration-3">
                      <IconifyIcon icon="lucide:log-out" className="h-5 w-5 me-2" /> Logout
                    </button>
                  </div>
                ) : (
                  <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-hover transition-all duration-3">
                    <IconifyIcon icon="lucide:log-in" className="h-5 w-5 me-2" /> Login
                  </Link>
                )
              )}
            </div>
          </div>
          <div className="hidden lg:flex items-center">
            {!loading && (
              isAuthenticated ? (
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 hover:border-primary/50 transition-colors">
                    <IconifyIcon icon="lucide:coins" className="text-yellow-400 w-4 h-4" />
                    <span className="text-white text-sm font-medium">{userCredits}</span>
                    <Link href="/buy-credits" className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-white transition-all">
                      <IconifyIcon icon="lucide:plus" className="w-3 h-3" />
                    </Link>
                  </div>
                  <button onClick={handleLogout} className="inline-flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-2 px-6 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300">
                    <IconifyIcon icon="lucide:log-out" className="h-5 w-5 me-2" /> Logout
                  </button>
                </div>
              ) : (
                <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-hover transition-all duration-300">
                  <IconifyIcon icon="lucide:log-in" className="h-5 w-5 me-2" /> Login
                </Link>
              )
            )}
          </div>
        </nav>
      </div>
    </header>
  </>;
};
export default TopNavbar;