import { motion } from "framer-motion";
import { ArrowRight, Award, Briefcase, GraduationCap } from "lucide-react";
import { Link } from "wouter";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { OWNER } from "@/const";
import { statistics, educationCertifications } from "@/data/portfolio";

export default function About() {
  const skills = [
    { name: "AI Image Generation", level: 95 },
    { name: "AI Video Production", level: 90 },
    { name: "Brand Identity Design", level: 92 },
    { name: "Creative Direction", level: 88 },
    { name: "Prompt Engineering", level: 95 },
    { name: "3D Visualization", level: 85 },
    { name: "Motion Graphics", level: 87 },
    { name: "Social Media Strategy", level: 90 }
  ];

  const journey = [
    {
      year: "2025",
      title: "AI for Good Sandbox",
      description: "Invited to participate in the AI for Good Sandbox initiative, showcasing innovative AI applications in creative industries.",
      type: "award" as const
    },
    {
      year: "2024",
      title: "Global AI Showcase",
      description: "Work featured in international exhibitions highlighting cutting-edge generative AI applications.",
      type: "award" as const
    },
    {
      year: "2023-Present",
      title: "Creative Director & AI Strategist",
      description: "Leading AI-powered creative projects for global brands, specializing in visual identity and content creation.",
      type: "work" as const
    },
    {
      year: "2022",
      title: "AI Creative Exploration",
      description: "Pioneered innovative workflows combining traditional creative direction with emerging AI tools.",
      type: "work" as const
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            About Me
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {OWNER.bio}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {[
            { value: `${statistics.projects_completed}+`, label: 'Projects Completed' },
            { value: `${statistics.clients_count}+`, label: 'Happy Clients' },
            { value: `${statistics.years_experience}+`, label: 'Years Experience' },
            { value: `${statistics.client_satisfaction_percent}%`, label: 'Client Satisfaction' }
          ].map((stat: any, index: number) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="p-8 text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              My Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From creative exploration to AI-powered innovation
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary to-primary/50" />

            <div className="space-y-12">
              {journey.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1 ml-16 md:ml-0">
                    <GlassCard className={`p-6 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <div className={`flex items-center gap-2 mb-2 text-primary font-semibold ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        {item.type === "award" ? (
                          <Award className="w-5 h-5" />
                        ) : (
                          <Briefcase className="w-5 h-5" />
                        )}
                        <span className="text-sm">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </GlassCard>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/50">
                      {item.type === "award" ? (
                        <Award className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <Briefcase className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Skills & Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized capabilities in AI-powered creative production
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold">{skill.name}</span>
                  <span className="text-sm text-primary">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                    className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Education & Certifications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Continuous learning in AI and creative technologies
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationCertifications.map((item: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.issuer}</p>
                      <p className="text-xs text-primary">{item.year || item.issued_on?.split('-')[0]}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Create Something Amazing
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to bring your vision to life with AI-powered creativity?
            </p>
            <Link href="/contact">
              <Button size="lg" className="group">
                Start a Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
