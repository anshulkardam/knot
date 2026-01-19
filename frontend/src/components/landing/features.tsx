import { BarChart3, Globe, Lock, Zap, Link2, QrCode } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Links redirect in milliseconds. No delays, no waiting.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track clicks, locations, devices, and referrers in real-time.",
  },
  {
    icon: Link2,
    title: "Custom Back-halves",
    description: "Create memorable, branded short links that stand out.",
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Distributed network ensures fast redirects worldwide.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Enterprise-grade security with complete data privacy.",
  },
  {
    icon: QrCode,
    title: "QR Codes",
    description: "Generate QR codes for any link with one click.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Everything you need</h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-pretty">
            Powerful features wrapped in a simple, intuitive interface.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 hover:border-muted-foreground/30"
            >
              <div className="p-3 w-fit rounded-lg bg-secondary mb-4 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
