// Professional Portfolio Data - Organized with Descriptive File Names
// Total: 59 assets (43 images + 16 videos)
// Last updated: November 10, 2025
// Added: KOVA Cosmetics Beauty Campaign

export interface PortfolioAsset {
  id: string;
  type: 'image' | 'video';
  category: string;
  title: string;
  caption: string;
  file: string;
  thumbnail?: string;
  quality?: 'premium' | 'standard';
}

export const CATEGORIES = [
  'Beauty & Cosmetics Campaigns',
  'AI Character Animation',
  'Cinematic Video Production',
  'AI Video Generation',
  'Product Visualization',
  '3D Visualization & Concept Art',
  'AI Character Design & 3D',
  'Brand Identity & Logo Design',
  'Social Media & Content Design',
  'Product Photography & Food Design',
  'AI-Generated Art & Illustrations'
] as const;

export type Category = typeof CATEGORIES[number];

export const portfolioAssets: PortfolioAsset[] = [
  // ========================================
  // BEAUTY & COSMETICS CAMPAIGNS
  // ========================================
  
  // KOVA Cosmetics - Premium Beauty Campaign
  {
    id: 'kova-brand-campaign',
    type: 'video',
    category: 'Beauty & Cosmetics Campaigns',
    title: 'KOVA Cosmetics Brand Film',
    caption: 'Luxury beauty brand campaign showcasing premium mascara line',
    file: '/portfolio/projects/kova-cosmetics/kova-cosmetics-brand-campaign.mov',
    quality: 'premium'
  },
  {
    id: 'kova-duo-showcase',
    type: 'image',
    category: 'Beauty & Cosmetics Campaigns',
    title: 'KOVA Duo Model Campaign',
    caption: 'Premium beauty photography featuring dual models with product',
    file: '/portfolio/projects/kova-cosmetics/kova-duo-models-product-showcase.webp',
    quality: 'premium'
  },
  {
    id: 'kova-product-hero',
    type: 'image',
    category: 'Beauty & Cosmetics Campaigns',
    title: 'KOVA Product Hero Shot',
    caption: 'Clean product photography with elegant brand presentation',
    file: '/portfolio/projects/kova-cosmetics/kova-product-hero-shot.webp',
    quality: 'premium'
  },
  {
    id: 'kova-mascara-lifestyle',
    type: 'image',
    category: 'Beauty & Cosmetics Campaigns',
    title: 'KOVA Lifestyle Photography',
    caption: 'Natural beauty lifestyle shot with product application',
    file: '/portfolio/projects/kova-cosmetics/kova-model-mascara-lifestyle.webp',
    quality: 'premium'
  },
  {
    id: 'kova-brow-application',
    type: 'image',
    category: 'Beauty & Cosmetics Campaigns',
    title: 'KOVA Brow Application',
    caption: 'Professional beauty photography showcasing brow mascara technique',
    file: '/portfolio/projects/kova-cosmetics/kova-brow-mascara-application.webp',
    quality: 'premium'
  },
  {
    id: 'kova-mascara-closeup',
    type: 'image',
    category: 'Beauty & Cosmetics Campaigns',
    title: 'KOVA Mascara Closeup',
    caption: 'Intimate beauty shot highlighting mascara application',
    file: '/portfolio/projects/kova-cosmetics/kova-mascara-application-closeup.webp',
    quality: 'premium'
  },
  {
    id: 'kova-lash-detail',
    type: 'image',
    category: 'Beauty & Cosmetics Campaigns',
    title: 'KOVA Lash Detail',
    caption: 'Macro beauty photography showcasing lash definition',
    file: '/portfolio/projects/kova-cosmetics/kova-lash-detail-macro-shot.webp',
    quality: 'premium'
  },

  // ========================================
  // VIDEOS - Cinematic & Professional
  // ========================================
  
  // AI Character Animation (Premium)
  {
    id: 'ai-character-animation',
    type: 'video',
    category: 'AI Character Animation',
    title: 'AI Character Animation',
    caption: 'Realistic AI-generated character animation with smooth motion',
    file: '/portfolio/videos/ai-character-animation-realistic-motion.mp4',
    thumbnail: '/portfolio/images/photorealistic-3d-visualization-premium.webp',
    quality: 'premium'
  },

  // Product Visualization (Premium)
  {
    id: 'product-exploded-view',
    type: 'video',
    category: 'Product Visualization',
    title: 'Product Exploded View',
    caption: '3D product animation with exploded view morphing',
    file: '/portfolio/videos/product-exploded-view-3d-animation.mp4',
    quality: 'premium'
  },
  {
    id: 'product-showcase',
    type: 'video',
    category: 'Product Visualization',
    title: 'Product Showcase Animation',
    caption: 'Dynamic 3D product presentation with smooth transitions',
    file: '/portfolio/videos/product-showcase-dynamic-presentation.mp4',
    quality: 'premium'
  },

  // Cinematic Video Production (Premium)
  {
    id: 'premium-cinematic-ad',
    type: 'video',
    category: 'Cinematic Video Production',
    title: 'Premium Cinematic Ad',
    caption: 'Top-tier cinematic advertisement with exceptional production value',
    file: '/portfolio/videos/premium-cinematic-advertisement-commercial.mp4',
    quality: 'premium'
  },
  {
    id: 'luxury-brand-commercial',
    type: 'video',
    category: 'Cinematic Video Production',
    title: 'High-End Commercial',
    caption: 'Luxury brand commercial with premium aesthetics',
    file: '/portfolio/videos/luxury-brand-commercial-high-end.mp4',
    quality: 'premium'
  },
  {
    id: 'cinematic-brand-film',
    type: 'video',
    category: 'Cinematic Video Production',
    title: 'Brand Film Production',
    caption: 'Cinematic brand film with storytelling focus',
    file: '/portfolio/videos/cinematic-brand-film-storytelling.mp4',
    quality: 'premium'
  },
  {
    id: 'premium-advertising',
    type: 'video',
    category: 'Cinematic Video Production',
    title: 'Cinematic Advertisement',
    caption: 'Premium advertising content with cinematic quality',
    file: '/portfolio/videos/premium-advertising-content-cinematic.mp4',
    quality: 'premium'
  },

  // Cinematic Video Production (Standard)
  {
    id: 'cinematic-production',
    type: 'video',
    category: 'Cinematic Video Production',
    title: 'Cinematic Brand Film',
    caption: 'High-end cinematic production with professional color grading',
    file: '/portfolio/videos/cinematic-production-professional-grading.mp4'
  },
  {
    id: 'vertical-mobile-ad',
    type: 'video',
    category: 'Cinematic Video Production',
    title: 'Vertical Format Ad',
    caption: 'Mobile-optimized vertical video for social platforms',
    file: '/portfolio/videos/vertical-format-mobile-optimized-ad.mp4'
  },
  {
    id: 'professional-commercial',
    type: 'video',
    category: 'Cinematic Video Production',
    title: 'Professional Commercial',
    caption: 'High-quality commercial production',
    file: '/portfolio/videos/professional-commercial-production-quality.mp4'
  },
  {
    id: 'dynamic-commercial',
    type: 'video',
    category: 'Cinematic Video Production',
    title: 'Dynamic Commercial',
    caption: 'Fast-paced commercial with dynamic editing',
    file: '/portfolio/videos/dynamic-commercial-fast-paced-editing.mp4'
  },
  {
    id: 'brand-story',
    type: 'video',
    category: 'Cinematic Video Production',
    title: 'Brand Story Video',
    caption: 'Engaging brand narrative with cinematic storytelling',
    file: '/portfolio/videos/brand-story-narrative-cinematic.mp4'
  },
  {
    id: 'corporate-brand',
    type: 'video',
    category: 'Cinematic Video Production',
    title: 'Professional Brand Video',
    caption: 'Corporate brand video with polished production',
    file: '/portfolio/videos/corporate-brand-video-polished.mp4'
  },
  {
    id: 'brand-showcase',
    type: 'video',
    category: 'Cinematic Video Production',
    title: 'Brand Showcase',
    caption: 'Clean brand presentation with modern aesthetics',
    file: '/portfolio/videos/brand-showcase-modern-aesthetics.mp4'
  },

  // AI Video Generation
  {
    id: 'grok-ai-video',
    type: 'video',
    category: 'AI Video Generation',
    title: 'Grok AI Video',
    caption: 'AI-generated video using Grok platform',
    file: '/portfolio/videos/grok-ai-generated-video.mov'
  },

  // ========================================
  // IMAGES - 3D & Character Design
  // ========================================

  // 3D Visualization & Concept Art (Premium)
  {
    id: 'photorealistic-3d',
    type: 'image',
    category: '3D Visualization & Concept Art',
    title: 'Premium 3D Render',
    caption: 'Photo-realistic 3D visualization',
    file: '/portfolio/images/photorealistic-3d-visualization-premium.webp',
    quality: 'premium'
  },
  {
    id: 'detailed-3d-character',
    type: 'image',
    category: '3D Visualization & Concept Art',
    title: '3D Character Render 01',
    caption: 'High-quality 3D character with detailed textures',
    file: '/portfolio/images/detailed-3d-character-textures.webp',
    quality: 'premium'
  },
  {
    id: 'cinematic-3d-character',
    type: 'image',
    category: '3D Visualization & Concept Art',
    title: '3D Character Render 02',
    caption: 'Cinematic 3D character with realistic lighting',
    file: '/portfolio/images/cinematic-3d-character-realistic-lighting.webp',
    quality: 'premium'
  },
  {
    id: 'conceptual-3d-art',
    type: 'image',
    category: '3D Visualization & Concept Art',
    title: '3D Concept Design',
    caption: 'Conceptual 3D artwork with creative vision',
    file: '/portfolio/images/conceptual-3d-artwork-creative-vision.webp',
    quality: 'premium'
  },
  {
    id: 'atmospheric-3d-scene',
    type: 'image',
    category: '3D Visualization & Concept Art',
    title: '3D Environment Design',
    caption: 'Atmospheric 3D scene with mood lighting',
    file: '/portfolio/images/atmospheric-3d-scene-mood-lighting.webp',
    quality: 'premium'
  },

  // AI Character Design & 3D
  {
    id: 'tree-spirit-warrior',
    type: 'image',
    category: 'AI Character Design & 3D',
    title: 'Mythical Tree Guardian',
    caption: 'Cinematic 3D character - Ancient tree spirit warrior with glowing blue eyes',
    file: '/portfolio/images/ancient-tree-spirit-warrior-glowing-eyes.webp',
    quality: 'premium'
  },

  // ========================================
  // IMAGES - Brand Identity & Design
  // ========================================

  // Brand Identity & Logo Design
  {
    id: 'modern-brand-identity',
    type: 'image',
    category: 'Brand Identity & Logo Design',
    title: 'Untitled Brand Concept',
    caption: 'Modern brand identity design with geometric elements',
    file: '/portfolio/images/modern-brand-identity-geometric-elements.webp'
  },
  {
    id: 'complete-visual-identity',
    type: 'image',
    category: 'Brand Identity & Logo Design',
    title: 'Brand Identity System',
    caption: 'Complete visual identity with typography and color palette',
    file: '/portfolio/images/complete-visual-identity-typography-palette.webp'
  },
  {
    id: 'minimalist-logo',
    type: 'image',
    category: 'Brand Identity & Logo Design',
    title: 'Logo Concept AA',
    caption: 'Minimalist logo design with clean lines',
    file: '/portfolio/images/minimalist-logo-clean-lines.webp'
  },
  {
    id: 'contemporary-brand-mark',
    type: 'image',
    category: 'Brand Identity & Logo Design',
    title: 'Brand Mark Design',
    caption: 'Contemporary brand mark with modern aesthetics',
    file: '/portfolio/images/contemporary-brand-mark-modern.webp'
  },
  {
    id: 'brand-presentation',
    type: 'image',
    category: 'Brand Identity & Logo Design',
    title: 'Visual Identity Showcase',
    caption: 'Professional brand presentation layout',
    file: '/portfolio/images/professional-brand-presentation-layout.webp'
  },
  {
    id: 'bold-brand-identity',
    type: 'image',
    category: 'Brand Identity & Logo Design',
    title: 'WQ Brand Identity',
    caption: 'Bold brand identity with strong visual impact',
    file: '/portfolio/images/bold-brand-identity-strong-impact.webp'
  },
  {
    id: 'modern-brand-concept',
    type: 'image',
    category: 'Brand Identity & Logo Design',
    title: 'WSW Brand Concept',
    caption: 'Modern brand concept with dynamic elements',
    file: '/portfolio/images/modern-brand-concept-dynamic-elements.webp'
  },

  // ========================================
  // IMAGES - Product & Food Photography
  // ========================================

  // Product Photography & Food Design
  {
    id: 'gourmet-food-photo',
    type: 'image',
    category: 'Product Photography & Food Design',
    title: 'Gourmet Product Shot',
    caption: 'High-end food photography with professional lighting',
    file: '/portfolio/images/gourmet-food-photography-professional-lighting.webp',
    quality: 'premium'
  },
  {
    id: 'artistic-food-styling',
    type: 'image',
    category: 'Product Photography & Food Design',
    title: 'Culinary Presentation',
    caption: 'Artistic food styling and composition',
    file: '/portfolio/images/artistic-food-styling-composition.webp'
  },
  {
    id: 'clean-product-photo',
    type: 'image',
    category: 'Product Photography & Food Design',
    title: 'Product Showcase',
    caption: 'Clean product photography with minimalist aesthetic',
    file: '/portfolio/images/clean-product-photography-minimalist.webp'
  },
  {
    id: 'creative-culinary',
    type: 'image',
    category: 'Product Photography & Food Design',
    title: 'Food Design Concept',
    caption: 'Creative culinary visual with modern presentation',
    file: '/portfolio/images/creative-culinary-visual-modern.webp'
  },
  {
    id: 'macro-product-photo',
    type: 'image',
    category: 'Product Photography & Food Design',
    title: 'Product Detail Shot',
    caption: 'Macro product photography with fine details',
    file: '/portfolio/images/macro-product-photography-fine-details.webp'
  },

  // ========================================
  // IMAGES - Social Media & Content
  // ========================================

  // Social Media & Content Design
  {
    id: 'social-post-01',
    type: 'image',
    category: 'Social Media & Content Design',
    title: 'Social Content 01',
    caption: 'Eye-catching social media post design',
    file: '/portfolio/images/eye-catching-social-media-post.webp'
  },
  {
    id: 'engaging-visual-content',
    type: 'image',
    category: 'Social Media & Content Design',
    title: 'Social Content 02',
    caption: 'Engaging visual content for digital platforms',
    file: '/portfolio/images/engaging-visual-content-digital-platforms.webp'
  },
  {
    id: 'creative-social-graphic',
    type: 'image',
    category: 'Social Media & Content Design',
    title: 'Social Content 03',
    caption: 'Creative social media graphic with bold colors',
    file: '/portfolio/images/creative-social-graphic-bold-colors.webp'
  },
  {
    id: 'modern-social-post',
    type: 'image',
    category: 'Social Media & Content Design',
    title: 'Social Content 04',
    caption: 'Modern social post with clean composition',
    file: '/portfolio/images/modern-social-post-clean-composition.webp'
  },
  {
    id: 'vibrant-social-visual',
    type: 'image',
    category: 'Social Media & Content Design',
    title: 'Social Content 05',
    caption: 'Vibrant social media visual with dynamic layout',
    file: '/portfolio/images/vibrant-social-visual-dynamic-layout.webp'
  },
  {
    id: 'professional-social-content',
    type: 'image',
    category: 'Social Media & Content Design',
    title: 'Social Content 06',
    caption: 'Professional social media content design',
    file: '/portfolio/images/professional-social-content-design.webp'
  },

  // ========================================
  // IMAGES - AI Art & Portraits
  // ========================================

  // AI Character Design & 3D - Portraits
  {
    id: 'ai-portrait-01',
    type: 'image',
    category: 'AI Character Design & 3D',
    title: 'Portrait Series 01',
    caption: 'Professional AI-generated portrait with natural lighting',
    file: '/portfolio/images/ai-portrait-natural-lighting-professional.webp'
  },
  {
    id: 'contemporary-portrait',
    type: 'image',
    category: 'AI Character Design & 3D',
    title: 'Portrait Series 02',
    caption: 'Contemporary portrait study with soft focus',
    file: '/portfolio/images/contemporary-portrait-soft-focus.webp'
  },
  {
    id: 'artistic-portrait',
    type: 'image',
    category: 'AI Character Design & 3D',
    title: 'Portrait Series 03',
    caption: 'Artistic portrait with dramatic composition',
    file: '/portfolio/images/artistic-portrait-dramatic-composition.webp'
  },
  {
    id: 'minimalist-portrait',
    type: 'image',
    category: 'AI Character Design & 3D',
    title: 'Portrait Series 04',
    caption: 'Minimalist portrait with clean aesthetic',
    file: '/portfolio/images/minimalist-portrait-clean-aesthetic.webp'
  },

  // AI-Generated Art & Illustrations
  {
    id: 'unique-ai-art',
    type: 'image',
    category: 'AI-Generated Art & Illustrations',
    title: 'AI Art Creation 01',
    caption: 'Unique AI-generated artistic composition',
    file: '/portfolio/images/unique-ai-artistic-composition.webp'
  },
  {
    id: 'creative-ai-artwork',
    type: 'image',
    category: 'AI-Generated Art & Illustrations',
    title: 'AI Art Creation 02',
    caption: 'Creative AI artwork with vibrant colors',
    file: '/portfolio/images/creative-ai-artwork-vibrant-colors.webp'
  },
  {
    id: 'chatgpt-visual-01',
    type: 'image',
    category: 'AI-Generated Art & Illustrations',
    title: 'ChatGPT Visual 01',
    caption: 'AI-generated visual from ChatGPT prompt engineering',
    file: '/portfolio/images/chatgpt-visual-prompt-engineering.webp'
  },
  {
    id: 'chatgpt-creative-output',
    type: 'image',
    category: 'AI-Generated Art & Illustrations',
    title: 'ChatGPT Visual 02',
    caption: 'Creative AI output with artistic interpretation',
    file: '/portfolio/images/chatgpt-creative-output-artistic.webp'
  },
  {
    id: 'chatgpt-unique-style',
    type: 'image',
    category: 'AI-Generated Art & Illustrations',
    title: 'ChatGPT Visual 03',
    caption: 'AI-generated concept with unique style',
    file: '/portfolio/images/chatgpt-concept-unique-style.webp'
  },
  {
    id: 'chatgpt-engineered',
    type: 'image',
    category: 'AI-Generated Art & Illustrations',
    title: 'ChatGPT Visual 04',
    caption: 'Prompt-engineered AI artwork',
    file: '/portfolio/images/chatgpt-prompt-engineered-artwork.webp'
  },
  {
    id: 'chatgpt-illustration',
    type: 'image',
    category: 'AI-Generated Art & Illustrations',
    title: 'ChatGPT Visual 05',
    caption: 'AI-generated illustration with creative direction',
    file: '/portfolio/images/chatgpt-illustration-creative-direction.webp'
  },
  {
    id: 'chatgpt-text-to-image',
    type: 'image',
    category: 'AI-Generated Art & Illustrations',
    title: 'ChatGPT Visual 06',
    caption: 'Advanced AI artwork from text prompts',
    file: '/portfolio/images/chatgpt-advanced-text-to-image.webp'
  },
  {
    id: 'chatgpt-professional',
    type: 'image',
    category: 'AI-Generated Art & Illustrations',
    title: 'ChatGPT Visual 07',
    caption: 'Professional AI-generated visual content',
    file: '/portfolio/images/chatgpt-professional-visual-content.webp'
  }
];

// Statistics
export const statistics = [
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
  { value: '10+', label: 'Industry Awards' },
  { value: '100%', label: 'Client Satisfaction' },
];

// Testimonials
export const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, KOVA Cosmetics',
    text: 'Working with DANVERSE was a game-changer. Their ability to blend creative vision with AI-powered strategy delivered results that exceeded all our expectations.',
    image: '/images/testimonials/sarah.jpg',
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Director, TechCorp',
    text: 'The 3D web experiences DANVERSE created for our landing pages increased our conversion rate by 47%. Their understanding of both aesthetics and user experience is exceptional.',
    image: '/images/testimonials/michael.jpg',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Creative Director, BrandLab',
    text: 'DANVERSE brought our brand vision to life with stunning cinematic ads. Their fast turnaround and attention to detail made the entire process seamless.',
    image: '/images/testimonials/emma.jpg',
  },
];

// Workflow steps
export const workflow = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description: 'We dive deep into your brand, goals, and target audience to craft a strategic creative direction.',
  },
  {
    step: '02',
    title: 'Concept Development',
    description: 'Our team develops innovative concepts leveraging AI tools and creative expertise.',
  },
  {
    step: '03',
    title: 'Production & Creation',
    description: 'We bring concepts to life with cutting-edge production techniques and AI-powered workflows.',
  },
  {
    step: '04',
    title: 'Refinement & Delivery',
    description: 'We refine every detail and deliver polished, production-ready assets that exceed expectations.',
  },
];

// Education & Certifications
export const educationCertifications = [
  {
    title: 'AI for Good Sandbox',
    organization: 'United Nations',
    year: '2025',
    description: 'Selected for participation in the AI for Good Sandbox initiative.',
  },
  {
    title: 'Advanced Prompt Engineering',
    organization: 'OpenAI',
    year: '2024',
    description: 'Certification in advanced prompt engineering for image, video, and text generation.',
  },
  {
    title: 'Creative Direction & Strategy',
    organization: 'Self-Taught',
    year: '2020-2025',
    description: 'Continuous learning through real-world projects and industry experience.',
  },
];
