const BBoxHelper = require('../index');
const {convertToWK} = require('wkt-parser-helper');

const TEST_BBOX = [-3.708011, 40.418038, -3.687877, 40.428754];

const [minLon, minLat, maxLon, maxLat] = TEST_BBOX;

const asPolygon = {
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

const asFeature = {
  type: 'Feature',
  geometry: asPolygon,
  properties: {
    test: 'testValue',
  },
};

describe('Testing BBoxHelper methods', () => {
  test('Corners should be an object with sw, nw, ne, se properties', () => {
    const asCorners = BBoxHelper.BBoxToCorners(TEST_BBOX);
    expect(asCorners).toStrictEqual({
      sw: [minLat, minLon],
      nw: [maxLat, minLon],
      ne: [maxLat, maxLon],
      se: [minLat, maxLon],
    });
  });

  test('Converting BBox to WKT should return the same representation as a polygon with 5 coordinates, sw, nw, ne, se, and sw again', () => {
    const asCorners = BBoxHelper.BBoxToWK(TEST_BBOX, 'wkt');
    expect(asCorners).toStrictEqual(convertToWK(asPolygon));
  });

  test('Converting BBox to GeoJSON polygon should return a polygon with 5 coordinates, sw, nw, ne, se, and sw again', () => {
    const polygon = BBoxHelper.BBoxToGeoJSONPolygon(TEST_BBOX);
    expect(polygon).toStrictEqual(asPolygon);
  });
  test('Converting BBox to GeoJSON feature should return a Feature GeoJSON, with a geometry with 5 coordinates, sw, nw, ne, se, and sw again and the embedded properties object', () => {
    const feature = BBoxHelper.BBoxToGeoJSONFeature(TEST_BBOX, {
      test: 'testValue',
    });
    expect(feature).toStrictEqual(asFeature);
  });

  test('A GeoJSON shaped as a rectangle polygon BBox should be the same as the [minLon, minLat, maxLon, maxLat] of the first four coordinates', () => {
    const asBBox = BBoxHelper.getGeoJSONBBox(asPolygon);
    expect(asBBox).toStrictEqual(TEST_BBOX);
  });

  test('The BBox representation of a WKT should be equal to the representation of the BBox of its GeoJSON representation', () => {
    const asWkt = convertToWK(asPolygon);
    const wktBBox = BBoxHelper.getWKBBox(asWkt);
    const geojsonBBox = BBoxHelper.getGeoJSONBBox(asPolygon);
    expect(wktBBox).toStrictEqual(geojsonBBox);
  });

  test('The SQL sentence generator should return 4 statements according to minLon, minLat, maxLon, maxLat', () => {
    const sql = BBoxHelper.getBBoxSQLSentence(
      TEST_BBOX,
      'latitude',
      'longitude'
    );
    expect(sql).toBe(`AND latitude < ${maxLat} AND latitude > ${minLat} AND longitude < ${maxLon} AND longitude > ${minLon}`);
  });
});

describe('Testing BBoxHelper error throwing', () => {
  test('BBox methods should throw error if input BBox array is missing', () => {
    const BAD_BBOX = undefined;
    expect(() => {
      BBoxHelper.getBBoxSQLSentence(BAD_BBOX, 'latitude', 'longitude');
    }).toThrow();
  });

  test('BBox methods should throw error if input BBox array is incomplete', () => {
    const BAD_BBOX = [minLat, minLon];
    expect(() => {
      BBoxHelper.getBBoxSQLSentence(BAD_BBOX, 'latitude', 'longitude');
    }).toThrow();
  });
});
