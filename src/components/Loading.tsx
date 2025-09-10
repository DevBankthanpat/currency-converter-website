"use client";

export default function Loading() {
    return (
        <main className="mx-auto max-w-2xl p-4 space-y-4">
            <h1 className="text-2xl font-semibold">Currency Converter</h1>
            <div className="animate-pulse space-y-3">
                <div className="h-10 bg-gray-200 rounded" />
                <div className="h-10 bg-gray-200 rounded" />
                <div className="h-10 bg-gray-200 rounded" />
            </div>
        </main>
    );
}
