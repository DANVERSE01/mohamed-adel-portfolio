"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Creative Director",
    company: "Nexus Digital Agency",
    location: "San Francisco, CA",
    image: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    text: "Working with Muhammed was transformative for our brand. His AI-powered approach to visual storytelling delivered results beyond our expectations. The character animations he created became the cornerstone of our entire campaign.",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "VP of Marketing",
    company: "TechVision Inc.",
    location: "Austin, TX",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    text: "Muhammed's ability to blend AI tools with creative vision is unmatched. He delivered our product showcase videos in record time without compromising quality. His prompt engineering skills saved us thousands in production costs.",
  },
  {
    id: 3,
    name: "Amira Hassan",
    role: "Founder & CEO",
    company: "Lumina Studios",
    location: "Dubai, UAE",
    image: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    text: "The 3D web designs Muhammed created for our landing pages increased our conversion rate by 47%. His understanding of both aesthetics and user experience is exceptional. Highly recommend for any AI-driven creative project.",
  },
  {
    id: 4,
    name: "James Mitchell",
    role: "Brand Manager",
    company: "Velocity Sports",
    location: "London, UK",
    image: "https://i.pravatar.cc/150?img=14",
    rating: 5,
    text: "Muhammed brought our brand vision to life with stunning cinematic ads. His fast turnaround and attention to detail made the entire process seamless. The final deliverables exceeded every benchmark we set.",
  },
  {
    id: 5,
    name: "Priya Sharma",
    role: "Product Director",
    company: "InnovateLab",
    location: "Bangalore, India",
    image: "https://i.pravatar.cc/150?img=20",
    rating: 5,
    text: "His motion graphics work is simply outstanding. Muhammed understands how to communicate complex ideas through visual storytelling. The AI-generated animations he produced became our most shared content ever.",
  },
  {
    id: 6,
    name: "David Kim",
    role: "Creative Lead",
    company: "Fusion Media Group",
    location: "Seoul, South Korea",
    image: "https://i.pravatar.cc/150?img=33",
    rating: 5,
    text: "Muhammed's expertise in AI-powered branding is world-class. He helped us establish a complete visual identity in just 3 weeks. His code-free workflow and strategic thinking make him an invaluable partner.",
  },
];

export default function Testimonials() {
  return (
    <section className="section bg-background/50">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-black mb-6"
          >
            <span className="gradient-text">Client Testimonials</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary max-w-2xl mx-auto"
          >
            What clients say about working with me
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="testimonial-card"
            >
              <div className="relative p-8 rounded-2xl bg-card border-2 border-border/50 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-16 h-16 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-foreground/80 mb-6 flex-grow leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <h4 className="font-bold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      {testimonial.company} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
