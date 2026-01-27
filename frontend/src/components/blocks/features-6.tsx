import Image from "next/image";

export function HowKnotWorks() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-7xl space-y-12 px-6">
        <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
          <h2 className="text-5xl font-bitcount font-medium">
            Manage all your links in one place.
          </h2>

          <div className="space-y-2 tracking-wide">
            <p className="max-w-lg sm:ml-auto">
              Everything you need to create, track, and manage your short links.
            </p>
            <p className="max-w-lg sm:ml-auto">
              Designed to stay out of your way and let your links do the work.
            </p>{" "}
          </div>
        </div>

        <div className="relative rounded-3xl p-3 md:-mx-8 lg:col-span-3">
          <div className="aspect-[88/36] relative">
            <div className="bg-gradient-to-t z-1 from-background absolute inset-0 to-transparent"></div>
            <Image
              src="/dashboard.png"
              className="rounded-lg"
              alt="payments illustration light"
              width={2797}
              height={1137}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
