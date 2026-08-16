const EARTH_RADIUS_M = 6371000;

export function haversineDistanceM(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_M * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

export function filterByRadius<T extends { latitude: number; longitude: number }>(
  items: T[],
  lat: number,
  lng: number,
  radiusKm: number
): (T & { distanceM: number })[] {
  const radiusM = radiusKm * 1000;
  return items
    .map((item) => ({
      ...item,
      distanceM: haversineDistanceM(lat, lng, item.latitude, item.longitude),
    }))
    .filter((item) => item.distanceM <= radiusM)
    .sort((a, b) => a.distanceM - b.distanceM);
}

/**
 * Fallback map center used before we know the visitor's real location
 * (denied/unsupported geolocation). This is a directory of stores across
 * all of Germany, so it defaults to the country's rough geographic center
 * (near Niederdorla, Thuringia) rather than any one city.
 */
export const DEFAULT_CENTER = { lat: 51.1657, lng: 10.4515 };