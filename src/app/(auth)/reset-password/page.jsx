
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthImage from "@/components/AuthImage";
import logo from '@/assets/images/logo.png';
import { Suspense } from 'react'

const ResetPasswordContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailParam = searchParams.get("email");

    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(emailParam || "");

    const resetUserPassword = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, email, password }),
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
            }, 3000);
        }
    }, [verified, router]);


    return (
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-default-950/40 backdrop-blur-2xl">
            <div className="grid gap-10 lg:grid-cols-2">
                <AuthImage />
                <div className="flex h-full flex-col p-10 lg:ps-0">
                    <div className="pb-10">
                        <Link href="/" className="flex">
                            <Image src={logo} width={124} height={40} alt="dark logo" className="h-10" />
                        </Link>
                    </div>
                    <div className="pb6 my-auto">
                        <h4 className="mb-4 text-2xl font-bold text-white">Reset Password</h4>
                        <p className="mb-8 max-w-sm text-default-300">
                            Enter your OTP code and new password.
                        </p>

                        <form onSubmit={resetUserPassword} className="text-start">
                            {!emailParam && (
                                <div className="mb-4">
                                    <label htmlFor="email" className="mb-2 block text-base/normal font-semibold text-default-200">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="block w-full rounded border-default-200 border-white/10 bg-transparent px-3 py-1.5 text-white/80 focus:border-white/25 focus:ring-transparent"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            )}

                            <div className="mb-4">
                                <label htmlFor="otp" className="mb-2 block text-base/normal font-semibold text-default-200">OTP Code</label>
                                <input
                                    type="text"
                                    id="otp"
                                    className="block w-full rounded border-default-200 border-white/10 bg-transparent px-3 py-1.5 text-white/80 focus:border-white/25 focus:ring-transparent"
                                    placeholder="Enter 6-digit OTP"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="mb-2 block text-base/normal font-semibold text-default-200">New Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="block w-full rounded border-default-200 border-white/10 bg-transparent px-3 py-1.5 text-white/80 focus:border-white/25 focus:ring-transparent"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {verified && (
                                <div className="mb-4 p-2 bg-green-500/20 text-green-500 rounded text-center">
                                    Password changed successfully! Redirecting to login...
                                </div>
                            )}

                            {error && (
                                <div className="mb-4 p-2 bg-red-500/20 text-red-500 rounded text-center">
                                    Failed. Check OTP or Email.
                                </div>
                            )}

                            <div className="mb-6 text-center">
                                <button
                                    type="submit"
                                    disabled={verified || loading}
                                    className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500"
                                >
                                    <span className="fw-bold">{loading ? "Processing..." : "Reset Password"}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense>
            <ResetPasswordContent />
        </Suspense>
    )
}
