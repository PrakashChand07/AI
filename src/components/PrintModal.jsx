"use client";

import { useState } from "react";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

const PrintModal = ({ isOpen, onClose, bookTitle, pdfUrl }) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        remark: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.email) {
            setError("Name, phone, and email are required.");
            return;
        }

        setLoading(true);
        setError("");
        
        try {
            const body = {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                remark: formData.remark,
            };

            const res = await fetch("/api/print", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong.");
            }

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setFormData({ name: "", phone: "", email: "", remark: "" });
                onClose();
            }, 3000);

        } catch (err) {
            console.error("Print request error:", err);
            setError(err.message || "Failed to submit print request.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-default-500 hover:text-white transition-colors"
                >
                    <IconifyIcon icon="lucide:x" className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold text-white mb-2">Request Print</h2>
                <p className="text-default-400 text-sm mb-6">
                    Enter your details for the printed copy of <span className="text-primary font-medium">{bookTitle}</span>.
                </p>

                {success ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <IconifyIcon icon="lucide:check" className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Request Submitted!</h3>
                        <p className="text-default-400">We will process your print request shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}
                        
                        <div>
                            <label className="block text-sm font-medium text-default-300 mb-1">Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                                className="w-full px-4 py-2 bg-slate-950 border border-white/10 rounded-lg text-white placeholder:text-default-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-default-300 mb-1">Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="+1 (555) 000-0000"
                                className="w-full px-4 py-2 bg-slate-950 border border-white/10 rounded-lg text-white placeholder:text-default-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-default-300 mb-1">Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="john@example.com"
                                className="w-full px-4 py-2 bg-slate-950 border border-white/10 rounded-lg text-white placeholder:text-default-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-default-300 mb-1">Remark (Optional)</label>
                            <textarea
                                name="remark"
                                value={formData.remark}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Any special instructions..."
                                className="w-full px-4 py-2 bg-slate-950 border border-white/10 rounded-lg text-white placeholder:text-default-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? (
                                <>
                                    <IconifyIcon icon="lucide:loader-2" className="w-5 h-5 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <IconifyIcon icon="lucide:send" className="w-5 h-5" />
                                    Submit Request
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PrintModal;
