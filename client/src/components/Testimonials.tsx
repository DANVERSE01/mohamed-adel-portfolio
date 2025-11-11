"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "DANVERSE didn't just create a campaign; they built our visual universe. The speed and quality were unlike anything we've experienced. They are the future of creative production.",
    name: "Jessica Chen",
    title: "CEO, KOVA Cosmetics",
    avatar: "/avatars/jessica-chen.png",
    rating: 5,
  },
  {
    quote: "Working with DANVERSE was a masterclass in efficiency and creativity. Their AI-driven approach to 3D visualization saved us months of work and delivered results beyond our wildest expectations.",
    name: "David Lee",
    title: "Head of Product, Nexus Robotics",
    avatar: "/avatars/david-lee.png",
    rating: 5,
  },
  {
    quote: "The level of detail and artistry in their cinematic productions is simply breathtaking. They have a unique ability to blend technology with human emotion, creating stories that truly connect.",
    name: "Sarah Rodriguez",
    title: "Creative Director, Aura Films",
    avatar: "/avatars/sarah-rodriguez.png",
    rating: 5,
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
