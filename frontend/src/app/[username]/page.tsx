import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type PageProps = {
  params: { username: string };
};

const SOCIAL_ICON_MAP: Record<string, any> = {
  twitter: FaXTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  github: FaGithub,
};

async function getPublicTree(username: string) {
  console.log(username);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tree/public/${username}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function BioPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  const tree = await getPublicTree(username);

  if (!tree) notFound();

  const socials = tree.items
    .filter((i: any) => i.category === "social" && i.isActive)
    .map((i: any) => ({
      title: i.title,
      url: i.url,
      icon: SOCIAL_ICON_MAP[i.title.toLowerCase()] ?? null,
    }));

  const links = tree.items
    .filter((i: any) => i.category === "link" && i.isActive)
    .sort((a: any, b: any) => a.order - b.order);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000",
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-16">
        <div className="w-full max-w-md mx-auto">
          {/* Profile */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-3xl font-semibold text-black mb-4">
              {tree.title.slice(0, 2).toUpperCase()}
            </div>

            <h1 className="text-2xl font-semibold mb-2 text-center">
              {tree.title.replace(" | Links", "")}
            </h1>

            {tree.bio && <p className="text-sm text-muted-foreground text-center">{tree.bio}</p>}
          </div>

          {/* Social icons */}
          {socials.length > 0 && (
            <div className="flex justify-center gap-3 mb-10">
              {socials.map((s: any, idx: number) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition"
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </a>
                );
              })}
            </div>
          )}

          {/* Links */}
          <div className="space-y-4">
            {links.map((link: any) => (
              <a
                key={link.order}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full rounded-2xl bg-secondary/70 border border-border px-4 py-3 text-center font-medium hover:bg-accent transition"
              >
                {link.title}
                <ExternalLink className="inline ml-2 h-4 w-4 opacity-50 group-hover:opacity-100" />
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-14 text-center text-xl font-bitcount text-muted-foreground">
            Powered by <span className="font-bitcount">Knot</span>
          </div>
        </div>
      </div>
    </div>
  );
}
