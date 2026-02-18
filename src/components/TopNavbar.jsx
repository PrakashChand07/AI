"use client";

import { useEffect, useRef } from "react";
import Gumshoe from 'gumshoejs';
import IconifyIcon from "./wrappers/IconifyIcon";
import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/images/logo.png';
import useScrollEvent from "@/hooks/useScrollEvent";
const TopNavbar = ({
  navLinks
}) => {
  const navRef = useRef(null);
  const {
    scrollY
  } = useScrollEvent();
  useEffect(() => {
    document.body.classList.add('bg-default-900');
    try {
      if (navRef.current && typeof window !== 'undefined') {
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
              <a href="#" className="inline-flex items-center justify-center gap-2 bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-hover transition-all duration-3"><IconifyIcon icon="lucide:arrow-big-down-dash" className="h-5 w-5 me-2" /> Download</a>
            </div>
          </div>
          <div className="hidden lg:flex items-center">
            <a href="#" className="inline-flex items-center justify-center gap-2 bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-hover transition-all duration-300"><IconifyIcon icon="lucide:arrow-big-down-dash" className="h-5 w-5 me-2" /> Download</a>
          </div>
        </nav>
      </div>
    </header>
  </>;
};
export default TopNavbar;