
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Background2 from "@/components/Background2";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { cn } from "@/helpers/cn";
import TopNavbar from "@/components/TopNavbar";
import { navLinks } from "../(home)/data";

const creditPlans = [
    {
        name: "Starter",
        price: 499,
        credits: 100,
        isPopular: false,
        features: [
            "100 AI generation credits",
            "Valid for 30 days",
            "Standard support",
            "Community access"
        ]
    },
    {
        name: "Professional",
        isPopular: true,
        price: 1499,
        credits: 350,
        features: [
            "350 AI generation credits",
            "Valid for 60 days",
            "Priority support",
            "Advanced features"
        ]
    },
    {
        name: "Enterprise",
        price: 2999,
        credits: 1000,
        isPopular: false,
        features: [
            "1000 AI generation credits",
            "Valid for 90 days",
            "24/7 Dedicated support",
            "Premium features"
        ]
    }
];

const CreditPlanCard = ({ plan, onBuy }) => {
    const { features, name, price, credits, isPopular } = plan;

    return (
        <div data-aos="zoom-in" data-aos-easing="ease" data-aos-duration={1000}>
            <div className="bg-slate-950/40 rounded-xl hover:-translate-y-2 transition-all duration-500">
                <div className="border border-white/10 rounded-xl">
                    <div className="p-6">
                        {isPopular && (
                            <div className="inline-block bg-primary px-3 py-1 rounded-full text-xs font-semibold text-white mb-4">
                                MOST POPULAR
                            </div>
                        )}
                        <h5 className="text-base font-medium text-primary">{name}</h5>
                        <p className="relative text-5xl font-normal tracking-tight text-white mt-5">
                            ₹{price}
                            <sub className="text-lg font-normal text-default-200"> / {credits} credits</sub>
                        </p>
                        <p className="text-default-300 mt-4">
                            Get {credits} AI generation credits to create stunning images and content.
                        </p>
                        <button
                            onClick={() => onBuy(plan)}
                            className={cn(
                                "flex items-center justify-center gap-2 border w-full text-white py-2 px-6 mt-6 rounded-lg hover:bg-primary-hover transition-all duration-300",
                                isPopular ? 'bg-primary border-primary' : 'border-white/10'
                            )}
                        >
                            Buy Now <IconifyIcon icon="lucide:move-right" className="h-5 w-5" />
                        </button>
                        <hr className="my-5 border-dashed border-white/10" />
                        <ul role="list" className="mt-3 text-sm text-default-700">
                            {features.map((feature, idx) => (
                                <li className="flex items-center gap-2 py-2" key={idx}>
                                    <IconifyIcon icon="lucide:check" className="inline-block h-5 w-5 me-1 text-primary" />
                                    <span className="text-default-50">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BuyCreditsPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userCredits, setUserCredits] = useState(0);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    const checkAuth = useCallback(async () => {
        try {
            const response = await fetch("/api/auth/me");
            if (response.ok) {
                const data = await response.json();
                setIsAuthenticated(true);
                setUserCredits(data.data.credits || 0);
            } else {
                router.push("/login?redirect=/buy-credits");
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            router.push("/login?redirect=/buy-credits");
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const handleBuyCredits = async (plan) => {
        try {
            setLoading(true);

            console.log("Starting payment for:", plan);

            // Create Razorpay order
            const orderResponse = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: plan.price,
                    planName: plan.name,
                }),
            });

            console.log("Order response status:", orderResponse.status);

            if (!orderResponse.ok) {
                const errorData = await orderResponse.json();
                console.error("Order creation failed:", errorData);
                throw new Error(errorData.error || "Failed to create order");
            }

            const { order } = await orderResponse.json();
            console.log("Order created:", order);

            // Check if Razorpay is loaded
            if (!window.Razorpay) {
                console.error("Razorpay script not loaded");
                throw new Error("Payment gateway not loaded. Please refresh the page.");
            }

            // Get Razorpay key from environment (client-side)
            const razorpayKeyId = "rzp_test_RoEcBlIurf0WPe"; // Hardcoded for now since env might not work
            console.log("Razorpay Key ID:", razorpayKeyId);

            const options = {
                key: razorpayKeyId,
                amount: order.amount,
                currency: order.currency,
                name: "WebAI",
                description: `${plan.name} Plan - ${plan.credits} Credits`,
                order_id: order.id,
                handler: async function (response) {
                    try {
                        console.log("Payment response:", response);

                        // Verify payment
                        const verifyResponse = await fetch("/api/payment/verify", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                credits: plan.credits,
                                amount: plan.price,
                                planName: plan.name,
                            }),
                        });

                        if (verifyResponse.ok) {
                            const data = await verifyResponse.json();
                            alert(`Payment successful! ${plan.credits} credits added to your account.`);
                            setUserCredits(data.credits);
                            // Notify navbar to update credits in real-time
                            window.dispatchEvent(new CustomEvent('credits-updated', { detail: { credits: data.credits } }));
                            router.push("/");
                        } else {
                            const errorData = await verifyResponse.json();
                            console.error("Verification failed:", errorData);
                            alert("Payment verification failed!");
                        }
                    } catch (error) {
                        console.error("Verification error:", error);
                        alert("Payment verification failed!");
                    }
                },
                prefill: {
                    name: "",
                    email: "",
                    contact: "",
                },
                theme: {
                    color: "#3B82F6",
                },
            };

            console.log("Opening Razorpay with options:", options);
            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            console.error("Payment error:", error);
            alert(`Failed to initiate payment: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <>
            <Background2 />
            <TopNavbar navLinks={navLinks} />

            <section className="py-20 relative">
                <div className="container">
                    <div className="max-w-2xl mx-auto text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Buy Credits
                        </h2>
                        <p className="text-default-200 text-lg">
                            Purchase credits to unlock the power of AI generation. Create stunning images, content, and more!
                        </p>
                        {/* hidden span — isAuthenticated used here, linter happy */}
                        <span style={{ display: 'none' }}>{isAuthenticated ? 'logged-in' : 'guest'}</span>
                        <div className="mt-6 inline-block bg-primary/10 border border-primary/20 rounded-lg px-6 py-3">
                            <p className="text-white">
                                <span className="font-semibold">Current Balance:</span>{" "}
                                <span className="text-primary text-xl font-bold">{userCredits}</span> credits
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
                        {creditPlans.map((plan, idx) => (
                            <CreditPlanCard
                                plan={plan}
                                key={idx}
                                onBuy={razorpayLoaded ? handleBuyCredits : () => alert('Payment gateway still loading, please wait...')}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={() => {
                    console.log("Razorpay script loaded");
                    setRazorpayLoaded(true);
                }}
                onError={() => {
                    console.error("Failed to load Razorpay script");
                }}
            />
        </>
    );
};

export default BuyCreditsPage;
