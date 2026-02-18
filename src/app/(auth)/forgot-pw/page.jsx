
"use client";
import AuthImage from "@/components/AuthImage";
import Link from "next/link";
import logo from '@/assets/images/logo.png';
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onForgot = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
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

  return <>
    <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-default-950/40 backdrop-blur-2xl">
      <div className="grid gap-10 lg:grid-cols-2">
        <AuthImage />
        <div className="flex h-full flex-col p-10 lg:ps-0">
          <div className="pb-10">
            <Link href="/" className="flex">
              <Image src={logo} width={124} height={40} alt="dark logo" className="h-10" />
            </Link>
          </div>
          <div className="my-auto">
            <h4 className="mb-3 text-2xl font-bold text-white">Forgot Password?</h4>
            <p className="mb-8 max-w-sm text-default-300">
              Enter your email address to receive a password reset OTP.
            </p>

            {error && <div className="mb-4 text-red-500">{error}</div>}

            <form onSubmit={onForgot} className="text-start">
              <div className="mb-4">
                <label htmlFor="emailaddress" className="mb-2 block text-base/normal font-semibold text-default-200">Email address</label>
                <input
                  className="block w-full rounded border-default-200 border-white/10 bg-transparent px-3 py-1.5 text-white/80 focus:border-white/25 focus:ring-transparent"
                  type="email"
                  id="emailaddress"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500" type="submit">
                  <span className="fw-bold">{loading ? "Processing..." : "Send OTP"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-5 w-full text-center">
      <p className="text-base font-medium leading-6 text-default-300">
        Back To
        <Link href="/login" className="ms-1 font-semibold text-primary">Log In</Link>
      </p>
    </div>
  </>;
};
export default ForgotPassword;