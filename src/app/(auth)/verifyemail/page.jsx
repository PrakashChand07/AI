
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthImage from "@/components/AuthImage";
import logo from '@/assets/images/logo.png';
import { Suspense } from 'react'

const VerifyEmailContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailParam = searchParams.get("email");

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(emailParam || "");

    const verifyUserEmail = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/auth/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, email }),
            });
            const data = await response.json();

            if (data.success) {
                setVerified(true);
            } else {
                setError(true);
                console.log(data.error);
            }

        } catch (error) {
            setError(true);
            console.log(error.response?.data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (verified) {
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        }
    }, [verified, router]);


    return (
        <>
            <div className="backdrop-blur-2xl bg-default-950/40 rounded-2xl overflow-hidden max-w-5xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-10">
                    <AuthImage />
                    <div className="flex flex-col h-full p-10 lg:ps-0">
                        <div className="pb-10">
                            <Link href="/" className="flex">
                                <Image src={logo} width={124} height={40} alt="dark logo" className="h-10" />
                            </Link>
                        </div>
                        <div className="pb6 my-auto">
                            <h4 className="text-2xl font-bold text-white mb-4">Verify Your Email</h4>
                            <p className="text-default-300 mb-8 max-w-sm">
                                We have sent a verification code to your email.
                            </p>

                            <div className="text-start">
                                {!emailParam && (
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-base/normal font-semibold text-default-200 mb-2">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 border-default-200 text-white/80 focus:border-white/25 focus:ring-transparent"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                )}

                                <div className="mb-4">
                                    <label htmlFor="otp" className="block text-base/normal font-semibold text-default-200 mb-2">Enter OTP</label>
                                    <input
                                        type="text"
                                        id="otp"
                                        className="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 border-default-200 text-white/80 focus:border-white/25 focus:ring-transparent"
                                        placeholder="Enter 6-digit OTP"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                    />
                                </div>

                                {verified && (
                                    <div className="mb-4 p-2 bg-green-500/20 text-green-500 rounded text-center">
                                        Email Verified! Redirecting to login...
                                    </div>
                                )}

                                {error && (
                                    <div className="mb-4 p-2 bg-red-500/20 text-red-500 rounded text-center">
                                        Verification failed. Check OTP or Email.
                                    </div>
                                )}

                                <div className="mb-6 text-center">
                                    <button
                                        onClick={verifyUserEmail}
                                        disabled={verified || loading}
                                        className="w-full inline-flex items-center justify-center px-6 py-2 backdrop-blur-2xl bg-primary-600/90 text-white rounded-lg transition-all duration-500 group hover:bg-primary-600 mt-5"
                                    >
                                        <span className="fw-bold">{loading ? "Verifying..." : "Verify Email"}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full text-center mt-5">
                <p className="text-default-300 leading-6 text-base font-medium">
                    Back to <Link href="/login" className="text-primary font-semibold ms-1">Sign In</Link>
                </p>
            </div>
        </>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense>
            <VerifyEmailContent />
        </Suspense>
    )
}
