export type HttpError = {
    status: number;
    message: string;
    url?: string;
}

export async function fetchJson<T>(
    url: string,
    init?: RequestInit,
    timeout = 12_000,
): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
        const res = await fetch(url, { ...init, signal: controller.signal });
        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw <HttpError>{
                status: res.status,
                message: text || res.statusText,
                url: res.url,
            };
        }
        return await res.json() as T;        
    } catch (err: unknown) {
        if (typeof err === 'object' && err && 'name' in err && (err as { name?: string }).name === 'AbortError') {
            throw <HttpError>{
                status: 0,
                message: 'Request timeout',
                url,
            };
        }
        if (err && typeof err === 'object' && 'status' in err) throw err as HttpError;
        throw <HttpError>{
            status: 0,
            message: 'Network error',
            url,
        }
    } finally {
        clearTimeout(timer);
    }
}