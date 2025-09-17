import { convertToWK, parseFromWK } from 'wkt-parser-helper';
import turfBBox from '@turf/bbox';
import { BBoxToGeoJSONPolygon } from './geojson';
import { checkBBox } from './helpers';
import type { BBox } from './bbox';

/**
 * Converts a BBox to WKT
 *
 * @export
 * @param  {BBox} bbox The BBox to convert to WKT
 * @return {string} The resulting WKT
 */
export function BBoxToWKT(bbox: BBox): string {
  checkBBox(bbox);

  const geoJSON = BBoxToGeoJSONPolygon(bbox);

  return convertToWK(geoJSON);
}

/**
 * Gets the BBox of a WKT
 * @export
 * @param  {string} wkt The WKT to get BBox of
 * @return {BBox} The WKT BBox
 */
export function getWKTBBox(wkt: string): BBox {
  return turfBBox(parseFromWK(wkt)) as BBox;
}
