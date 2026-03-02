"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, UserCheck, Mail, Info, FileText } from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';
import MainFooter from '@/components/MainFooter';

const PrivacyPolicy = () => {
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
                                Privacy
                            </span>
                            <span className="block text-[#7080FF]">Policy</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            At Toffay, Inc. ("Toffay"), we respect your privacy and are committed to protecting your personal information.
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
                        className="grid gap-12"
                    >
                        {/* 1. Introduction */}
                        <motion.div variants={itemVariants} className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-12">
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                <Info className="w-6 h-6 text-[#7080FF]" /> 1. Introduction
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                Toffay, Inc. ("Toffay") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and share your personal information when you visit our website (the "Website").
                            </p>
                        </motion.div>

                        {/* 2. Collection */}
                        <motion.div variants={itemVariants} className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-12">
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                <Eye className="w-6 h-6 text-[#7080FF]" /> 2. What Personal Information Do We Collect?
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Information you provide us</h3>
                                    <p className="text-slate-400">We collect information that you provide to us directly, such as your name, email address, shipping address, and payment information.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Information we collect automatically</h3>
                                    <p className="text-slate-400">We collect certain information automatically when you visit our Website, such as your IP address, browser type, and operating system.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Information from third-party services</h3>
                                    <p className="text-slate-400">We may collect information from third-party services, such as social media platforms, to help us deliver targeted advertising and to improve our Website.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* 3. Usage */}
                        <motion.div variants={itemVariants} className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-12">
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                <Shield className="w-6 h-6 text-[#7080FF]" /> 3. How Do We Use Your Personal Information?
                            </h2>
                            <ul className="grid md:grid-cols-2 gap-4">
                                {[
                                    "To provide you with the services you request",
                                    "To communicate with you about your orders",
                                    "To improve our Website experience",
                                    "To target advertising and promotions",
                                    "To protect our legal rights"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 p-4 bg-zinc-950/50 border border-white/5 rounded-2xl text-slate-400">
                                        <div className="w-2 h-2 rounded-full bg-[#7080FF]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* 4. Sharing */}
                        <motion.div variants={itemVariants} className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-12">
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                <UserCheck className="w-6 h-6 text-[#7080FF]" /> 4. How Do We Share Your Personal Information?
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                We may share your personal information with service providers, business partners, and in response to legal requirements. We do not sell your personal data to third parties.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-6 bg-zinc-950/50 border border-white/5 rounded-2xl">
                                    <h4 className="font-bold text-white mb-2">Service Providers</h4>
                                    <p className="text-sm text-slate-500">Shipping companies, payment processors, and hosting providers.</p>
                                </div>
                                <div className="p-6 bg-zinc-950/50 border border-white/5 rounded-2xl">
                                    <h4 className="font-bold text-white mb-2">Aggregated Data</h4>
                                    <p className="text-sm text-slate-500">Non-personally identifiable information shared for research and marketing.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* 5. Security */}
                        <motion.div variants={itemVariants} className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-12">
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                <Lock className="w-6 h-6 text-[#7080FF]" /> 5. How Do We Protect Your Personal Information?
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-[#7080FF]/10 rounded-xl flex items-center justify-center text-[#7080FF] mx-auto mb-4">
                                        <Shield className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-bold text-white mb-2">Physical Security</h4>
                                    <p className="text-xs text-slate-500">Secure facilities for data storage.</p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-[#7080FF]/10 rounded-xl flex items-center justify-center text-[#7080FF] mx-auto mb-4">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-bold text-white mb-2">Technical Security</h4>
                                    <p className="text-xs text-slate-500">Encryption and SSL protocols.</p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-[#7080FF]/10 rounded-xl flex items-center justify-center text-[#7080FF] mx-auto mb-4">
                                        <UserCheck className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-bold text-white mb-2">Access Controls</h4>
                                    <p className="text-xs text-slate-500">Limited access to authorized staff.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* 6. Rights */}
                        <motion.div variants={itemVariants} className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-12">
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                <FileText className="w-6 h-6 text-[#7080FF]" /> 6. Your Choices and Rights
                            </h2>
                            <p className="text-slate-400 mb-6">You have the right to access, correct, delete, or port your personal information. You can also opt-out of marketing communications at any time.</p>
                            <div className="p-6 bg-[#7080FF]/5 border border-[#7080FF]/20 rounded-2xl">
                                <p className="text-sm text-slate-300">To exercise these rights, please contact us at <a href="mailto:toffay.sa@gmail.com" className="text-[#7080FF] font-bold">toffay.sa@gmail.com</a></p>
                            </div>
                        </motion.div>

                        {/* Footer sections 7-9 */}
                        <div className="grid md:grid-cols-3 gap-8">
                            <motion.div variants={itemVariants} className="p-8 bg-zinc-900/50 border border-white/10 rounded-3xl">
                                <h3 className="font-bold text-white mb-4">7. Changes</h3>
                                <p className="text-sm text-slate-500">We may update this policy periodically. The latest version will always be posted on our Website.</p>
                            </motion.div>
                            <motion.div variants={itemVariants} className="p-8 bg-zinc-900/50 border border-white/10 rounded-3xl">
                                <h3 className="font-bold text-white mb-4">8. Contact</h3>
                                <p className="text-sm text-slate-500">Questions? Contact us at: toffay.sa@gmail.com</p>
                            </motion.div>
                            <motion.div variants={itemVariants} className="p-8 bg-zinc-900/50 border border-white/10 rounded-3xl">
                                <h3 className="font-bold text-white mb-4">9. Agreement</h3>
                                <p className="text-sm text-slate-500">This policy constitutes the entire agreement regarding your privacy with Toffay.</p>
                            </motion.div>
                        </div>

                        {/* Contact Footer */}
                        <motion.div variants={itemVariants} className="mt-12 text-center bg-gradient-to-r from-[#7080FF]/10 via-transparent to-[#7080FF]/10 rounded-3xl p-12 border border-white/5">
                            <h3 className="text-2xl font-bold mb-4">Privacy Concerns?</h3>
                            <p className="text-slate-400 mb-8 max-w-md mx-auto">
                                We are here to help you understand how your data is used. Reach out to our team anytime.
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

export default PrivacyPolicy;
