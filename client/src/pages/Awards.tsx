import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { OWNER } from "@/const";
import { Award, Calendar } from "lucide-react";

export default function Awards() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12 text-center">
              <h1 className="text-5xl font-bold mb-4">Awards & Recognition</h1>
              <p className="text-muted-foreground text-xl">
                Celebrating achievements in AI-powered creative innovation
              </p>
            </div>

            <div className="space-y-6">
              {OWNER.awards.map((award, index) => (
                <motion.div
                  key={award.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <GlassCard>
                    <div className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Award className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-2xl font-semibold">
                              {award.title}
                            </h3>
                            <div className="flex items-center gap-1 text-primary">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm font-medium">{award.year}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {award.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Additional Recognition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-12"
            >
              <GlassCard hover={false}>
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    Pushing the Boundaries of Creative AI
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    These recognitions reflect a commitment to innovation and excellence in leveraging AI for creative applications. Each achievement represents a milestone in the journey to redefine what's possible in digital creativity.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
