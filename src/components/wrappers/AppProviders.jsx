"use client";

import { Fragment, useEffect, useState } from "react";
import Aos from 'aos';
import { usePathname } from "next/navigation";
import BackToTop from "../BackToTop";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

const AppProviders = ({ children }) => {
  const pathname = usePathname();
  const [queryClient] = useState(() => new QueryClient());

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
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "892732192223-8u2cfmgdcdg162gouj43rngkbket6vht.apps.googleusercontent.com"}>
        <AuthProvider>
          <Fragment>
            <Toaster position="top-right" />
            {children}
            <BackToTop />
          </Fragment>
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;