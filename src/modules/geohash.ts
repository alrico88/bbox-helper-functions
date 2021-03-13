import {BBox} from './bbox';
import {decode_bbox} from 'ngeohash';

export function getGeohashBBox(geohash: string): BBox {
  const [minLat, minLon, maxLat, maxLon] = decode_bbox(geohash);

  return [minLon, minLat, maxLon, maxLat];
}
