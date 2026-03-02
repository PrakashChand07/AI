"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Gavel, Scale, Globe, FileText, Info, Mail, AlertTriangle } from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';
import MainFooter from '@/components/MainFooter';

const TermsOfService = () => {
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
                                Terms of
                            </span>
                            <span className="block text-[#7080FF]">Service</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Welcome to the Toffay website. By accessing or using our Website, you agree to be bound by these Terms of Service.
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
                        {/* 1. Introduction */}
                        <motion.div variants={itemVariants} className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-12">
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                <Info className="w-6 h-6 text-[#7080FF]" /> 1. Introduction
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                The Website is owned and operated by Toffay, Inc. ("Toffay"). By accessing or using the Website, you agree to be bound by these Terms of Service (the "Terms"). If you do not agree to these Terms, you may not access or use the Website.
                            </p>
                        </motion.div>

                        {/* 2. Changes */}
                        <motion.div variants={itemVariants} className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-12">
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                <FileText className="w-6 h-6 text-[#7080FF]" /> 2. Changes to the Terms
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                Toffay may update these Terms from time to time. The most current version of the Terms will be posted on the Website. You are responsible for reviewing the Terms periodically. Your continued use of the Website after any changes constitutes your acceptance of the updated Terms.
                            </p>
                        </motion.div>

                        {/* 3. Use of Website */}
                        <motion.div variants={itemVariants} className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-12">
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                <Scale className="w-6 h-6 text-[#7080FF]" /> 3. Use of the Website
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                The Website is for your personal use only. You may not use the Website for any commercial or business purposes. You may not modify, copy, distribute, or sell any information obtained from the Website.
                            </p>
                            <div className="bg-[#7080FF]/5 border border-[#7080FF]/20 rounded-2xl p-6">
                                <h4 className="text-[#7080FF] font-bold mb-2 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" /> Promotional Consent
                                </h4>
                                <p className="text-sm text-slate-400">
                                    By submitting our webform, you agree to receive promotional calls on the number shared. Such calls and SMS may come from a third-party platform.
                                </p>
                            </div>
                        </motion.div>

                        {/* 4 & 5 Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <motion.div variants={itemVariants} className="p-8 bg-zinc-900/50 border border-white/10 rounded-3xl">
                                <h3 className="text-xl font-bold text-white mb-4">4. Content Ownership</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    All text, images, audio, and video on this Website are the property of Toffay or its licensors. Unauthorized use is strictly prohibited.
                                </p>
                            </motion.div>
                            <motion.div variants={itemVariants} className="p-8 bg-zinc-900/50 border border-white/10 rounded-3xl">
                                <h3 className="text-xl font-bold text-white mb-4">5. Third-Party Links</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    We may link to other websites for your convenience. Toffay does not endorse or take responsibility for the content on these external sites.
                                </p>
                            </motion.div>
                        </div>

                        {/* 6. Liability */}
                        <motion.div variants={itemVariants} className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-12">
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                <AlertTriangle className="w-6 h-6 text-[#7080FF]" /> 6. Disclaimer of Liability
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                The Website is provided on an "as is" basis. Toffay disclaims all liability for any damages arising from your use of the Website, including direct, indirect, or consequential damages. We make no warranties regarding the accuracy or completeness of the content.
                            </p>
                        </motion.div>

                        {/* 7. Governing Law */}
                        <motion.div variants={itemVariants} className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 lg:p-12">
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                <Globe className="w-6 h-6 text-[#7080FF]" /> 7. Governing Law
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                These Terms will be governed by and construed by the laws of the Government of India. You agree to submit to the exclusive jurisdiction of the courts located in India for all disputes relating to these Terms.
                            </p>
                        </motion.div>

                        {/* 8 & 9 Contact & Agreement */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <motion.div variants={itemVariants} className="p-8 bg-zinc-900/50 border border-white/10 rounded-3xl">
                                <h3 className="text-xl font-bold text-white mb-4">8. Contact Information</h3>
                                <p className="text-sm text-slate-500">
                                    Questions? Reach out to us at: <br />
                                    <a href="mailto:toffay.sa@gmail.com" className="text-[#7080FF] font-bold">toffay.sa@gmail.com</a>
                                </p>
                            </motion.div>
                            <motion.div variants={itemVariants} className="p-8 bg-zinc-900/50 border border-white/10 rounded-3xl">
                                <h3 className="text-xl font-bold text-white mb-4">9. Entire Agreement</h3>
                                <p className="text-sm text-slate-500">
                                    These Terms constitute the entire agreement between you and Toffay regarding your use of the Website.
                                </p>
                            </motion.div>
                        </div>

                        {/* Contact Footer */}
                        <motion.div variants={itemVariants} className="mt-12 text-center bg-gradient-to-r from-[#7080FF]/10 via-transparent to-[#7080FF]/10 rounded-3xl p-12 border border-white/5">
                            <h3 className="text-2xl font-bold mb-4">Agreement</h3>
                            <p className="text-slate-400 mb-8 max-w-md mx-auto">
                                By continuing to use our services, you agree to these terms. We value your trust and are here to help.
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

export default TermsOfService;
