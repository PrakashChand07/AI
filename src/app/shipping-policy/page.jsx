"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Globe, Clock, ShieldCheck, Package, AlertTriangle, Info, Mail } from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';

const ShippingPolicy = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-[#7080FF]/30 overflow-x-hidden">
            <TopNavbar navLinks={[]} />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#7080FF] opacity-10 blur-[100px]"></div>
                </div>

                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                                Shipping &amp; Delivery
                            </span>
                            <span className="block text-[#7080FF]">Policy</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            At Toffay, we strive to deliver your personalized gifts safely and on time.
                            Please review our shipping and delivery details below.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Policy Content */}
            <section className="pb-32 relative">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid gap-8"
                    >
                        {/* Shipping Options */}
                        <motion.div variants={itemVariants} className="group relative bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-12 hover:border-[#7080FF]/50 transition-all duration-300">
                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 bg-[#7080FF]/10 border border-[#7080FF]/20 rounded-2xl flex items-center justify-center text-[#7080FF] shrink-0 group-hover:scale-110 transition-transform">
                                    <Truck className="w-7 h-7" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4 text-white">Shipping Options</h2>
                                    <p className="text-slate-400 leading-relaxed mb-4">
                                        Toffay offers a variety of shipping options to meet the needs of our customers.
                                        Shipping rates vary depending on the option selected and the destination address.
                                        <span className="text-white font-semibold"> Rates are calculated at checkout.</span>
                                    </p>
                                    <div className="flex items-center gap-3 p-4 bg-zinc-950/50 border border-white/5 rounded-2xl text-sm text-slate-400">
                                        <Info className="w-5 h-5 text-[#7080FF] shrink-0" />
                                        <p>We ship to addresses in India and select international countries. All rates are calculated at the time of checkout based on your location.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Delivery Timelines */}
                        <motion.div variants={itemVariants} className="group relative bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-12 hover:border-[#7080FF]/50 transition-all duration-300">
                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 bg-[#7080FF]/10 border border-[#7080FF]/20 rounded-2xl flex items-center justify-center text-[#7080FF] shrink-0 group-hover:scale-110 transition-transform">
                                    <Clock className="w-7 h-7" />
                                </div>
                                <div className="w-full">
                                    <h2 className="text-2xl font-bold mb-6 text-white">Delivery Timelines</h2>

                                    {/* India */}
                                    <div className="mb-6">
                                        <h3 className="text-lg font-bold mb-4 text-[#7080FF] flex items-center gap-2">
                                            <span>🇮🇳</span> India
                                        </h3>
                                        <div className="grid sm:grid-cols-3 gap-4">
                                            {[
                                                { label: "Standard Delivery", time: "3–5 business days" },
                                                { label: "Expedited Delivery", time: "2–3 business days" },
                                                { label: "Priority Delivery", time: "1–2 business days" },
                                            ].map((item) => (
                                                <div key={item.label} className="bg-zinc-950/50 border border-white/5 p-5 rounded-2xl">
                                                    <div className="text-[#7080FF] font-bold mb-1 text-sm">{item.label}</div>
                                                    <div className="text-white font-semibold">{item.time}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* International */}
                                    <div>
                                        <h3 className="text-lg font-bold mb-4 text-[#7080FF] flex items-center gap-2">
                                            <Globe className="w-5 h-5" /> International
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {[
                                                { label: "Standard Delivery", time: "5–7 business days" },
                                                { label: "Expedited Delivery", time: "4–5 business days" },
                                            ].map((item) => (
                                                <div key={item.label} className="bg-zinc-950/50 border border-white/5 p-5 rounded-2xl">
                                                    <div className="text-[#7080FF] font-bold mb-1 text-sm">{item.label}</div>
                                                    <div className="text-white font-semibold">{item.time}</div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 flex items-center gap-3 p-4 bg-zinc-950/50 border border-white/5 rounded-2xl text-sm text-slate-400">
                                            <Info className="w-5 h-5 text-[#7080FF] shrink-0" />
                                            <p>International shipping rates are calculated at checkout. Toffay ships to select countries outside of India.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Proof of Delivery & Damaged Items */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <motion.div variants={itemVariants} className="group bg-zinc-900/50 border border-white/10 rounded-3xl p-8 hover:border-[#7080FF]/50 transition-all duration-300">
                                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5 text-[#7080FF]" /> Proof of Delivery
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Toffay requires a <span className="text-white font-semibold">signature upon delivery</span> for all orders. This ensures that your order is delivered safely and securely to the right hands.
                                </p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="group bg-zinc-900/50 border border-white/10 rounded-3xl p-8 hover:border-[#7080FF]/50 transition-all duration-300">
                                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
                                    <AlertTriangle className="w-5 h-5 text-[#7080FF]" /> Damaged or Lost Items
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    If your order arrives damaged or is lost, please contact our customer service team <span className="text-white font-semibold">immediately</span>. We will work with you to resolve the issue as quickly as possible.
                                </p>
                            </motion.div>
                        </div>

                        {/* Returns & Additional Details */}
                        <motion.div variants={itemVariants} className="group relative bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-12 hover:border-[#7080FF]/50 transition-all duration-300">
                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 bg-[#7080FF]/10 border border-[#7080FF]/20 rounded-2xl flex items-center justify-center text-[#7080FF] shrink-0 group-hover:scale-110 transition-transform">
                                    <Package className="w-7 h-7" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4 text-white">Additional Details</h2>
                                    <p className="text-slate-400 leading-relaxed mb-6">
                                        Toffay does not offer refunds for customized or handmade products as they are made to order and cannot be resold. If you are not happy with your purchase, please contact our customer service team to discuss your options.
                                    </p>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        {[
                                            {
                                                title: "Shipping Restrictions",
                                                desc: "Some fragile items may not be shippable to certain rural or restricted areas."
                                            },
                                            {
                                                title: "Taxes & Duties",
                                                desc: "Customers may be responsible for paying taxes and duties on international orders. These charges are not included in shipping rates."
                                            },
                                            {
                                                title: "Customization Requests",
                                                desc: "Customizations may affect delivery time and/or price. We are happy to accommodate special requests."
                                            }
                                        ].map((item) => (
                                            <div key={item.title} className="bg-zinc-950/50 border border-white/5 p-5 rounded-2xl">
                                                <div className="text-[#7080FF] font-bold mb-2 text-sm">{item.title}</div>
                                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Footer */}
                        <motion.div variants={itemVariants} className="mt-12 text-center bg-gradient-to-r from-[#7080FF]/10 via-transparent to-[#7080FF]/10 rounded-3xl p-12 border border-white/5">
                            <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
                            <p className="text-slate-400 mb-8 max-w-md mx-auto">
                                By placing an order with Toffay, you acknowledge and agree to abide by these shipping terms.
                                We appreciate your business and hope you enjoy your Toffay gift!
                            </p>
                            <a
                                href="mailto:toffay.sa@gmail.com"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-[#7080FF] rounded-2xl font-bold text-white hover:scale-105 transition-transform shadow-[0_0_30px_-5px_rgba(112,128,255,0.4)]"
                            >
                                <Mail className="w-5 h-5" />
                                toffay.sa@gmail.com
                            </a>
                            <p className="mt-6 text-sm font-medium text-slate-500 uppercase tracking-widest">
                                Sincerely, Toffay Team
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ShippingPolicy;
