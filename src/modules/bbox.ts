export type BBox = [number, number, number, number];

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

/**
 * Checks if a BBox is completely contained in another BBox
 *
 * @param {BBox} bboxToCheck The BBox to check if it's inside
 * @param {BBox} bboxContainer The BBox container
 * @return {boolean} Whether the BBox is inside the other BBox
 */
export function isBBoxInsideBBox(
  bboxToCheck: BBox,
  bboxContainer: BBox,
): boolean {
  const [containerMinLon, containerMinLat, containerMaxLon, containerMaxLat] =
    bboxContainer;
  const [toCheckMinLon, toCheckMinLat, toCheckMaxLon, toCheckMaxLat] =
    bboxToCheck;

  return (
    containerMinLon <= toCheckMinLon &&
    containerMinLat <= toCheckMinLat &&
    containerMaxLon >= toCheckMaxLon &&
    containerMaxLat >= toCheckMaxLat
  );
}

/**
 * Checks if a point is inside a BBox
 *
 * @param {GeoPoint} point The point to check
 * @param {BBox} bbox The BBox to check
 * @return {boolean} Whether the point is inside the BBox
 */
export function isPointInsideBBox(point: GeoPoint, bbox: BBox): boolean {
  const { latitude, longitude } = point;
  const [minLon, minLat, maxLon, maxLat] = bbox;
  const isLatitudeOK = latitude >= minLat && latitude <= maxLat;
  const isLongitudeOK = longitude >= minLon && longitude <= maxLon;

  return isLatitudeOK && isLongitudeOK;
}

/**
 * Checks if a BBox intersects another
 *
 * @param {BBox} a A BBox
 * @param {BBox} b Another BBox
 * @return {boolean}
 */
export function doBBoxesIntersect(a: BBox, b: BBox) {
  const [aMinLon, aMinLat, aMaxLon, aMaxLat] = a;
  const [bMinLon, bMinLat, bMaxLon, bMaxLat] = b;

  return (
    aMinLon <= bMaxLon &&
    aMaxLon >= bMinLon &&
    aMinLat <= bMaxLat &&
    aMaxLat >= bMinLat
  );
}
