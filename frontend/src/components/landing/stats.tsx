"use client";

import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 2.5, suffix: "M+", label: "Links shortened" },
  { value: 99.9, suffix: "%", label: "Uptime" },
  { value: 150, suffix: "ms", label: "Avg. redirect time" },
  { value: 50, suffix: "K+", label: "Happy users" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div
      ref={ref}
      className="font-semibold text-3xl sm:text-4xl font-grotesk tracking-tight"
    >
      {count.toFixed(suffix === "%" ? 1 : suffix === "M+" ? 1 : 0)}
      <span className="text-muted-foreground font-grotesk">{suffix}</span>
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-16 px-4 sm:px-6 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="mt-1 text-lg font-grotesk text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
