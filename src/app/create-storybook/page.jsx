"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Background2 from "@/components/Background2";
import TopNavbar from "@/components/TopNavbar";
import { navLinks } from "../(home)/data";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { cn } from "@/helpers/cn";

const CreateStorybookPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userCredits, setUserCredits] = useState(0);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [generating, setGenerating] = useState(false);
    const [recentStorybooks, setRecentStorybooks] = useState([]);

    // Form State
    const [formData, setFormData] = useState({
        storyline: "",
        character_name: "",
        age: "",
        gender: "boy",
        pages: ""
    });

    const creditCost = Number(formData.pages) || 0;

    const checkAuth = useCallback(async () => {
        try {
            const response = await fetch("/api/auth/me");
            if (response.ok) {
                const data = await response.json();
                setUserCredits(data.data.credits || 0);
            } else {
                router.push("/login?redirect=/create-storybook");
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            router.push("/login?redirect=/create-storybook");
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        checkAuth();
        fetchRecentStorybooks();
    }, [checkAuth]);

    const fetchRecentStorybooks = async () => {
        try {
            const response = await fetch("/api/storybook/history");
            if (response.ok) {
                const data = await response.json();
                // Get last 3 storybooks
                setRecentStorybooks((data.data || []).slice(0, 3));
            }
        } catch (error) {
            console.error("Failed to fetch history:", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'pages' ? (value === '' ? '' : parseInt(value)) : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userCredits < creditCost) {
            // Show credit warning handled by render
            return;
        }

        if (!imageFile) {
            alert("Please upload a child's photo");
            return;
        }

        try {
            setGenerating(true);

            // 1. Upload Image
            const uploadFormData = new FormData();
            uploadFormData.append("file", imageFile);

            const uploadResponse = await fetch("/api/upload", {
                method: "POST",
                body: uploadFormData
            });

            if (!uploadResponse.ok) throw new Error("Image upload failed");

            const uploadData = await uploadResponse.json();
            const imageUrl = uploadData.url;

            // 2. Generate Storybook
            const generateResponse = await fetch("/api/storybook/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    uploaded_image_url: imageUrl
                })
            });

            if (!generateResponse.ok) {
                const errorData = await generateResponse.json();
                throw new Error(errorData.error || "Generation failed");
            }

            // Use actual remaining credits from API response
            const generateData = await generateResponse.json();

            // Update credits from server (accurate value from DB)
            const newCredits = generateData.remainingCredits;
            if (newCredits !== undefined) {
                setUserCredits(newCredits);
                // Notify navbar to update credits in real-time
                window.dispatchEvent(new CustomEvent('credits-updated', { detail: { credits: newCredits } }));
            } else {
                // Fallback: deduct locally
                setUserCredits(prev => prev - creditCost);
                window.dispatchEvent(new CustomEvent('credits-updated'));
            }

            // Refresh recent list to show the new one
            await fetchRecentStorybooks();

            // Scroll to recent section
            const recentSection = document.getElementById('recent-storybooks');
            if (recentSection) {
                recentSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Reset pages to empty to prevent accidental double-spend
            setFormData(prev => ({ ...prev, pages: "" }));

            alert("Storybook created successfully! Check it out below.");

        } catch (error) {
            console.error("Generation error:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setGenerating(false);
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

            {/* Credit Warning Modal */}
            {userCredits < creditCost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
                        <div className="mx-auto bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <IconifyIcon icon="lucide:alert-circle" className="text-red-500 w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Insufficient Credits</h3>
                        <p className="text-default-300 mb-6">
                            You need <span className="text-white font-bold">{creditCost} credits</span> to generate a {formData.pages}-page storybook.
                            Your current balance is <span className="text-red-400 font-bold">{userCredits} credits</span>.
                        </p>
                        <button
                            onClick={() => router.push('/buy-credits')}
                            className="w-full py-3 px-6 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium transition-all"
                        >
                            Buy Credits Now
                        </button>
                    </div>
                </div>
            )}

            <section className="py-32 relative">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Create Your Storybook
                            </h1>
                            <p className="text-lg text-default-300">
                                Turn your child into the hero of their own magical adventure.
                            </p>
                            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                                <IconifyIcon icon="lucide:coins" className="text-yellow-400" />
                                <span className="text-sm text-default-200">Cost: {creditCost} Credits</span>
                            </div>
                        </div>

                        <div className="bg-slate-950/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-default-300 mb-2">
                                        Child&apos;s Photo (Front Facing)
                                    </label>
                                    <div className="relative group">
                                        <div className={cn(
                                            "border-2 border-dashed border-white/10 rounded-xl p-8 transition-all text-center cursor-pointer hover:border-primary/50 hover:bg-white/5",
                                            previewUrl ? "border-primary" : ""
                                        )}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            {previewUrl ? (
                                                <div className="relative h-48 w-full max-w-xs mx-auto">
                                                    <Image
                                                        src={previewUrl}
                                                        alt="Preview"
                                                        fill
                                                        className="object-cover rounded-lg"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                                        <IconifyIcon icon="lucide:upload-cloud" className="w-6 h-6 text-default-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">Click to upload photo</p>
                                                        <p className="text-xs text-default-400 mt-1">JPG, PNG up to 10MB</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Character Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-default-300 mb-2">
                                            Character Name
                                        </label>
                                        <input
                                            type="text"
                                            name="character_name"
                                            value={formData.character_name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                            placeholder="e.g. Sanu"
                                        />
                                    </div>

                                    {/* Age */}
                                    <div>
                                        <label className="block text-sm font-medium text-default-300 mb-2">
                                            Age
                                        </label>
                                        <input
                                            type="text"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                            placeholder="e.g. 7"
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div>
                                        <label className="block text-sm font-medium text-default-300 mb-2">
                                            Gender
                                        </label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        >
                                            <option value="boy">Boy</option>
                                            <option value="girl">Girl</option>
                                            <option value="child">Child (Neutral)</option>
                                        </select>
                                    </div>

                                    {/* Pages */}
                                    <div>
                                        <label className="block text-sm font-medium text-default-300 mb-2">
                                            Pages (1 Page = 1 Credit)
                                        </label>
                                        <input
                                            type="number"
                                            name="pages"
                                            value={formData.pages}
                                            onChange={handleInputChange}
                                            min="1"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                            placeholder="e.g. 10"
                                        />
                                    </div>
                                </div>

                                {/* Storyline */}
                                <div>
                                    <label className="block text-sm font-medium text-default-300 mb-2">
                                        Story Idea / Theme
                                    </label>
                                    <textarea
                                        name="storyline"
                                        value={formData.storyline}
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                        placeholder="Describe the adventure... (e.g. A journey to the moon to meet cheese aliens)"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={userCredits < creditCost || generating || formData.pages < 1}
                                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary-hover hover:to-purple-500 text-white font-bold text-lg shadow-lg shadow-primary/20 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {generating ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            <span>Weaving Magic... (2-3 mins)</span>
                                        </>
                                    ) : (
                                        "Generate Storybook"
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Recent Storybooks Section */}
                        {recentStorybooks.length > 0 && (
                            <div id="recent-storybooks" className="mt-20">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                    <IconifyIcon icon="lucide:history" className="text-primary" />
                                    Recent Creations
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {recentStorybooks.map((book) => {
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
                                                        : "border-white/10 hover:border-primary/50"
                                                )}
                                            >
                                                {/* Cover Image */}
                                                <div className="relative h-48 w-full bg-slate-900">
                                                    {book.coverImageUrl ? (
                                                        <Image
                                                            src={book.coverImageUrl}
                                                            alt={book.title}
                                                            fill
                                                            className="object-cover"
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
                                                    <div className="absolute top-2 right-2">
                                                        <span className={cn(
                                                            "px-2 py-1 rounded-full text-[10px] font-semibold backdrop-blur-md border",
                                                            isExpired ? 'bg-red-500/20 border-red-500/30 text-red-400' :
                                                                book.status === 'completed' ? 'bg-green-500/20 border-green-500/30 text-green-400' :
                                                                    book.status === 'failed' ? 'bg-red-500/20 border-red-500/30 text-red-400' :
                                                                        'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
                                                        )}>
                                                            {isExpired ? 'Expired' : book.status}
                                                        </span>
                                                    </div>

                                                    {/* Time Remaining Badge */}
                                                    {!isExpired && book.status === 'completed' && (
                                                        <div className="absolute top-2 left-2">
                                                            <span className="px-2 py-1 rounded-full text-[10px] font-semibold backdrop-blur-md border bg-orange-500/20 border-orange-500/30 text-orange-400 flex items-center gap-1">
                                                                <IconifyIcon icon="lucide:timer" className="w-3 h-3" />
                                                                {timeRemainingText}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="p-4">
                                                    <h3 className={cn("text-lg font-bold line-clamp-1 mb-1", isExpired ? "text-default-500" : "text-white")}>{book.title}</h3>
                                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                                                        <span className="text-xs text-default-500">{new Date(book.createdAt).toLocaleDateString()}</span>
                                                        {book.status === 'completed' && book.pdfUrl && (
                                                            isExpired ? (
                                                                <span className="text-xs text-default-600 flex items-center gap-1 cursor-not-allowed">
                                                                    <IconifyIcon icon="lucide:download" className="w-3 h-3" />
                                                                    Expired
                                                                </span>
                                                            ) : (
                                                                <a
                                                                    href={book.pdfUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs text-primary hover:text-white flex items-center gap-1"
                                                                >
                                                                    <IconifyIcon icon="lucide:download" className="w-3 h-3" />
                                                                    Download
                                                                </a>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default CreateStorybookPage;
