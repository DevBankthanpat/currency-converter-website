"use client";

export default function Loading() {
  return (
    <main className="mx-auto max-w-2xl p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Currency Converter</h1>

      {/* Skeleton Panel */}
      <div className="rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-5 md:p-6 shadow-xl animate-pulse space-y-6">
        {/* From */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-12 bg-gray-700 rounded" />
          <div className="h-8 w-32 bg-gray-700 rounded" />
        </div>
        <div className="h-12 sm:h-16 bg-gray-700 rounded" />

        {/* Divider + swap button */}
        <div className="relative my-6">
          <div className="h-px bg-gray-700" />
          <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-8 h-8 bg-gray-700 rounded-full" />
        </div>

        {/* To */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-12 bg-gray-700 rounded" />
          <div className="h-8 w-32 bg-gray-700 rounded" />
        </div>
        <div className="h-12 sm:h-16 bg-gray-700 rounded" />
      </div>

      <p className="text-xs text-gray-500">Rates are updated daily (not live).</p>

      {/* Exchange Rates Skeleton */}
      <section className="space-y-3">
        <div className="h-5 w-32 bg-gray-700 rounded" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-700 rounded" />
          ))}
        </div>
      </section>
    </main>
  );
}
