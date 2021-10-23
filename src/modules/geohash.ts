import {
  decode_bbox, decode, neighbors, encode,
} from 'ngeohash';
import { getGeohashesBetweenTwoGeohashes } from 'geohashes-between';
import uniq from 'lodash/uniq';
import { isBetween } from './helpers';
import { BBox } from './bbox';

/**
 * Gets the BBox of a given geohash
 *
 * @export
 * @param {string} geohash Geohash to find BBox of
 * @return {BBox}  The BBox of the geohash
 */
export function getGeohashBBox(geohash: string): BBox {
  const [minLat, minLon, maxLat, maxLon] = decode_bbox(geohash);

  return [minLon, minLat, maxLon, maxLat];
}

/**
 * Gets all the geohashes inside a BBox
 *
 * @export
 * @param {BBox} bbox The BBox
 * @param {number} precision Precision for the geohashes
 * @return {string} Array of geohash strings
 */
export function getGeohashesInBBox(bbox: BBox, precision: number): string[] {
  const [minLon, minLat, maxLon, maxLat] = bbox;

  function isGeohashInsideBBox(geohash: string): boolean {
    const { latitude, longitude } = decode(geohash);

    return isBetween(latitude, minLat, maxLat) && isBetween(longitude, minLon, maxLon);
  }

  const sw = encode(minLat, minLon, precision);
  const se = encode(minLat, maxLon, precision);
  const nw = encode(maxLat, minLon, precision);
  const ne = encode(maxLat, maxLon, precision);

  const topRing = getGeohashesBetweenTwoGeohashes(nw, ne);
  const rightRing = getGeohashesBetweenTwoGeohashes(ne, se);
  const bottomRing = getGeohashesBetweenTwoGeohashes(sw, se);
  const leftRing = getGeohashesBetweenTwoGeohashes(nw, sw);

  const inside: string[] = [sw, se, nw, ne, ...topRing, ...rightRing, ...bottomRing, ...leftRing];
  const firstBatch = uniq(inside.flatMap((d) => neighbors(d)));
  const toCheck: Set<string> = new Set();
  const checked: Set<string> = new Set();

  inside.forEach((geohash) => {
    checked.add(geohash);
  });

  firstBatch.forEach((neighbor) => {
    toCheck.add(neighbor);
  });

  while (toCheck.size > 0) {
    const [ghash] = Array.from(toCheck);

    if (isGeohashInsideBBox(ghash)) {
      inside.push(ghash);
      const neighborsToCheck = neighbors(ghash).filter((d) => !checked.has(d));
      neighborsToCheck.forEach((neighbor) => {
        toCheck.add(neighbor);
      });
    }

    toCheck.delete(ghash);
    checked.add(ghash);
  }

  return uniq(inside);
}
