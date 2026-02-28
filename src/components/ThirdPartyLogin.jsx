"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useRef, useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from "@/contexts/AuthContext";
import { authAPI } from "@/lib/api";
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

function GoogleButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect") || "/";
  const { updateUser } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    if (googleLoading) return;

    setGoogleLoading(true);
    try {
      const response = await authAPI.googleAuth(credentialResponse.credential);

      if (response && response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));

        updateUser(response.user);

        // Let cookies handle SSR components if any
        router.push(redirect);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Google login failed');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center transform hover:scale-[1.02] transition-transform duration-200 min-h-[40px] items-center relative">
      {googleLoading ? (
        <span className="flex items-center text-slate-400 text-sm gap-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Authenticating...
        </span>
      ) : (
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error('Google login failed. Please try again.')}
          size="large"
          theme="filled_black"
          text="signin_with"
          shape="pill"
          width="100%"
        />
      )}
    </div>
  );
}

const ThirdPartyLogin = () => {
  return (
    <div className="mt-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest whitespace-nowrap">
          or continue with
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <Suspense fallback={
        <div className="w-full h-10 bg-white/5 rounded-xl animate-pulse border border-white/10" />
      }>
        <GoogleButton />
      </Suspense>
    </div>
  );
};

export default ThirdPartyLogin;