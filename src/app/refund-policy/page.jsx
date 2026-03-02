"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CreditCard, Clock, CheckCircle2, Mail, Info } from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';
import MainFooter from '@/components/MainFooter';

const RefundPolicy = () => {
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
                                Refund & Cancellation
                            </span>
                            <span className="block text-[#7080FF]">Policy</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            At Toffay, we are dedicated to providing personalized products tailored to your unique specifications.
                            Please review our policy regarding cancellations and refunds below.
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
                        {/* Cancellation */}
                        <motion.div variants={itemVariants} className="group relative bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-12 hover:border-[#7080FF]/50 transition-all duration-300">
                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 bg-[#7080FF]/10 border border-[#7080FF]/20 rounded-2xl flex items-center justify-center text-[#7080FF] shrink-0 group-hover:scale-110 transition-transform">
                                    <ShieldAlert className="w-7 h-7" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4 text-white">Cancellation</h2>
                                    <p className="text-slate-400 leading-relaxed mb-4">
                                        Once an order has been placed and payment has been processed, it <span className="text-white font-semibold">cannot be cancelled or modified</span> due to products being customised.
                                    </p>
                                    <div className="flex items-center gap-3 p-4 bg-zinc-950/50 border border-white/5 rounded-2xl text-sm text-slate-400">
                                        <Info className="w-5 h-5 text-[#7080FF] shrink-0" />
                                        <p>There is a subjectivity of choice involved, and our team immediately begins the customization process to fulfil your order promptly.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Refunds */}
                        <motion.div variants={itemVariants} className="group relative bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-12 hover:border-[#7080FF]/50 transition-all duration-300">
                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 bg-[#7080FF]/10 border border-[#7080FF]/20 rounded-2xl flex items-center justify-center text-[#7080FF] shrink-0 group-hover:scale-110 transition-transform">
                                    <CreditCard className="w-7 h-7" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4 text-white">Refunds</h2>
                                    <p className="text-slate-400 leading-relaxed mb-6">
                                        As each product is customized according to your specific requirements, we <span className="text-white font-semibold">do not offer refunds or exchanges</span>.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                                        <div className="bg-zinc-950/50 border border-white/5 p-6 rounded-2xl">
                                            <div className="text-[#7080FF] font-bold mb-2 flex items-center gap-2">
                                                <Clock className="w-4 h-4" /> 7-Day Window
                                            </div>
                                            <p className="text-sm text-slate-400">Please contact our customer service team within 7 days of receiving your order for any defective or damage issues.</p>
                                        </div>
                                        <div className="bg-zinc-950/50 border border-white/5 p-6 rounded-2xl">
                                            <div className="text-[#7080FF] font-bold mb-2 flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4" /> Resolution
                                            </div>
                                            <p className="text-sm text-slate-400">We will promptly assess the issue and provide a satisfactory resolution for damaged or defective products.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Exceptions & Processing */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <motion.div variants={itemVariants} className="group bg-zinc-900/50 border border-white/10 rounded-3xl p-8 hover:border-[#7080FF]/50 transition-all duration-300">
                                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
                                    <ShieldAlert className="w-5 h-5 text-[#7080FF]" /> Exceptions
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    In cases where a mistake has been made on our part, such as incorrect personalization or product quality issues not attributable to customization preferences, we will work with you to resolve the issue satisfactorily. Our goal is to ensure your complete satisfaction with every purchase from Toffay.
                                </p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="group bg-zinc-900/50 border border-white/10 rounded-3xl p-8 hover:border-[#7080FF]/50 transition-all duration-300">
                                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-[#7080FF]" /> Processing Time
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                    Refunds are processed back to the original form of payment. Depending on your financial institution, it may take several business days to reflect in your account.
                                </p>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#7080FF]/10 text-[#7080FF] font-bold text-xs uppercase tracking-wider">
                                    Turn around time: 7-15 working days
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact Footer */}
                        <motion.div variants={itemVariants} className="mt-12 text-center bg-gradient-to-r from-[#7080FF]/10 via-transparent to-[#7080FF]/10 rounded-3xl p-12 border border-white/5">
                            <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
                            <p className="text-slate-400 mb-8 max-w-md mx-auto">
                                By placing an order with Toffay, you acknowledge and agree to abide by these terms. We're here to assist you every step of the way.
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

            <MainFooter />
        </div>
    );
};

export default RefundPolicy;
