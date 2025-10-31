export const COOKIE_NAME = "app_session_id";
import { Sparkles, Video, Palette, Box, Wand2, Film } from "lucide-react";

export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

export const APP_TITLE = "Mohamed Adel - Creative Director & AI Strategist";
export const APP_LOGO = "/images/headshot.jpg";

export const OWNER = {
  fullName: "Mohamed Adel",
  title: "Creative Director & AI Strategist",
  location: "Alexandria, Egypt",
  email: "mohamed.adel1160@icloud.com",
  instagram: "https://instagram.com/muhammedd_adel",
  headshotUrl: "/images/headshot.jpg",
  bio: "Creative director leveraging AI to build global visual identities. Blends strategic thinking with next-gen tools for image, video, and text generation. Operates fast, code-free, and with precision.",
  expertise: [
    "AI-powered Branding",
    "Cinematic Ad Directing",
    "Prompt Engineering (image + text + visual + video)",
    "3D Web Design (Landing Pages + Product UI)",
    "Creative Strategy for Global Markets",
    "Ultra-Realistic Visual Generation",
    "Rapid Monetization Systems (focused on MENA region)"
  ],
  awards: [
    {
      title: "Invited to AI for Good Sandbox – 2025",
      year: "2025",
      description: "Selected for participation in the AI for Good Sandbox initiative, showcasing innovative applications of AI in creative industries."
    },
    {
      title: "Featured in global showcases for Gen-4 creative AI tools",
      year: "2024",
      description: "Work featured in international exhibitions highlighting cutting-edge generative AI applications in visual content creation."
    }
  ]
};

export const SERVICES = [
  {
    title: "AI Character Design",
    description: "Create stunning AI-generated characters with unique personalities and visual styles for brands, games, and storytelling.",
    icon: Wand2,
    features: [
      "Photorealistic AI portraits",
      "Fantasy character concepts",
      "Character animation & motion",
      "Consistent character development"
    ]
  },
  {
    title: "Brand Identity & Logo Design",
    description: "Develop cohesive visual identities powered by AI, from logos to complete brand systems that stand out.",
    icon: Palette,
    features: [
      "AI-powered logo generation",
      "Brand color palette creation",
      "Visual identity systems",
      "Brand guidelines & assets"
    ]
  },
  {
    title: "Cinematic Video Production",
    description: "Direct and produce high-impact cinematic videos and ads using AI-generated visuals and professional storytelling.",
    icon: Film,
    features: [
      "AI-enhanced cinematography",
      "Product visualization videos",
      "Social media video content",
      "Commercial & ad production"
    ]
  },
  {
    title: "Product Visualization",
    description: "Transform products into stunning 3D renders and photorealistic visualizations for marketing and e-commerce.",
    icon: Box,
    features: [
      "3D product rendering",
      "Photorealistic mockups",
      "E-commerce visuals",
      "Interactive 3D experiences"
    ]
  },
  {
    title: "Social Media Content",
    description: "Create scroll-stopping social media content with AI-powered designs optimized for engagement and brand consistency.",
    icon: Sparkles,
    features: [
      "Instagram & TikTok content",
      "Animated social posts",
      "Story & reel templates",
      "Platform-optimized designs"
    ]
  },
  {
    title: "Concept Art & Digital Illustration",
    description: "Bring imaginative worlds and concepts to life with AI-assisted digital art and fantasy illustrations.",
    icon: Video,
    features: [
      "Fantasy & sci-fi environments",
      "Creature & character concepts",
      "Digital illustrations",
      "Artistic style exploration"
    ]
  }
];

export const PROJECTS = [
  {
    id: "ai-creative-empire",
    title: "AI Creative Empire",
    category: "Brand Identity",
    description: "A comprehensive brand identity system for a next-generation creative agency powered by AI.",
    coverImage: "/images/projects/ai-creative-empire-cover.jpg",
    year: "2024",
    tags: ["Branding", "AI", "Visual Identity"]
  }
];
