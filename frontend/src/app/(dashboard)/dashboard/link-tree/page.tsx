"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Eye, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { BioLink } from "@/components/dashboard/link-tree/LinkCard";
import { SortableLinkList } from "@/components/dashboard/link-tree/SortLinkList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Youtube,
  Facebook,
  Globe,
  MessageCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCreateTree } from "@/hooks/links/useCreateTree";
import { z } from "zod";
import { toast } from "sonner";
import { useGetTree } from "@/hooks/links/useGetTree";
import { useUpdateTree } from "@/hooks/links/useUpdateTree";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export const linkTreeItemSchema = z.object({
  title: z.string().min(1, "Title required"),
  url: z.string().url("Invalid URL"),
  category: z.enum(["social", "link"]),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().optional(),
});

export const createLinkTreeSchema = z.object({
  username: z
    .string()
    .min(3)
    .regex(/^[a-z0-9_-]+$/, "Only lowercase, numbers, - and _"),
  title: z.string().min(1),
  bio: z.string().max(160).optional(),
  items: z.array(linkTreeItemSchema),
});

export type CreateLinkTreeInput = z.infer<typeof createLinkTreeSchema>;

export const SOCIAL_OPTIONS = [
  { id: "twitter", label: "Twitter", icon: Twitter },
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
  { id: "github", label: "GitHub", icon: Github },
  { id: "youtube", label: "YouTube", icon: Youtube },
  { id: "facebook", label: "Facebook", icon: Facebook },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "website", label: "Website", icon: Globe },
  { id: "custom", label: "Custom", icon: Globe },
] as const;

type SocialLink = {
  id: string;
  type: (typeof SOCIAL_OPTIONS)[number]["id"];
  handle: string;
  enabled: boolean;
};

const MAX_SOCIALS = 5;

export default function LinkInBio() {
  const [links, setLinks] = useState<BioLink[]>([]);
  const [bioName, setBioName] = useState("");
  const [bioText, setBioText] = useState("");
  const { data: tree, isLoading } = useGetTree();
  const createTree = useCreateTree();
  const updateTree = useUpdateTree(tree?._id ?? "");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    if (!tree) return;

    setBioName(tree.title.replace(" | Links", ""));
    setBioText(tree.bio ?? "");

    const socials = tree.items
      .filter((i) => i.category === "social")
      .map((i) => ({
        id: crypto.randomUUID(),
        type:
          SOCIAL_OPTIONS.find((o) => o.label.toLowerCase() === i.title.toLowerCase())?.id ??
          "custom",
        handle: i.url,
        enabled: i.isActive,
      }));

    const links = tree.items
      .filter((i) => i.category === "link")
      .map((i) => ({
        id: crypto.randomUUID(),
        title: i.title,
        url: i.url,
        enabled: i.isActive,
        clicks: 0,
      }));

    setSocialLinks(socials);
    setLinks(links);
  }, [tree]);

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

  const handleToggleSocial = (id: string) => {
    setSocialLinks((prev) =>
      prev.map((social) => (social.id === id ? { ...social, enabled: !social.enabled } : social)),
    );
  };

  const socialItems = socialLinks
    .filter((s) => s.handle.trim())
    .map((s, index) => ({
      title: SOCIAL_OPTIONS.find((o) => o.id === s.type)?.label ?? "Social",
      url: s.handle.startsWith("http") ? s.handle : `https://${s.handle.replace(/^@/, "")}`,
      category: "social" as const,
      order: index,
      isActive: s.enabled,
    }));

  const linkItems = links.map((l, index) => ({
    title: l.title,
    url: l.url,
    category: "link" as const,
    order: socialItems.length + index,
    isActive: l.enabled,
  }));

  const queryClient = useQueryClient();

  const handleSave = () => {
    const payload = {
      username: bioName.toLowerCase().replace(/\s+/g, ""),
      title: `${bioName} | Links`,
      bio: bioText,
      items: [...socialItems, ...linkItems],
    };

    const parsed = createLinkTreeSchema.safeParse(payload);

    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    if (!tree) {
      // CREATE
      createTree.mutate(parsed.data, {
        onSuccess: () => {
          toast.success("Link tree created");
          queryClient.invalidateQueries({ queryKey: ["link-tree", "me"] });
        },
      });
    } else {
      // UPDATE
      updateTree.mutate(parsed.data, {
        onSuccess: () => {
          toast.success("Changes saved");
          queryClient.invalidateQueries({ queryKey: ["link-tree", "me"] });
        },
      });
    }
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
          {/* <Button variant="outline">
            <Eye className="h-4 w-4" />
            Preview
          </Button> */}
          <Button asChild variant="outline">
            <Link href={`/${tree?.username}`} target="__blank">
              <ExternalLink className="h-4 w-4" />
              View Live
            </Link>
          </Button>
          <Button onClick={handleSave} disabled={createTree.isPending || updateTree.isPending}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Editor Column */}
        <div className="space-y-6 col-span-3">
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
              {socialLinks.map((social) => {
                const selected =
                  SOCIAL_OPTIONS.find((s) => s.id === social.type) ?? SOCIAL_OPTIONS.at(-1)!;

                const Icon = selected.icon;

                return (
                  <div key={social.id} className="flex items-center gap-3 rounded-lg border p-3">
                    {/* Icon */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>

                    {/* Social Select */}
                    <Select
                      value={social.type}
                      onValueChange={(value) =>
                        updateSocial(social.id, {
                          type: value as SocialLink["type"],
                        })
                      }
                    >
                      <SelectTrigger className="h-9 w-35">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SOCIAL_OPTIONS.map((opt) => (
                          <SelectItem key={opt.id} value={opt.id}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Handle / URL */}
                    <Input
                      className="flex-1"
                      placeholder={social.type === "custom" ? "Enter URL" : "Username or URL"}
                      value={social.handle}
                      onChange={(e) => updateSocial(social.id, { handle: e.target.value })}
                    />

                    {/* Toggle */}
                    <Switch
                      checked={social.enabled}
                      onCheckedChange={() => handleToggleSocial(social.id)}
                    />

                    {/* Remove */}
                    <Button variant="ghost" size="icon" onClick={() => removeSocial(social.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}

              <Button
                variant="outline"
                disabled={socialLinks.length >= MAX_SOCIALS}
                onClick={() => addSocial("instagram")}
              >
                <Plus className="mr-2 h-4 w-4" />
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
        <Card className="sticky top-6 col-span-2 bg-transparent border-none">
          <CardHeader className="items-center flex flex-col justify-center">
            <CardTitle>Live preview</CardTitle>
            <CardDescription>How your page looks publicly</CardDescription>
          </CardHeader>

          <CardContent className="">
            <div className="mx-auto max-w-90 min-h-165 rounded-[50px]  border-12 bg-background p-6">
              <div className="mx-auto items-center flex justify-center -mt-4 mb-6">
                <div className="w-20 h-4 rounded-full bg-muted"></div>
              </div>
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
