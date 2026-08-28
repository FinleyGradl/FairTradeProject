// Coarse (country-level only) IP geolocation for the insights dashboard.
// Prefers headers set by a reverse proxy / CDN in front of the app (no
// external call, no data leaves the server at all). Falls back to a
// best-effort external lookup only if none of those are present — see the
// Datenschutzerklärung, section "Insights & Reichweitenmessung" for the
// resulting disclosure obligation.

const PROXY_COUNTRY_HEADERS = [
  "cf-ipcountry", // Cloudflare
  "x-vercel-ip-country", // Vercel
  "x-country-code", // some other proxies/CDNs
];

export async function resolveCountry(request: {
  headers: { get(name: string): string | null };
}, ip: string | null): Promise<string | null> {
  for (const header of PROXY_COUNTRY_HEADERS) {
    const value = request.headers.get(header);
    if (value && value.length === 2 && value.toUpperCase() !== "XX") {
      return value.toUpperCase();
    }
  }

  if (!ip || process.env.DISABLE_EXTERNAL_GEOIP === "true") return null;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/country/`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const text = (await res.text()).trim();
    return /^[A-Z]{2}$/.test(text) ? text : null;
  } catch {
    return null;
  }
}