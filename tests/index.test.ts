import {BBoxToCorners, BBoxToWK, BBoxToGeoJSONPolygon, BBoxToGeoJSONFeature, getGeoJSONBBox, getWKBBox, getBBoxSQLSentence, getGeohashBBox, BBox} from '../src';
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
});
