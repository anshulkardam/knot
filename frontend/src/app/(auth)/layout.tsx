export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Brand / Visual */}
      <div className="relative hidden lg:flex flex-col justify-between bg-black px-16 py-12">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-50">
            Knot
          </h1>
        </div>

        <div className="max-w-md">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-50 leading-tight">
            Short links.
            <br />
            QR codes.
            <br />
            Link-in-bio.
          </h2>
          <p className="mt-4 text-sm text-slate-400">
            Everything tied into one Knot.
          </p>
        </div>

        {/* subtle gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-black via-black to-emerald-900/30 pointer-events-none" />
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-background">
        {children}
      </div>
    </div>
  );
}
