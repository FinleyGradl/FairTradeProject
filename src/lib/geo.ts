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

/** Berlin city center default */
export const DEFAULT_CENTER = { lat: 52.52, lng: 13.405 };

export const BERLIN_BOUNDS = {
  minLat: 52.33,
  maxLat: 52.68,
  minLng: 13.09,
  maxLng: 13.76,
};
