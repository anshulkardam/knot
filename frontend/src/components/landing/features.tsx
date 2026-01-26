"use client";
import { Zap, Cpu, Fingerprint, Pencil, Settings2, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { FeatureCard } from "../blocks/grid-feature-cards";

const features = [
  {
    title: "Instant Redirects",
    icon: Zap,
    description: "Your links resolve in milliseconds, anywhere in the world.",
  },
  {
    title: "Powerful Analytics",
    icon: Cpu,
    description: "See clicks, locations, devices, and referrers in real time.",
  },
  {
    title: "Secure Links",
    icon: Fingerprint,
    description: "Protection against spam, abuse, and malicious redirects built in.",
  },
  {
    title: "Branded & Custom URLs",
    icon: Pencil,
    description: "Use your own domain and create links that match your brand.",
  },
  {
    title: "Full Control",
    icon: Settings2,
    description: "Edit, disable, or reroute links anytime from your dashboard.",
  },
  {
    title: "Built to Scale",
    icon: Sparkles,
    description: "From one link to millions—Knot grows with your traffic.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-32 scroll-smooth">
      <div className="mx-auto w-full max-w-5xl space-y-8 px-4">
        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bitcount tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-medium">
            Links, done right.
          </h2>
          <p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base">
            Fast, branded, and built to scale.
          </p>
        </AnimatedContainer>

        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3"
        >
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: React.ComponentProps<typeof motion.div>["className"];
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
