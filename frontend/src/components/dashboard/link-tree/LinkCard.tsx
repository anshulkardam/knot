import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GripVertical,
  Pencil,
  Trash2,
  Share2,
  Clock,
  Lock,
  Star,
  BarChart3,
  Check,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface BioLink {
  id: string;
  title: string;
  url: string;
  enabled: boolean;
  clicks?: number;
}

interface LinkCardProps {
  link: BioLink;
  onUpdate: (id: string, updates: Partial<BioLink>) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export function LinkCard({ link, onUpdate, onDelete, onToggle }: LinkCardProps) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingUrl, setEditingUrl] = useState(false);
  const [titleValue, setTitleValue] = useState(link.title);
  const [urlValue, setUrlValue] = useState(link.url);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSaveTitle = () => {
    onUpdate(link.id, { title: titleValue });
    setEditingTitle(false);
  };

  const handleSaveUrl = () => {
    onUpdate(link.id, { url: urlValue });
    setEditingUrl(false);
  };

  const handleCancelTitle = () => {
    setTitleValue(link.title);
    setEditingTitle(false);
  };

  const handleCancelUrl = () => {
    setUrlValue(link.url);
    setEditingUrl(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-card border border-border rounded-xl p-4 transition-all",
        isDragging && "opacity-50 shadow-elevated z-50",
        !link.enabled && "opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="mt-1 p-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
        >
          <GripVertical className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title Row */}
          <div className="flex items-center gap-2 mb-1">
            {editingTitle ? (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  value={titleValue}
                  onChange={(e) => setTitleValue(e.target.value)}
                  className="h-8 bg-secondary border-border text-sm"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveTitle();
                    if (e.key === "Escape") handleCancelTitle();
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-success"
                  onClick={handleSaveTitle}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground"
                  onClick={handleCancelTitle}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <span className="text-sm font-medium text-foreground truncate">
                  {link.title}
                </span>
                <button
                  onClick={() => setEditingTitle(true)}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </>
            )}
          </div>

          {/* URL Row */}
          <div className="flex items-center gap-2 mb-3">
            {editingUrl ? (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                  className="h-8 bg-secondary border-border text-sm"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveUrl();
                    if (e.key === "Escape") handleCancelUrl();
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-success"
                  onClick={handleSaveUrl}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground"
                  onClick={handleCancelUrl}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <span className="text-xs text-muted-foreground truncate">
                  {link.url}
                </span>
                <button
                  onClick={() => setEditingUrl(true)}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Pencil className="h-3 w-3" />
                </button>
              </>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1">
            {[
              { icon: Share2, label: "Share" },
              { icon: Clock, label: "Schedule" },
              { icon: Lock, label: "Lock" },
              { icon: Star, label: "Highlight" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                title={label}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
            <div className="flex items-center gap-1 ml-2 text-xs text-muted-foreground">
              <BarChart3 className="h-3.5 w-3.5" />
              <span>{link.clicks || 0} clicks</span>
            </div>
          </div>
        </div>

        {/* Right Side: Toggle & Delete */}
        <div className="flex items-center gap-2">
          {/* Toggle Switch */}
          <button
            onClick={() => onToggle(link.id)}
            className={cn(
              "relative w-12 h-6 rounded-full transition-colors",
              link.enabled ? "bg-success" : "bg-muted"
            )}
          >
            <div
              className={cn(
                "absolute top-1 w-4 h-4 rounded-full bg-card shadow-sm transition-transform",
                link.enabled ? "translate-x-7" : "translate-x-1"
              )}
            />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(link.id)}
            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
