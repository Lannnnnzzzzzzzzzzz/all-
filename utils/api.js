// Wrapper for calling our proxy. Keeps fetch logic centralized.
export async function fetchProxy(path, options = {}) {
  const safePath = encodeURI(path);
  const url = `/api/proxy/${safePath}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Proxy error: ${res.status} ${text}`);
  }
  return res.json();
}
