/* eslint-disable @typescript-eslint/no-magic-numbers */
import {BBoxToCorners, BBoxToWK, BBoxToGeoJSONPolygon, BBoxToGeoJSONFeature, getGeoJSONBBox, getWKBBox, getBBoxSQLSentence, getGeohashBBox, BBox, getDatasetBBox, isBBoxInsideBBox, isPointInsideBBox, getGeohashesInBBox} from '../src';
import {convertToWK} from 'wkt-parser-helper';
import {geohashToPolygonFeature} from 'geohash-to-geojson';
import turfBbox from '@turf/bbox';
import {Feature, Polygon} from 'geojson';

const testBBox: BBox = [-3.708011, 40.418038, -3.687877, 40.428754];

const [minLon, minLat, maxLon, maxLat] = testBBox;

const asPolygon: Polygon = {
  type: 'Polygon',
  coordinates: [
    [
      [minLon, minLat],
      [minLon, maxLat],
      [maxLon, maxLat],
      [maxLon, minLat],
      [minLon, minLat],
    ],
  ],
};

const asFeature: Feature = {
  type: 'Feature',
  geometry: asPolygon,
  properties: {
    test: 'testValue',
  },
};

interface DatasetItem {
  latitude: number;
  longitude: number;
}

const dataset: DatasetItem[] = [
  {
    latitude: -3,
    longitude: 3,
  },
  {
    latitude: -5,
    longitude: 3,
  },
  {
    latitude: 1,
    longitude: 2,
  },
  {
    latitude: 2,
    longitude: 19,
  },
];

describe('Testing BBoxHelper methods', () => {
  test('Corners should be an object with sw, nw, ne, se properties', () => {
    const asCorners = BBoxToCorners(testBBox);

    expect(asCorners).toStrictEqual({
      sw: [minLat, minLon],
      nw: [maxLat, minLon],
      ne: [maxLat, maxLon],
      se: [minLat, maxLon],
    });
  });

  test('Converting BBox to WKT should return the same representation as a polygon with 5 coordinates, sw, nw, ne, se, and sw again', () => {
    const asCorners = BBoxToWK(testBBox, 'wkt');

    expect(asCorners).toStrictEqual(convertToWK(asPolygon));
  });

  test('Converting BBox to GeoJSON polygon should return a polygon with 5 coordinates, sw, nw, ne, se, and sw again', () => {
    const polygon = BBoxToGeoJSONPolygon(testBBox);
    expect(polygon).toStrictEqual(asPolygon);
  });
  test('Converting BBox to GeoJSON feature should return a Feature GeoJSON, with a geometry with 5 coordinates, sw, nw, ne, se, and sw again and the embedded properties object', () => {
    const feature = BBoxToGeoJSONFeature(testBBox, {
      test: 'testValue',
    });

    expect(feature).toStrictEqual(asFeature);
  });

  test('A GeoJSON shaped as a rectangle polygon BBox should be the same as the [minLon, minLat, maxLon, maxLat] of the first four coordinates', () => {
    const asBBox = getGeoJSONBBox(asPolygon);

    expect(asBBox).toStrictEqual(testBBox);
  });

  test('The BBox representation of a WKT should be equal to the representation of the BBox of its GeoJSON representation', () => {
    const asWkt = convertToWK(asPolygon);
    const wktBBox = getWKBBox(asWkt);
    const geojsonBBox = getGeoJSONBBox(asPolygon);

    expect(wktBBox).toStrictEqual(geojsonBBox);
  });

  test('The SQL sentence generator should return 4 statements according to minLon, minLat, maxLon, maxLat', () => {
    const sql = getBBoxSQLSentence(
      testBBox,
      'latitude',
      'longitude'
    );

    expect(sql).toBe(`AND latitude <= ${maxLat} AND latitude >= ${minLat} AND longitude <= ${maxLon} AND longitude >= ${minLon}`);
  });

  test('The BBox of a geohash should be the same as the BBox of the GeoJSON feature representation of the geohash', () => {
    const geohash = 'ezy';
    const geohashBBox = getGeohashBBox(geohash);
    const featureBBox = turfBbox(geohashToPolygonFeature(geohash));

    expect(geohashBBox).toStrictEqual(featureBBox);
  });

  test('The BBox of a dataset should be the same as the domains of latitude and longitude mapped arrays', () => {
    expect(getDatasetBBox(dataset, {
      latitudeProp: 'latitude',
      longitudeProp: 'longitude',
    })).toStrictEqual([2, -5, 19, 2]);
  });

  test('The BBox of a dataset should be the same as the domains of latitude and longitude mapped arrays, using accesor functions', () => {
    expect(getDatasetBBox(dataset, {
      latitudeAccessor: (item: DatasetItem) => item.latitude,
      longitudeAccessor: (item: DatasetItem) => item.longitude,
    })).toStrictEqual([2, -5, 19, 2]);
  });

  test('A BBox contained in another one should return true for isBBoxInsideBBox method', () => {
    expect(isBBoxInsideBBox([-3.933105, 39.783213, -2.823486, 40.538852], [-4.570313, 39.376772, -2.27417, 40.930115])).toBe(true);
  });

  test('A bigger BBox should not be contained in smaller BBox', () => {
    expect(isBBoxInsideBBox([-4.570313, 39.376772, -2.27417, 40.930115], [-3.933105, 39.783213, -2.823486, 40.538852])).toBe(false);
  });

  test('Two intersecting BBoxes should not be contained one another', () => {
    expect(isBBoxInsideBBox([-4.570313, 39.376772, -2.27417, 40.930115], [-3.054199, 40.229218, -1.230469, 41.302571])).toBe(false);
  });

  test('A point inside a BBox should return true for isPointInsideBBox method', () => {
    expect(isPointInsideBBox({
      latitude: 40.1,
      longitude: -4,
    }, [-4.570313, 39.376772, -2.27417, 40.930115])).toBe(true);
  });

  test('A point outside a BBox should return false for isPointInsideBBox method', () => {
    expect(isPointInsideBBox({
      latitude: 5,
      longitude: -4,
    }, [-4.570313, 39.376772, -2.27417, 40.930115])).toBe(false);
  });

  test('The geohashes inside should return no duplicates', () => {
    const geohashesInside = getGeohashesInBBox([-3.738152, 40.431167, -3.73592, 40.432625], 8);

    const counter: Record<string, number> = {};

    const count = geohashesInside.reduce((agg, geohash) => {
      if (agg[geohash]) {
        agg[geohash]++;
      } else {
        agg[geohash] = 1;
      }

      return agg;
    }, counter);

    expect(Math.max(...Object.values(count))).toBe(1);
  });

  test('The geohashes inside a big enough area should be more than 0', () => {
    const geohashesInside = getGeohashesInBBox([-3.738152, 40.431167, -3.73592, 40.432625], 8);

    expect(geohashesInside.length).toBeGreaterThanOrEqual(1);
  });
});
