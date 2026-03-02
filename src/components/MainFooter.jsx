"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import logo from '@/assets/images/logo.png';

const MainFooter = () => {
    return (
        <footer className="border-t border-white/10 py-16 bg-black relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#7080FF]/50 to-transparent" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src={logo} alt="Toffay Logo" className="h-10 w-auto object-contain" />
                        </div>
                        <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
                            Empowering parents to create magical, personalized stories for their children using the power of generative AI.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/zifto.in/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#7080FF] transition-colors cursor-pointer group">
                                <span className="sr-only">Instagram</span>
                                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-white">Contact Us</h4>
                        <ul className="space-y-5 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#7080FF] shrink-0 mt-0.5" />
                                <span className="leading-relaxed">
                                    C, 301, 3rd Floor, K-1, 340-E/AD,<br />
                                    Vijay Nagar, Scheme No 74,<br />
                                    Indore, Madhya Pradesh 452010
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-[#7080FF] shrink-0" />
                                <a href="mailto:toffay.sa@gmail.com" className="hover:text-white transition-colors">toffay.sa@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-[#7080FF] shrink-0" />
                                <a href="tel:7779022213" className="hover:text-white transition-colors">7779022213</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0" />
                                <a href="https://wa.me/917779022213" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Chat on WhatsApp</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-white">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link href="/terms" className="hover:text-[#7080FF] transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-[#7080FF] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/refund-policy" className="hover:text-[#7080FF] transition-colors">Refund Policy</Link></li>
                            <li><a href="https://zifto.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Zifto.in</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
                        <span className="text-sm text-slate-500">© 2026 Zifto AI Inc. All rights reserved.</span>
                        <span className="hidden md:block text-slate-700">|</span>
                        <span className="text-sm text-slate-500">
                            Design and Developed by <a href="https://codercraftes.com" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-[#7080FF] transition-colors">CoderCraftes</a>
                        </span>
                    </div>
                    <div className="flex gap-8 text-sm text-slate-500">
                        <Link href="/privacy" className="hover:text-[#7080FF] transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-[#7080FF] transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default MainFooter;
