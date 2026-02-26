"use client";

import { Fragment, useEffect } from "react";
import Aos from 'aos';
import { usePathname } from "next/navigation";
import BackToTop from "../BackToTop";
import { SessionProvider } from "next-auth/react";
import GoogleAuthSync from "../GoogleAuthSync";

const AppProviders = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    Aos.init();
    import('preline/preline');
    const splashElement = document.querySelector('#__next_splash');
    const splashScreen = document.querySelector('#splash-screen');
    if (!splashElement || !splashScreen) return;
    const handleMutations = mutationsList => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && splashElement.hasChildNodes()) {
          splashScreen.classList.add('remove');
        }
      }
    };
    const observer = new MutationObserver(handleMutations);
    observer.observe(splashElement, {
      childList: true,
      subtree: true
    });
    if (splashElement.hasChildNodes()) {
      splashScreen.classList.add('remove');
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (window.HSStaticMethods) window.HSStaticMethods.autoInit();
    }, 400);
  }, [pathname]);

  return (
    <SessionProvider>
      <GoogleAuthSync />
      <Fragment>
        {children}
        <BackToTop />
      </Fragment>
    </SessionProvider>
  );
};

export default AppProviders;