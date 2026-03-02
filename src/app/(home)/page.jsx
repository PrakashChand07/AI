"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, ChevronRight, CheckCircle2, Shield, Zap, Bot, Cpu, Play, Quote, Plus, Minus, Globe, Palette, MapPin, Mail, Phone, MessageCircle, Coins, LogOut } from 'lucide-react';
import logo from '@/assets/images/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopNavbar from '@/components/TopNavbar';
// --- Components ---
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#7080FF] opacity-20 blur-[100px]"></div>
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]"
      />
    </div>
  );
}

function SpotlightCard({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-white/10 bg-zinc-900/50 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(112, 128, 255, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
}

const Marquee = ({ items, direction = "left" }) => {
  return (
    <div className="relative flex overflow-hidden w-full bg-black/50 py-8 border-y border-white/5">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 flex-nowrap"
      >
        {[...items, ...items].map((src, i) => (
          <div key={i} className="flex-none w-64 h-40 rounded-xl overflow-hidden border border-white/10 group relative">
            <img src={src} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-[#7080FF] transition-colors"
      >
        <span className="font-medium text-lg">{question}</span>
        {isOpen ? <Minus className="w-5 h-5 text-[#7080FF]" /> : <Plus className="w-5 h-5 text-slate-500" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Component ---
export default function Home() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userCredits, setUserCredits] = useState(0);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/buy-credits");
    } else {
      router.push("/login?redirect=/buy-credits");
    }
  };

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUserCredits(data.data?.credits || 0);
      }
    } catch (error) {
      console.error("Auth check failed", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout");
      setIsAuthenticated(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const marqueeImages = [
    "https://images.unsplash.com/photo-1668987649997-e7fc696465a9?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1685360798969-395cf93b7d2d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1763198215363-aeb2decffeda?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1649750291679-1ee88c324527?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1607823477522-177cff8183d1?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-[#7080FF]/30 overflow-x-hidden">
      {/* Navigation */}
      <TopNavbar navLinks={[]} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <HeroBackground />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7080FF]/10 border border-[#7080FF]/20 text-[#7080FF] text-sm font-medium mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(112,128,255,0.3)]"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="tracking-wide">AI-POWERED STORYTELLING ENGINE v2.0</span>
              </motion.div>

              <h1 className="text-6xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                  Dream It.
                </span>
                <span className="block mt-2 relative">
                  <span className="absolute -inset-1 blur-2xl bg-[#7080FF]/20"></span>
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#7080FF] via-purple-400 to-[#7080FF] animate-gradient-x">
                    Make It Real.
                  </span>
                </span>
              </h1>

              <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
                The most advanced AI storybook generator. Turn a single photo into a
                <span className="text-white font-semibold"> fully illustrated </span>
                masterpiece in seconds.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/create-storybook">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[#7080FF] rounded-2xl text-xl font-bold text-white shadow-[0_0_40px_-10px_rgba(112,128,255,0.5)] overflow-hidden w-full sm:w-auto justify-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                    <span className="relative z-10 flex items-center gap-3">
                      <Zap className="w-6 h-6 fill-white" />
                      Generate Storybook
                    </span>
                    <ChevronRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-2xl text-xl font-bold text-white border border-white/10 hover:bg-white/5 transition-colors w-full sm:w-auto flex items-center justify-center gap-3"
                >
                  <Play className="w-5 h-5 fill-white" />
                  Watch Demo
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* 3D Floating Showcase */}
          <div className="grid md:grid-cols-3 gap-8 perspective-1000 mb-20">
            {[
              { title: "Cosmic Voyager", tag: "Sci-Fi", color: "#7080FF", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" },
              { title: "Enchanted Woods", tag: "Fantasy", color: "#d946ef", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800" },
              { title: "Deep Blue", tag: "Ocean", color: "#14b8a6", img: "https://images.unsplash.com/photo-1751879182448-d7b3dce2b00e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcndhdGVyJTIwZmFudGFzeSUyMG1hZ2ljYWwlMjBvY2VhbiUyMHdvcmxkJTIwY2hpbGRyZW4lMjBib29rJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc3MDIwNjEwMnww&ixlib=rb-4.1.0&q=80&w=1080" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-b from-white/20 to-transparent rounded-[20px] opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10" />
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-white uppercase tracking-wider">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <div className="h-1 w-12 rounded-full" style={{ backgroundColor: item.color }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <section className="pb-20">
        <p className="text-center text-sm font-medium text-slate-500 uppercase tracking-widest mb-6">Recent Community Creations</p>
        <Marquee items={marqueeImages} />
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-zinc-950 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#7080FF]/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Powered by <span className="text-[#7080FF]">Next-Gen AI</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              We combine advanced LLMs with state-of-the-art image synthesis to create consistent, high-fidelity characters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Bot,
                title: "Character Consistency",
                desc: "Our AI maintains your child's face and features across every page of the story."
              },
              {
                icon: Wand2,
                title: "Adaptive Storytelling",
                desc: "Plots that adapt to your child's age, interests, and chosen themes."
              },
              {
                icon: Cpu,
                title: "Instant Rendering",
                desc: "High-resolution PDF generation in under 60 seconds."
              },
              {
                icon: Palette,
                title: "Multi-Style Engine",
                desc: "Switch between Pixar 3D, Watercolor, Anime, and Classic Book styles instantly."
              },
              {
                icon: Globe,
                title: "Global Languages",
                desc: "Generate stories in over 30 languages to help with language learning."
              },
              {
                icon: Shield,
                title: "Child Safe & Secure",
                desc: "Content filtering ensures 100% child-friendly narratives and imagery."
              }
            ].map((feature, i) => (
              <SpotlightCard key={i} className="rounded-3xl p-8 hover:shadow-[0_0_30px_-5px_rgba(112,128,255,0.15)] transition-shadow">
                <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-[#7080FF] shadow-inner">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 relative bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Create Magic in <span className="text-[#7080FF]">3 Steps</span></h2>
          </div>

          <div className="relative grid md:grid-cols-3 gap-12">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-[#7080FF]/30 to-transparent" />

            {[
              { step: "01", title: "Upload Reference", desc: "Upload a clear photo of your child for character training." },
              { step: "02", title: "Customize Story", desc: "Choose a theme, moral lesson, and art style." },
              { step: "03", title: "Generate & Print", desc: "Get your personalized PDF storybook in less than a minute." }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-2xl font-bold text-[#7080FF] mb-8 relative z-10 shadow-[0_0_30px_-5px_rgba(112,128,255,0.3)]">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-400 max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-zinc-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">What Parents Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "I was blown away by how much the character looked like my son. He asks for 'his book' every night!",
                author: "Sarah J.",
                role: "Mother of 2"
              },
              {
                text: "The quality of the illustrations rivals what you see in bookstores. Absolutely stunning technology.",
                author: "Michael T.",
                role: "Art Director"
              },
              {
                text: "Finally a way to get my daughter interested in reading. She loves seeing herself as a space explorer.",
                author: "Elena R.",
                role: "Teacher"
              }
            ].map((t, i) => (
              <div key={i} className="bg-black/50 p-8 rounded-3xl border border-white/5 relative">
                <Quote className="absolute top-8 left-8 w-8 h-8 text-[#7080FF]/20" />
                <p className="text-slate-300 italic mb-6 relative z-10 pl-4">{t.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#7080FF] flex items-center justify-center font-bold text-white">
                    {t.author[0]}
                  </div>
                  <div>
                    <div className="font-bold">{t.author}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400">Start for free, then pay as you create.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Starter", price: "₹49", credits: "50 Credits", features: ["50 AI generation credits", "Valid for 30 days", "Standard support", "Community access"] },
              { name: "Professional", price: "₹99", credits: "105 Credits", features: ["105 AI generation credits", "Valid for 60 days", "Priority support", "Advanced features"], popular: true },
              { name: "Enterprise", price: "₹149", credits: "160 Credits", features: ["160 AI generation credits", "Valid for 90 days", "24/7 Dedicated support", "Premium features"] }
            ].map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-3xl border flex flex-col ${plan.popular
                ? 'bg-[#7080FF]/5 border-[#7080FF]/50 shadow-[0_0_30px_-10px_rgba(112,128,255,0.2)]'
                : 'bg-zinc-900/50 border-white/10'
                }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#7080FF] text-white text-[10px] font-bold tracking-widest uppercase rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-1">{plan.price}</div>
                <div className="text-[#7080FF] font-mono text-sm mb-8">{plan.credits}</div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#7080FF]" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleGetStarted}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular
                    ? 'bg-[#7080FF] hover:bg-[#5e6ce6] text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-zinc-900/30">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-2">
            <FAQItem
              question="How does the credit system work?"
              answer="Each storybook generation costs 10 credits. You can purchase credits in bundles, and they never expire."
            />
            <FAQItem
              question="Is my child's photo safe?"
              answer="Absolutely. We process photos ephemerally to train the character model and then they are immediately deleted from our training servers. We prioritize privacy and security."
            />
            <FAQItem
              question="Can I print the books?"
              answer="Yes! We provide high-resolution PDF files that are ready for print. You can print them at home or use any professional printing service."
            />
            <FAQItem
              question="What languages are supported?"
              answer="Currently we support English, Spanish, French, German, and 20 other languages. You can select the output language during generation."
            />
          </div>
        </div>
      </section>

      {/* Floating Contact Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <a
          href="https://wa.me/917779022213"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20bd5a] transition-all hover:scale-110 flex items-center justify-center group relative"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-full mr-3 bg-white text-slate-900 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
            Chat on WhatsApp
          </span>
        </a>
        <a
          href="tel:+917779022213"
          className="bg-[#7080FF] text-white p-4 rounded-full shadow-lg hover:bg-[#6070ef] transition-all hover:scale-110 flex items-center justify-center group relative"
          aria-label="Call Us"
        >
          <Phone className="w-6 h-6" />
          <span className="absolute right-full mr-3 bg-white text-slate-900 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
            Call Us
          </span>
        </a>
      </div>

    </div>
  );
}