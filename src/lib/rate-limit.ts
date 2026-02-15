type Hit = {
  count: number;
  resetAt: number;
};

const store = new Map<string, Hit>();

export function isRateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const hit = store.get(key);

  if (!hit || now > hit.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  hit.count += 1;
  store.set(key, hit);
  return hit.count > max;
}
