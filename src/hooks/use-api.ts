type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

async function customFetch<T>(path: string, method: HttpMethod, data?: unknown, options?: RequestInit): Promise<T> {
    try {
        const response = await fetch(path, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(options?.headers || {}),
            },
            body: data ? JSON.stringify(data) : undefined,
            ...options,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return (await response.json()) as T;
    } catch (error) {
        throw error;
    }
}

// Shorthand helpers
export const api = {
    get: <T>(path: string, options?: RequestInit) => customFetch<T>(path, 'GET', options),
    post: <T>(path: string, data?: unknown, options?: RequestInit) => customFetch<T>(path, 'POST', data, options),
    patch: <T>(path: string, data?: unknown, options?: RequestInit) => customFetch<T>(path, 'PATCH', data, options),
    delete: <T>(path: string, data?: unknown, options?: RequestInit) => customFetch<T>(path, 'DELETE', data, options),
};
