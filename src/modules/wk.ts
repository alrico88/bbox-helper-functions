import {BBoxToGeoJSONPolygon} from './geojson';
import {checkBBox} from './helpers';
import {convertToWK, parseFromWK, WKType} from 'wkt-parser-helper';
import {BBox} from './bbox';
import turfBBox from '@turf/bbox';

/**
 * Converts a BBox to WK
 *
 * @export
 * @param  {BBox} bbox The BBox to convert to WK
 * @param  {WKType} [type='wkt'] The type of WK
 * @return {(string | Buffer)} The resulting WK
 */
export function BBoxToWK(bbox: BBox, type: WKType = 'wkt'): string | Buffer {
  checkBBox(bbox);

  const geoJSON = BBoxToGeoJSONPolygon(bbox);

  return convertToWK(geoJSON, type);
}

/**
 * Gets the BBox of a WK
 * @export
 * @param  {(string | Buffer)} wk The WK to get BBox of
 * @return {BBox} The WK BBox
 */
export function getWKBBox(wk: string | Buffer): BBox {
  return turfBBox(parseFromWK(wk)) as BBox;
}
