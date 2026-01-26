"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Eye, Plus, Instagram, Twitter, Linkedin, Github, Image } from "lucide-react";
import { useState } from "react";
import { BioLink } from "@/components/dashboard/link-tree/LinkCard";
import { SortableLinkList } from "@/components/dashboard/link-tree/SortLinkList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const initialLinks: BioLink[] = [
  { id: "1", title: "My Portfolio", url: "https://johndoe.com", enabled: true, clicks: 342 },
  {
    id: "2",
    title: "Latest Blog Post",
    url: "https://blog.johndoe.com/ai-2024",
    enabled: true,
    clicks: 128,
  },
  { id: "3", title: "Book a Call", url: "https://cal.com/johndoe", enabled: true, clicks: 89 },
  {
    id: "4",
    title: "Newsletter",
    url: "https://newsletter.johndoe.com",
    enabled: false,
    clicks: 0,
  },
];

type SocialLink = {
  id: string;
  type: "twitter" | "instagram" | "linkedin" | "github";
  handle: string;
  enabled: boolean;
};

const MAX_SOCIALS = 5;

const initialSocials: SocialLink[] = [
  { id: "1", type: "twitter", handle: "@johndoe", enabled: true },
  { id: "2", type: "instagram", handle: "@john.doe", enabled: true },
];

export default function LinkInBio() {
  const [links, setLinks] = useState<BioLink[]>(initialLinks);
  const [bioName, setBioName] = useState("John Doe");
  const [bioText, setBioText] = useState(
    "Product Designer & Creator. Building cool things on the internet.",
  );

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocials);

  const handleReorder = (newLinks: BioLink[]) => {
    setLinks(newLinks);
  };

  const handleUpdate = (id: string, updates: Partial<BioLink>) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, ...updates } : link)));
  };

  const handleDelete = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleToggle = (id: string) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, enabled: !link.enabled } : link)));
  };

  const handleAddLink = () => {
    const newLink: BioLink = {
      id: Date.now().toString(),
      title: "New Link",
      url: "https://example.com",
      enabled: true,
      clicks: 0,
    };
    setLinks([newLink, ...links]);
  };

  const addSocial = (type: SocialLink["type"]) => {
    if (socialLinks.length >= MAX_SOCIALS) return;

    setSocialLinks([
      ...socialLinks,
      {
        id: crypto.randomUUID(),
        type,
        handle: "",
        enabled: true,
      },
    ]);
  };

  const updateSocial = (id: string, updates: Partial<SocialLink>) => {
    setSocialLinks((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const removeSocial = (id: string) => {
    setSocialLinks((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleSocial = (id: string) => {
    setSocialLinks((prev) => prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bitcount text-foreground mb-1">Link Tree</h1>
          <p className="text-muted-foreground">Customize all your links. One destination.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button>
            <ExternalLink className="h-4 w-4" />
            View Live
          </Button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Column */}
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="glass rounded-xl p-6">
            <h3 className="font-medium text-foreground text-xl mb-4 flex items-center gap-2">
              Profile
            </h3>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-primary/80 to-primary flex items-center justify-center text-2xl font-semibold text-primary-foreground shrink-0">
                JD
              </div>
              <div className="flex-1 space-y-3">
                <Input
                  value={bioName}
                  onChange={(e) => setBioName(e.target.value)}
                  placeholder="Display name"
                  className="bg-secondary border-border"
                />
                <Input
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  placeholder="Bio text"
                  className="bg-secondary border-border"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social links</CardTitle>
              <CardDescription>Shown on your bio page (max 5)</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {socialLinks.map((social) => (
                <div key={social.id} className="flex items-center gap-3 rounded-lg border p-3">
                  <Input
                    placeholder="Handle or URL"
                    value={social.handle}
                    onChange={(e) => updateSocial(social.id, { handle: e.target.value })}
                  />

                  <Button variant="ghost" size="icon" onClick={() => toggleSocial(social.id)}>
                    {social.enabled ? "On" : "Off"}
                  </Button>

                  <Button variant="ghost" size="icon" onClick={() => removeSocial(social.id)}>
                    ✕
                  </Button>
                </div>
              ))}

              <Button
                variant="outline"
                disabled={socialLinks.length >= MAX_SOCIALS}
                onClick={() => addSocial("twitter")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add social link
              </Button>
            </CardContent>
          </Card>

          {/* Add Link Button */}
          <Button onClick={handleAddLink} className="w-full h-12 text-base" size="lg">
            <Plus className="h-5 w-5" />
            Add link
          </Button>

          {/* Links Section */}
          <SortableLinkList
            links={links}
            onReorder={handleReorder}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        </div>

        {/* Preview Column */}
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle>Live preview</CardTitle>
            <CardDescription>How your page looks publicly</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mx-auto max-w-90 rounded-xl border bg-background p-6">
              {/* Profile */}
              <div className="text-center mb-6">
                <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-muted text-xl font-semibold">
                  {bioName.slice(0, 2).toUpperCase()}
                </div>
                <h2 className="font-semibold">{bioName}</h2>
                <p className="text-sm text-muted-foreground mt-1">{bioText}</p>
              </div>

              {/* Social icons */}
              <div className="flex justify-center gap-3 mb-6">
                {socialLinks
                  .filter((s) => s.enabled && s.handle)
                  .map((s) => (
                    <div
                      key={s.id}
                      className="h-9 w-9 rounded-full bg-muted flex items-center justify-center"
                    >
                      {/* map icon by type */}
                    </div>
                  ))}
              </div>

              {/* Links */}
              <div className="space-y-3">
                {links
                  .filter((l) => l.enabled)
                  .map((link) => (
                    <button
                      key={link.id}
                      className="w-full rounded-lg border bg-muted px-4 py-3 text-sm font-medium hover:bg-accent"
                    >
                      {link.title}
                    </button>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
