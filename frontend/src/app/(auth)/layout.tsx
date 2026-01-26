import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Brand / Visual */}
      <div className="relative hidden lg:flex flex-col bg-black px-16 py-12">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-black via-black to-emerald-900/70" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <Link
            href={"/"}
            className="font-bitcount text-4xl font-semibold tracking-tight text-slate-50"
          >
            Knot
          </Link>

          {/* Centered text */}
          <div className="flex flex-1 justify-center items-center">
            <div className="max-w-md font-bitcount">
              <h2 className="text-6xl font-medium tracking-tight text-slate-50 leading-tight">
                Short links.
                <br />
                QR codes.
                <br />
                Link-in-bio.
              </h2>
              <p className="mt-4 font-grotesk text-lg text-slate-400">
                Everything tied into one Knot.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-background">{children}</div>
    </div>
  );
}
