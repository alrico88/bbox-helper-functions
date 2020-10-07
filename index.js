const {convertToWK, parseFromWK} = require('wkt-parser-helper');
const {default: turfBBox} = require('@turf/bbox');
const {decode_bbox} = require('ngeohash');
const Formatter = require('string-object-formatter');

/**
 * @typedef {number[]} BBox [minLon, minLat, maxLon, maxLat]
 */

/**
 * @typedef {number[]} Coordinate [latitude, longitude]
 */

/**
 * @typedef CornersBBox
 * @property {Coordinate} sw [lat, lon] for south-west corner
 * @property {Coordinate} nw [lat, lon] for north-west corner
 * @property {Coordinate} ne [lat, lon] for north-east corner
 * @property {Coordinate} se [lat, lon] for south-east corner
 */

/**
 * @typedef GeoJSONPolygon
 * @property {'Polygon'} type Type of geometry
 * @property {Coordinate[][]} coordinates Array of coordinates
 */

/**
 * @typedef GeoJSONFeature
 * @property {'Feature'} type Type of feature
 * @property {GeoJSONPolygon} geometry Polygon geometry
 * @property {object} properties Properties of feature
 */

/**
 * Compendium of methods to manipulate BBoxes
 *
 * @class BBoxFunctions
 */
class BBoxFunctions {

  /**
   * Changes from [lat, lon] to [lon, lat] for GeoJSON
   *
   * @private
   * @static
   * @param {number[]} array [lat, lon]
   * @returns {number[]} [lon, lat]
   * @memberof BBoxFunctions
   */
  static latLonToLonLat(array) {
    return JSON.parse(JSON.stringify(array)).reverse();
  }

  /**
   * Checks if BBox param is correct
   *
   * @private
   * @static
   * @param {*} bbox The input param
   * @returns {void}
   * @memberof BBoxFunctions
   */
  static checkBBox(bbox) {
    if (!Array.isArray(bbox)) {
      throw new Error('BBox should be an array');
    }

    if (Array.isArray(bbox) && bbox.length < 4) {
      throw new Error('BBox should have 4 coordinates [minLon, minLat, maxLon, maxLat]');
    }
  }

  /**
   * Converts BBox to corners object, getting coordinates for sw, nw, ne, se
   *
   * @static
   * @param {BBox} bbox The bounding box to convert
   * @returns {CornersBBox} The object representing the corners of the bounding box
   * @memberof BBoxFunctions
   */
  static BBoxToCorners(bbox) {
    const [minLon, minLat, maxLon, maxLat] = bbox;
    return {
      sw: [minLat, minLon],
      nw: [maxLat, minLon],
      ne: [maxLat, maxLon],
      se: [minLat, maxLon],
    };
  }

  /**
   * Converts a bounding box to a WKT string
   *
   * @static
   * @param {BBox} bbox The bounding box to convert
   * @param {('wkt'|'wkb')} [type="wkt"] Well-known type
   * @returns {(string|Buffer)} The well-known representation of the bounding box
   * @memberof BBoxFunctions
   */
  static BBoxToWK(bbox, type = 'wkt') {
    BBoxFunctions.checkBBox(bbox);
    const GeoJSON = BBoxFunctions.BBoxToGeoJSONPolygon(bbox);
    return convertToWK(GeoJSON, type);
  }

  /**
   * Converts bounding box to a GeoJSON Polygon geometry
   *
   * @static
   * @param {BBox} bbox The bounding box to convert
   * @returns {GeoJSONPolygon} The GeoJSON polygon geometry representation
   * @memberof BBoxFunctions
   */
  static BBoxToGeoJSONPolygon(bbox) {
    BBoxFunctions.checkBBox(bbox);
    const {sw, se, nw, ne} = BBoxFunctions.BBoxToCorners(bbox);
    return {
      type: 'Polygon',
      coordinates: [[sw, nw, ne, se, sw].map((d) => BBoxFunctions.latLonToLonLat(d))],
    };
  }

  /**
   * Converts bounding box to a GeoJSON Polygon feature
   *
   * @static
   * @param {BBox} bbox The bounding box to convert
   * @param {object} [properties={}] Properties to embed in GeoJSON feature
   * @returns {GeoJSONFeature} GeoJSON feature
   * @memberof BBoxFunctions
   */
  static BBoxToGeoJSONFeature(bbox, properties = {}) {
    BBoxFunctions.checkBBox(bbox);
    return {
      type: 'Feature',
      geometry: BBoxFunctions.BBoxToGeoJSONPolygon(bbox),
      properties,
    };
  }

  /**
   * Gets the bounding box of any GeoJSON
   *
   * @static
   * @param {object} geojson GeoJSON to get bounding box of
   * @returns {BBox} The GeoJSON bounding box
   * @memberof BBoxFunctions
   */
  static getGeoJSONBBox(geojson) {
    return turfBBox(geojson);
  }

  /**
   * Converts WKT or WKB to BBox
   *
   * @static
   * @param {(string|Buffer)} wk Well-known representation to get bounding box of
   * @param {('wkt'|'wkb')} [type='wkt'] Type of well-known representation
   * @returns {BBox} The resulting bounding box
   * @memberof BBoxFunctions
   */
  static getWKBBox(wk, type = 'wkt') {
    return turfBBox(parseFromWK(wk, type));
  }

  /**
   * Gets SQL sentence to query by bounding box
   * Assumes latitude and longitude are in separate columns
   *
   * @static
   * @param {BBox} bbox The bounding box to convert to SQL sentence
   * @param {string} latitudeCol The latitude column name
   * @param {string} longitudeCol The longitude column name
   * @returns {string} The SQL sentence
   * @memberof BBoxFunctions
   */
  static getBBoxSQLSentence(bbox, latitudeCol, longitudeCol) {
    BBoxFunctions.checkBBox(bbox);
    const [minLon, minLat, maxLon, maxLat] = bbox;
    const formatter = new Formatter('{{', '}}');
    return formatter.format(
      'AND {{latitudeCol}} < {{maxLat}} AND {{latitudeCol}} > {{minLat}} AND {{longitudeCol}} < {{maxLon}} AND {{longitudeCol}} > {{minLon}}',
      {
        latitudeCol,
        longitudeCol,
        minLat,
        minLon,
        maxLat,
        maxLon,
      }
    );
  }

  /**
   * Converts geohash to BBox
   *
   * @static
   * @param {string} geohash Geohash to convert to BBox
   * @returns {number[]} [minLon, minLat, maxLon, maxLat]
   * @memberof BBoxFunctions
   */
  static getGeohashBBox(geohash) {
    const [minLat, minLon, maxLat, maxLon] = decode_bbox(geohash);
    return [minLon, minLat, maxLon, maxLat];
  }
}

module.exports = BBoxFunctions;
