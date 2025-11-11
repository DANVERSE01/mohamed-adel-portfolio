import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Button } from "./ui/button";
import { OWNER } from "@/const";
import { HeroBackground } from "./HeroBackground";
import { Suspense, lazy } from "react";

const Hero3DScene = lazy(() => import("./Hero3DScene"));

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={<HeroBackground />}>
        <Hero3DScene />
      </Suspense>

      {/* Content */}
      <div className="container relative z-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D2D64A]/10 border border-[#D2D64A]/30 mb-6">
              <Sparkles className="w-4 h-4 text-[#D2D64A]" />
              <span className="text-sm text-[#D2D64A] font-medium">
                AI-Powered Creative Direction
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black mb-6 leading-none tracking-tight break-words">
              <span className="name-gradient block" style={{fontSize: '70px'}}>
                {OWNER.fullName}
              </span>
            </h1>

            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-8 text-foreground/80">
              {OWNER.title}
            </h2>

            <p className="text-lg md:text-xl text-foreground/70 mb-12 max-w-2xl leading-relaxed font-medium">
              {OWNER.bio}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/work">
                <Button size="lg" className="group glow-blue text-lg px-8 py-6">
                  View My Work
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="elegant-border text-lg px-8 py-6">
                  Get In Touch
                </Button>
              </Link>
            </div>

            {/* Expertise Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-12 flex flex-wrap gap-3"
            >
              {OWNER.expertise.slice(0, 4).map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="px-4 py-2 rounded-lg bg-card/40 backdrop-blur-sm border border-border text-sm text-foreground"
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>


    </section>
  );
}
