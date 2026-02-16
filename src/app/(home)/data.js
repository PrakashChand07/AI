
export const navLinks = [
    { label: "Home", link: "/" },
    { label: "Features", link: "#features" },
    { label: "Generator", link: "#generator" },
    { label: "Pricing", link: "#price" },
    { label: "FAQ", link: "#faq" }
];

export const features = [
    {
        icon: "lucide:layers",
        title: "Layered Design",
        description: "Start working with Tailwindcss It allows you to compose complex designs by combining and customizing utility classes."
    },
    {
        icon: "lucide:palette",
        title: "Customizable Colors",
        description: "Easily adapt the colors to fit your brand identity with CSS variables and Tailwind's color palette."
    },
    {
        icon: "lucide:zap",
        title: "Fast Performance",
        description: "Built with Next.js for blazing fast performance and SEO optimizations out of the box."
    },
    {
        icon: "lucide:shield",
        title: "Secure & Reliable",
        description: "Ensures your data and users are protected with best practices in security and reliability."
    }
];

export const postGeneratorFeatures = [
    {
        icon: "lucide:image",
        title: "Image Generation",
        description: "Create stunning visuals with AI-powered image generation tools in seconds."
    },
    {
        icon: "lucide:type",
        title: "Text Content",
        description: "Generate engaging captions, blog posts, and marketing copy tailored to your audience."
    },
    {
        icon: "lucide:video",
        title: "Video Creation",
        description: "Transform text into captivating videos with AI video generation capabilities."
    }
];

export const pricingPlans = [
    {
        name: "Starter",
        price: 19,
        isPopular: false,
        features: [
            "Access to basic features",
            "5 AI generations per day",
            "Standard support",
            "Community access"
        ]
    },
    {
        name: "Professional",
        isPopular: true,
        price: 49,
        features: [
            "Unlimited features",
            "50 AI generations per day",
            "Priority support",
            "Advanced analytics"
        ]
    },
    {
        name: "Enterprise",
        price: 99,
        isPopular: false,
        features: [
            "Custom solutions",
            "Unlimited generations",
            "24/7 Dedicated support",
            "SLA & security audit"
        ]
    }
];

export const faqs = [
    {
        id: 1,
        question: "What is WebAI?",
        answer: "WebAI is a powerful platform that leverages artificial intelligence to help you create content, designs, and more with ease."
    },
    {
        id: 2,
        question: "How do I get started?",
        answer: "Getting started is easy! Create an account, choose a plan, and start exploring our AI tools."
    },
    {
        id: 3,
        question: "Is there a free trial?",
        answer: "Yes, we offer a free tier with limited features so you can try out the platform before committing."
    },
    {
        id: 4,
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans."
    },
    {
        id: 5,
        question: "Can I cancel my subscription?",
        answer: "Yes, you can cancel your subscription at any time from your account settings."
    },
    {
        id: 6,
        question: "Do you offer customer support?",
        answer: "Absolutely! Our support team is available to assist you via email and live chat."
    }
];

export const footerLinks = [
  {
    title: 'Product',
    links: [
      { name: 'Features', url: '#features' },
      { name: 'Pricing', url: '#price' },
      { name: 'Generator', url: '#generator' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', url: '#' },
      { name: 'Careers', url: '#' },
      { name: 'Contact', url: '#' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Blog', url: '#' },
      { name: 'Help Center', url: '#' },
      { name: 'API Docs', url: '#' }
    ]
  }
];
