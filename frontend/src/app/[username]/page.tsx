"use client";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const profileData = {
  name: "John Doe",
  bio: "Product Designer & Creator. Building cool things on the internet.",
  avatar: "JD",
  username: "john",
};

const links = [
  { id: "1", title: "My Portfolio", url: "https://johndoe.com", featured: true },
  { id: "2", title: "Latest Blog Post", url: "https://blog.johndoe.com/ai-2024" },
  { id: "3", title: "Book a Call", url: "https://cal.com/johndoe" },
  { id: "4", title: "Newsletter", url: "https://newsletter.johndoe.com" },
];

const socialLinks = [
  { icon: FaXTwitter, handle: "@johndoe", url: "https://twitter.com/johndoe" },
  { icon: FaInstagram, handle: "@john.doe", url: "https://instagram.com/john.doe" },
  { icon: FaLinkedin, handle: "johndoe", url: "https://linkedin.com/in/johndoe" },
  { icon: FaGithub, handle: "johndoe", url: "https://github.com/johndoe" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const socialVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
    },
  },
};

export default function BioPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ocean Abyss Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-12 sm:py-16 md:py-20">
        <motion.div
          className="w-full max-w-md mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Section */}
          <motion.div className="flex flex-col items-center mb-8 sm:mb-10" variants={itemVariants}>
            {/* Avatar */}
            <motion.div
              className="relative cursor-pointer mb-5"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center text-3xl sm:text-4xl font-semibold text-primary-foreground shadow-glow">
                {profileData.avatar}
              </div>
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10" />
            </motion.div>

            {/* Name & Bio */}
            <motion.h1
              className="text-xl sm:text-2xl font-semibold text-foreground mb-2 text-center"
              variants={itemVariants}
            >
              {profileData.name}
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base text-muted-foreground text-center max-w-xs leading-relaxed"
              variants={itemVariants}
            >
              {profileData.bio}
            </motion.p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-8 sm:mb-10"
            variants={itemVariants}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-secondary/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent hover:border-border transition-all duration-300"
                variants={socialVariants}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Links */}
          <div className="space-y-3 sm:space-y-4">
            {links.map((link) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block w-full p-2 sm:p-3 rounded-2xl text-center font-medium transition-all duration-300 ${
                  link.featured
                    ? "bg-primary text-black shadow-accent"
                    : "bg-secondary/60 backdrop-blur-sm border border-border/50 text-foreground hover:bg-accent hover:border-border"
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 text-sm sm:text-base">{link.title}</span>

                <motion.span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="h-4 w-4 opacity-60" />
                </motion.span>
              </motion.a>
            ))}
          </div>

          {/* Footer */}
          <motion.div className="mt-12 sm:mt-16 text-center" variants={itemVariants}>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              <span className="font-bitcount text-xl">Powered by</span>
              <span className="text-gradient font-bitcount text-xl">Knot</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
