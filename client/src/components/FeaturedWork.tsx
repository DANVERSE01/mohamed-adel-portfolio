"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "./ui/button";

// Curated 16:9 Videos for Homepage
const featuredProjects = [
  {
    id: 1,
    title: "AI Character Animation",
    category: "AI Character Animation",
    type: "video" as const,
    media: "/ai-character-animation.mp4",
    featured: true,
    size: "large" as const, // 2/3 width
  },
  {
    id: 2,
    title: "3D Product Showcase",
    category: "3D Product Visualization",
    type: "video" as const,
    media: "/3d-product-showcase.mp4",
    featured: true,
    size: "medium" as const, // 1/3 width
  },
  {
    id: 3,
    title: "Motion Graphics",
    category: "Motion Graphics",
    type: "video" as const,
    media: "/motion-graphics.mp4",
    featured: true,
    size: "medium" as const, // 1/3 width
  },
  {
    id: 4,
    title: "Hero Showcase",
    category: "Cinematic Ad Directing",
    type: "video" as const,
    media: "/hero-video-1.mp4",
    featured: true,
    size: "large" as const, // 2/3 width
  },
];

export default function FeaturedWork() {
  return (
    <section className="section bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-black mb-6"
          >
            <span className="gradient-text">Featured Work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary max-w-2xl mx-auto"
          >
            Explore a selection of my latest AI-powered creative projects
          </motion.p>
        </div>

        {/* Asymmetric Masonry Grid */}
        <div className="space-y-8">
          {/* Row 1: Large Left + Medium Right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <ProjectCard project={featuredProjects[0]} size="large" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <ProjectCard project={featuredProjects[1]} size="medium" />
            </motion.div>
          </div>

          {/* Row 2: Medium Left + Large Right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <ProjectCard project={featuredProjects[2]} size="medium" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <ProjectCard project={featuredProjects[3]} size="large" />
            </motion.div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link href="/work">
            <Button size="lg" className="group glow-purple text-lg px-8 py-6">
              View All Projects
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: typeof featuredProjects[0];
  size: "large" | "medium";
}

function ProjectCard({ project, size }: ProjectCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (project.type === "video") {
      const video = document.getElementById(`video-${project.id}`) as HTMLVideoElement;
      if (video) {
        video.play();
        setIsPlaying(true);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (project.type === "video") {
      const video = document.getElementById(`video-${project.id}`) as HTMLVideoElement;
      if (video) {
        video.pause();
        video.currentTime = 0;
        setIsPlaying(false);
      }
    }
  };

  const sizeClasses = {
    large: "aspect-video", // 16:9
    medium: "aspect-video" // 16:9
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg bg-card elegant-border group cursor-pointer h-full video-card hover-lift"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`relative w-full ${sizeClasses[size]} overflow-hidden`}>
        {project.type === "video" ? (
          <>
            <video
              id={`video-${project.id}`}
              src={project.media}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loop
              muted
              playsInline
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 group-hover:bg-black/20">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center glow-blue play-button">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </div>
            )}
          </>
        ) : (
          <img
            src={project.media}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
        <div className="inline-block px-3 py-1 rounded-full bg-accent/20 border border-accent">
          <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
            {project.category}
          </span>
        </div>
        <h3 className="text-2xl font-display font-black text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      </div>
    </div>
  );
}
