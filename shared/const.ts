export const COOKIE_NAME = "app_session_id";
import { Sparkles, Video, Palette, Box, Wand2, Film } from "lucide-react";

export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

export const APP_TITLE = "DANVERSE - Global AI-Powered Creative Studio";
export const APP_LOGO = "/brand/logo_icon_monogram_only.png";

export const OWNER = {
  fullName: "DANVERSE",
  title: "Global AI-Powered Creative Studio",
  location: "Worldwide",
  email: "hello@danverse.ai",
  instagram: "https://instagram.com/danverse.ai",
  headshotUrl: "/images/danverse-logo.png",
  bio: "World-class creative studio pushing the boundaries of AI-powered visual storytelling. We craft cinematic experiences, interactive 3D worlds, and global brand narratives that set new industry standards.",
  expertise: [
    "Cinematic Production & Storytelling",
    "Interactive 3D Web Experiences (React Three Fiber)",
    "AI-Powered Brand Development",
    "Product Visualization & Animation",
    "Beauty & Fashion Campaigns",
    "Global Creative Strategy",
    "Next-Gen Visual Innovation"
  ],
  awards: [
    {
      title: "Industry Recognition for 3D Innovation",
      year: "2025",
      description: "Recognized for pushing boundaries in interactive 3D web experiences and cinematic AI-powered production."
    },
    {
      title: "Featured in Global Creative Showcases",
      year: "2024",
      description: "Portfolio featured in international exhibitions for next-generation visual storytelling and brand innovation."
    },
    {
      title: "Beauty Campaign Excellence",
      year: "2024",
      description: "Awarded for outstanding work in luxury beauty brand campaigns, including KOVA Cosmetics."
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
