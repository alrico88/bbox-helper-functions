import { decode_bbox, bboxes, decode } from 'ngeohash';
import type { BBox } from './bbox';
import { isBetween } from './helpers';

/**
 * Gets the BBox of a given geohash
 *
 * @param {string} geohash Geohash to find BBox of
 * @return {BBox}  The BBox of the geohash
 */
export function getGeohashBBox(geohash: string): BBox {
  const [minLat, minLon, maxLat, maxLon] = decode_bbox(geohash);

  return [minLon, minLat, maxLon, maxLat];
}

function isGeohashCentroidInBBox(geohash: string, bbox: BBox): boolean {
  const { latitude, longitude } = decode(geohash);

  const [minLon, minLat, maxLon, maxLat] = bbox;

  return (
    isBetween(latitude, minLat, maxLat) && isBetween(longitude, minLon, maxLon)
  );
}

/**
 * Gets all the geohashes inside a BBox
 *
 * @param {BBox} bbox The BBox
 * @param {number} precision Precision for the geohashes
 * @param {boolean} [strict=false] Only return geohashes whose centroids are inside BBox
 * @return {string} Array of geohash strings
 */
export function getGeohashesInBBox(
  bbox: BBox,
  precision: number,
  strict = false,
): string[] {
  const [minLon, minLat, maxLon, maxLat] = bbox;

  const inside = bboxes(minLat, minLon, maxLat, maxLon, precision);

  if (strict) {
    return inside.filter((hash) => isGeohashCentroidInBBox(hash, bbox));
  }
  return inside;
}
