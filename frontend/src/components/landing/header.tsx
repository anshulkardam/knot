"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/authContext";
import { ChevronRight } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 scroll-smooth">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src={"/logo.png"} alt="logo" height={42} width={42} className="object-cover" />
            <span className="font-semibold text-2xl font-bitcount mt-0.5 tracking-tight">Knot</span>
          </Link>

          {/* <nav className="hidden md:flex items-center font-grotesk gap-12">
            <Link
              href="#features"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#docs"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>
          </nav> */}

          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button
                variant="secondary"
                size="default"
                className="text-muted-foreground flex items-center gap-2 text-base hover:text-foreground"
              >
                Dashboard <ChevronRight />
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground text-base hover:text-foreground"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="hidden sm:inline-flex">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
