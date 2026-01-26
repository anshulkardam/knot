import Link from "next/link";
import Image from "next/image";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaHandPeace } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Knot logo"
                height={40}
                width={40}
                className="object-cover"
              />
              <span className="font-bitcount text-3xl font-semibold tracking-tight">Knot</span>
            </Link>

            <p className="text-sm text-muted-foreground max-w-xs">
              Modern link shortening for the modern web. Clean, fast, and built for people who ship.
            </p>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide">Product</h4>
            <FooterLink href="#">Features</FooterLink>
            <FooterLink href="#">Changelog</FooterLink>
            <FooterLink href="#">Status</FooterLink>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide">Resources</h4>
            <FooterLink href="#">Docs</FooterLink>
            <FooterLink href="#">API</FooterLink>
            <FooterLink href="#">Support</FooterLink>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide">Connect</h4>

            <p className="text-sm text-muted-foreground">
              Built by <span className="text-foreground font-medium">Anshul Kardam</span>
            </p>
            <div className="flex items-center gap-4">
              <SocialLink link="https://x.com/anshulkardam_" label="Twitter">
                <FaSquareXTwitter size={22} />
              </SocialLink>
              <SocialLink link="https://github.com/anshulkardam" label="Github">
                <FaGithub size={22} />
              </SocialLink>
              <SocialLink link="https://anshulkardam.com/" label="Portfolio">
                <FaHandPeace size={22} />
              </SocialLink>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Knot. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm">
            <FooterLink href="#">Privacy</FooterLink>
            <FooterLink href="#">Terms</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------- */
/* Small helpers to keep things clean */
/* ---------------------------------- */

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  );
}

function SocialLink({
  children,
  label,
  link,
}: {
  children: React.ReactNode;
  label: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      target="__blank"
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      <span className="sr-only">{label}</span>
      {children}
    </Link>
  );
}
