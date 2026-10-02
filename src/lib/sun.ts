/** Riyadh, for the sun times. */
const LAT = 24.7136;
const LON = 46.6753;
const rad = Math.PI / 180;

/**
 * Today's sunset in Riyadh, from the standard sunrise equation (accurate to a
 * minute or two, which is all a caption needs). No network, no API.
 */
export function riyadhSunset(now = new Date()): Date {
  // Riyadh is UTC+3 all year; 09:00 UTC is noon there, so this is "today" in Riyadh.
  const local = new Date(now.getTime() + 3 * 3600_000);
  const noon = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate(), 9);
  const n = Math.round(noon / 86400_000 + 2440587.5 - 2451545 + 0.0008);
  const j = n - LON / 360;
  const m = (357.5291 + 0.98560028 * j) % 360;
  const c = 1.9148 * Math.sin(m * rad) + 0.02 * Math.sin(2 * m * rad) + 0.0003 * Math.sin(3 * m * rad);
  const l = (m + c + 180 + 102.9372) % 360;
  const transit = 2451545 + j + 0.0053 * Math.sin(m * rad) - 0.0069 * Math.sin(2 * l * rad);
  const dec = Math.asin(Math.sin(l * rad) * Math.sin(23.4397 * rad));
  const w = Math.acos((Math.sin(-0.833 * rad) - Math.sin(LAT * rad) * Math.sin(dec)) / (Math.cos(LAT * rad) * Math.cos(dec))) / rad;
  return new Date((transit + w / 360 - 2440587.5) * 86400_000);
}
