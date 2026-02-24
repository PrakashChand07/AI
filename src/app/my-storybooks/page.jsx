"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Background2 from "@/components/Background2";
import TopNavbar from "@/components/TopNavbar";
import { navLinks } from "../(home)/data";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { cn } from "@/helpers/cn";

const MyStorybooksPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [storybooks, setStorybooks] = useState([]);

    const fetchStorybooks = useCallback(async () => {
        try {
            const response = await fetch("/api/storybook/history");
            if (response.ok) {
                const data = await response.json();
                setStorybooks(data.data || []);
            } else if (response.status === 401) {
                router.push("/login?redirect=/my-storybooks");
            }
        } catch (error) {
            console.error("Failed to fetch storybooks:", error);
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        fetchStorybooks();
    }, [fetchStorybooks]);

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

            <section className="py-32 relative min-h-screen">
                <div className="container">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-12">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">My Storybooks</h1>
                            <p className="text-default-300">
                                Your collection of AI-generated magical adventures.
                            </p>
                        </div>
                        <Link
                            href="/create-storybook"
                            className="inline-flex items-center justify-center gap-2 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-hover transition-all"
                        >
                            <IconifyIcon icon="lucide:plus" className="w-5 h-5" />
                            Create New Storybook
                        </Link>
                    </div>

                    {storybooks.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <IconifyIcon icon="lucide:book-open" className="w-8 h-8 text-default-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No Storybooks Yet</h3>
                            <p className="text-default-400 mb-8 max-w-sm mx-auto">
                                You haven&apos;t created any storybooks yet. Start your first magical journey today!
                            </p>
                            <Link
                                href="/create-storybook"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white py-3 px-6 rounded-lg hover:bg-white/20 transition-all border border-white/10"
                            >
                                Create First Storybook
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {storybooks.map((book) => {
                                // Calculate expiry
                                const expiresAt = book.expiresAt
                                    ? new Date(book.expiresAt)
                                    : new Date(new Date(book.createdAt).getTime() + 24 * 60 * 60 * 1000);
                                const now = new Date();
                                const isExpired = now >= expiresAt;
                                const timeLeft = expiresAt - now;

                                // Format time remaining
                                let timeRemainingText = "";
                                if (!isExpired && timeLeft > 0) {
                                    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
                                    const minsLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                                    timeRemainingText = hoursLeft > 0 ? `${hoursLeft}h ${minsLeft}m left` : `${minsLeft}m left`;
                                }

                                return (
                                    <div
                                        key={book._id}
                                        className={cn(
                                            "group relative bg-slate-950/50 border rounded-xl overflow-hidden transition-all duration-300",
                                            isExpired
                                                ? "border-white/5 opacity-60 grayscale"
                                                : "border-white/10 hover:border-primary/50 hover:-translate-y-1"
                                        )}
                                    >
                                        {/* Cover Image */}
                                        <div className="relative h-64 w-full bg-slate-900">
                                            {book.coverImageUrl ? (
                                                <Image
                                                    src={book.coverImageUrl}
                                                    alt={book.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-default-500">
                                                    <IconifyIcon icon="lucide:image" className="w-8 h-8" />
                                                </div>
                                            )}

                                            {/* Expired Overlay */}
                                            {isExpired && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <IconifyIcon icon="lucide:clock" className="w-8 h-8 text-red-400 mx-auto mb-1" />
                                                        <span className="text-red-400 font-bold text-sm">EXPIRED</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Status Badge */}
                                            <div className="absolute top-4 right-4">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border",
                                                    isExpired ? 'bg-red-500/20 border-red-500/30 text-red-400' :
                                                        book.status === 'completed' ? 'bg-green-500/20 border-green-500/30 text-green-400' :
                                                            book.status === 'failed' ? 'bg-red-500/20 border-red-500/30 text-red-400' :
                                                                'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
                                                )}>
                                                    {isExpired ? 'Expired' : book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                                                </span>
                                            </div>

                                            {/* Time Remaining Badge */}
                                            {!isExpired && book.status === 'completed' && (
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border bg-orange-500/20 border-orange-500/30 text-orange-400 flex items-center gap-1">
                                                        <IconifyIcon icon="lucide:timer" className="w-4 h-4" />
                                                        {timeRemainingText}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className={cn("text-xl font-bold line-clamp-1", isExpired ? "text-default-500" : "text-white")}>{book.title}</h3>
                                                <span className="text-xs text-default-500 whitespace-nowrap">
                                                    {new Date(book.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <p className={cn("text-sm mb-4 line-clamp-2", isExpired ? "text-default-600" : "text-default-400")}>
                                                {book.storyline}
                                            </p>

                                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                                                <div className="text-xs text-default-500">
                                                    {book.pages} Pages • {book.characterName}
                                                </div>

                                                {book.status === 'completed' && book.pdfUrl ? (
                                                    isExpired ? (
                                                        <span className="flex items-center gap-2 text-default-600 font-medium text-sm cursor-not-allowed">
                                                            <IconifyIcon icon="lucide:download" className="w-4 h-4" />
                                                            Expired
                                                        </span>
                                                    ) : (
                                                        <button
                                                            onClick={async (e) => {
                                                                e.preventDefault();
                                                                try {
                                                                    const response = await fetch(book.pdfUrl);
                                                                    const blob = await response.blob();
                                                                    const url = window.URL.createObjectURL(blob);
                                                                    const a = document.createElement('a');
                                                                    a.style.display = 'none';
                                                                    a.href = url;
                                                                    a.download = `${book.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'storybook'}.pdf`;
                                                                    document.body.appendChild(a);
                                                                    a.click();
                                                                    window.URL.revokeObjectURL(url);
                                                                } catch (error) {
                                                                    console.error('Download failed:', error);
                                                                    window.open(book.pdfUrl, '_blank');
                                                                }
                                                            }}
                                                            className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium text-sm transition-colors cursor-pointer"
                                                        >
                                                            <IconifyIcon icon="lucide:download" className="w-4 h-4" />
                                                            Download PDF
                                                        </button>
                                                    )
                                                ) : (
                                                    <span className="text-sm text-default-500 italic">Processing...</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default MyStorybooksPage;
