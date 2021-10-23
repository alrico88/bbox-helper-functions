import {
  Feature, GeoJsonProperties, Polygon, GeoJSON,
} from 'geojson';
import turfBBox from '@turf/bbox';
import { BBox } from './bbox';
import { BBoxToCorners, checkBBox, latLonToLonLat } from './helpers';

export function BBoxToGeoJSONPolygon(bbox: BBox): Polygon {
  checkBBox(bbox);

  const {
    sw, se, nw, ne,
  } = BBoxToCorners(bbox);

  return {
    type: 'Polygon',
    coordinates: [[sw, nw, ne, se, sw].map((d) => latLonToLonLat(d))],
  };
}

export function BBoxToGeoJSONFeature(bbox: BBox, properties: GeoJsonProperties = {}): Feature<Polygon> {
  return {
    type: 'Feature',
    geometry: BBoxToGeoJSONPolygon(bbox),
    properties,
  };
}

export function getGeoJSONBBox(geojson: GeoJSON): BBox {
  return turfBBox(geojson) as BBox;
}
