"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, MessageCircle, Send } from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';

const ContactPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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

    const contactCards = [
        {
            icon: <Mail className="w-6 h-6" />,
            label: "Email Us",
            value: "support@zifto.in",
            href: "mailto:support@zifto.in",
            description: "Send us an email anytime",
        },
        {
            icon: <Phone className="w-6 h-6" />,
            label: "Call Us",
            value: "+91 77790 22213",
            href: "tel:+917779022213",
            description: "Mon – Sun, 24/7",
        },
        {
            icon: <MessageCircle className="w-6 h-6" />,
            label: "WhatsApp",
            value: "Chat on WhatsApp",
            href: "https://wa.me/917779022213",
            description: "Quick responses, anytime",
        },
        {
            icon: <Clock className="w-6 h-6" />,
            label: "Working Hours",
            value: "Available 24/7",
            href: null,
            description: "We're always here for you",
        },
    ];

    const socialLinks = [
        {
            icon: <Facebook className="w-5 h-5" />,
            label: "Facebook",
            handle: "@zifto.in",
            href: "https://www.facebook.com/zifto.in",
            color: "hover:bg-blue-600",
        },
        {
            icon: (
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
            label: "Instagram",
            handle: "@zifto.in",
            href: "https://www.instagram.com/zifto.in/?hl=en",
            color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500",
        },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-[#7080FF]/30 overflow-x-hidden">
            <TopNavbar navLinks={[]} />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#7080FF] opacity-10 blur-[100px]" />
                </div>

                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7080FF]/10 border border-[#7080FF]/20 text-[#7080FF] text-sm font-medium mb-6">
                            <Send className="w-4 h-4" />
                            We'd love to hear from you
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                                Get in
                            </span>
                            <span className="text-[#7080FF]"> Touch</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Thank you for visiting Zifto! We're always happy to help with your questions,
                            feedback, or inquiries. Your experience matters to us.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="pb-32 relative">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid gap-8"
                    >
                        {/* Contact Cards Grid */}
                        <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-5">
                            {contactCards.map((card) => (
                                <div
                                    key={card.label}
                                    className="group relative bg-zinc-900/50 border border-white/10 rounded-3xl p-7 hover:border-[#7080FF]/50 transition-all duration-300"
                                >
                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 bg-[#7080FF]/10 border border-[#7080FF]/20 rounded-2xl flex items-center justify-center text-[#7080FF] shrink-0 group-hover:scale-110 transition-transform">
                                            {card.icon}
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">{card.label}</p>
                                            {card.href ? (
                                                <a
                                                    href={card.href}
                                                    target={card.href.startsWith('http') ? '_blank' : undefined}
                                                    rel="noopener noreferrer"
                                                    className="text-white font-bold text-lg hover:text-[#7080FF] transition-colors"
                                                >
                                                    {card.value}
                                                </a>
                                            ) : (
                                                <p className="text-white font-bold text-lg">{card.value}</p>
                                            )}
                                            <p className="text-slate-500 text-sm mt-1">{card.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Address + Social in a row */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Address */}
                            <motion.div variants={itemVariants} className="group bg-zinc-900/50 border border-white/10 rounded-3xl p-8 hover:border-[#7080FF]/50 transition-all duration-300">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-[#7080FF]/10 border border-[#7080FF]/20 rounded-2xl flex items-center justify-center text-[#7080FF] shrink-0 group-hover:scale-110 transition-transform">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Our Address</p>
                                        <p className="text-white font-bold text-lg leading-snug mb-1">340 E, AD</p>
                                        <p className="text-slate-400 leading-relaxed text-sm">
                                            Scheme No. 74-C, Vijay Nagar<br />
                                            Indore, Madhya Pradesh – 452010
                                        </p>
                                        <a
                                            href="https://maps.google.com/?q=Vijay+Nagar,+Indore,+Madhya+Pradesh+452010"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-flex items-center gap-2 text-sm text-[#7080FF] hover:underline font-medium"
                                        >
                                            <MapPin className="w-4 h-4" />
                                            View on Google Maps
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Social Media */}
                            <motion.div variants={itemVariants} className="group bg-zinc-900/50 border border-white/10 rounded-3xl p-8 hover:border-[#7080FF]/50 transition-all duration-300">
                                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">Follow Us</p>
                                <div className="flex flex-col gap-4">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 transition-all duration-300 ${social.color} hover:border-white/20 hover:text-white group/social`}
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                                                {social.icon}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-sm">{social.label}</p>
                                                <p className="text-slate-400 text-xs group-hover/social:text-white/70 transition-colors">{social.handle}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Bottom CTA */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-4 text-center bg-gradient-to-r from-[#7080FF]/10 via-transparent to-[#7080FF]/10 rounded-3xl p-12 border border-white/5"
                        >
                            <h3 className="text-2xl font-bold mb-4">We Appreciate Your Business!</h3>
                            <p className="text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
                                Whether you need assistance, have a suggestion, or just want to share your thoughts — we're committed to providing you with the best support possible.
                            </p>
                            <a
                                href="mailto:support@zifto.in"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-[#7080FF] rounded-2xl font-bold text-white hover:scale-105 transition-transform shadow-[0_0_30px_-5px_rgba(112,128,255,0.4)]"
                            >
                                <Mail className="w-5 h-5" />
                                support@zifto.in
                            </a>
                            <p className="mt-6 text-sm font-medium text-slate-500 uppercase tracking-widest">
                                Sincerely, Zifto Team
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
