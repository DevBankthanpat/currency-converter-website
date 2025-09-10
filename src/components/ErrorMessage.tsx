interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <main className="mx-auto max-w-2xl p-4 space-y-4">
            <h1 className="text-2xl font-semibold">Currency Converter</h1>
            <p className="text-red-600">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-3 py-2 rounded bg-black text-white"
                >
                    Retry
                </button>
            )}
        </main>
    )
}