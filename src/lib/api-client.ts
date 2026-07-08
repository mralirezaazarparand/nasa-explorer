const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;
const BASE_URL = "https://api.nasa.gov";
const DEFAULT_TTL = 30 * 60 * 1000;
const MAX_RETRIES = 3;
const TIMEOUT_MS = 15000;

let memoryCache: Record<string, { data: unknown; expiry: number }> = {};

function getFromCache<T>(key: string): T | null {
  const cached = memoryCache[key];
  if (cached && Date.now() < cached.expiry) return cached.data as T;
  delete memoryCache[key];
  return null;
}

function setCache<T>(key: string, data: T, ttl: number = DEFAULT_TTL): void {
  memoryCache[key] = { data, expiry: Date.now() + ttl };
  const keys = Object.keys(memoryCache);
  if (keys.length > 200) {
    for (let i = 0; i < 50; i++) delete memoryCache[keys[i]];
  }
}

async function fetchWithTimeout(url: string, timeoutMs: number = TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, next: { revalidate: 3600 } });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchWithRetry(url: string, attempt: number = 0): Promise<Response> {
  try {
    return await fetchWithTimeout(url);
  } catch (err) {
    if (attempt >= MAX_RETRIES - 1) throw err;
    const delay = Math.min(1000 * 2 ** attempt + Math.random() * 500, 10000);
    await new Promise((r) => setTimeout(r, delay));
    return fetchWithRetry(url, attempt + 1);
  }
}

export async function apiGet<T>(
  endpoint: string,
  options?: { ttl?: number; skipCache?: boolean; skipRetry?: boolean }
): Promise<T> {
  const cacheKey = endpoint;
  if (!options?.skipCache) {
    const cached = getFromCache<T>(cacheKey);
    if (cached) return cached;
  }

  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`;

  let res: Response;
  try {
    res = options?.skipRetry ? await fetchWithTimeout(url) : await fetchWithRetry(url);
  } catch {
    const cached = getFromCache<T>(cacheKey);
    if (cached) return cached;
    throw new Error("NASA API request failed");
  }

  if (!res.ok) {
    const cached = getFromCache<T>(cacheKey);
    if (cached) return cached;
    throw new Error(`NASA API error: ${res.status}`);
  }

  const data: T = await res.json();
  setCache(cacheKey, data, options?.ttl);
  return data;
}

export async function apiGetImageLibrary<T>(query: string, page: number = 1): Promise<T> {
  const cacheKey = `img_lib_${query}_${page}`;
  const cached = getFromCache<T>(cacheKey);
  if (cached) return cached;

  const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image&page=${page}`;
  let res: Response;
  try {
    res = await fetchWithRetry(url);
  } catch {
    throw new Error("NASA Image Library unavailable");
  }

  if (!res.ok) throw new Error(`NASA Image Library error: ${res.status}`);

  const data: T = await res.json();
  setCache(cacheKey, data, 60 * 60 * 1000);
  return data;
}


