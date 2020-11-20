export = BBoxFunctions;
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
declare class BBoxFunctions {
    /**
     * Changes from [lat, lon] to [lon, lat] for GeoJSON
     *
     * @private
     * @static
     * @param {number[]} array [lat, lon]
     * @returns {number[]} [lon, lat]
     * @memberof BBoxFunctions
     */
    private static latLonToLonLat;
    /**
     * Checks if BBox param is correct
     *
     * @private
     * @static
     * @param {*} bbox The input param
     * @returns {void}
     * @memberof BBoxFunctions
     */
    private static checkBBox;
    /**
     * Converts BBox to corners object, getting coordinates for sw, nw, ne, se
     *
     * @static
     * @param {BBox} bbox The bounding box to convert
     * @returns {CornersBBox} The object representing the corners of the bounding box
     * @memberof BBoxFunctions
     */
    static BBoxToCorners(bbox: BBox): CornersBBox;
    /**
     * Converts a bounding box to a WKT string
     *
     * @static
     * @param {BBox} bbox The bounding box to convert
     * @param {('wkt'|'wkb')} [type="wkt"] Well-known type
     * @returns {(string|Buffer)} The well-known representation of the bounding box
     * @memberof BBoxFunctions
     */
    static BBoxToWK(bbox: BBox, type?: ('wkt' | 'wkb')): (string | Buffer);
    /**
     * Converts bounding box to a GeoJSON Polygon geometry
     *
     * @static
     * @param {BBox} bbox The bounding box to convert
     * @returns {GeoJSONPolygon} The GeoJSON polygon geometry representation
     * @memberof BBoxFunctions
     */
    static BBoxToGeoJSONPolygon(bbox: BBox): GeoJSONPolygon;
    /**
     * Converts bounding box to a GeoJSON Polygon feature
     *
     * @static
     * @param {BBox} bbox The bounding box to convert
     * @param {object} [properties={}] Properties to embed in GeoJSON feature
     * @returns {GeoJSONFeature} GeoJSON feature
     * @memberof BBoxFunctions
     */
    static BBoxToGeoJSONFeature(bbox: BBox, properties?: object): GeoJSONFeature;
    /**
     * Gets the bounding box of any GeoJSON
     *
     * @static
     * @param {object} geojson GeoJSON to get bounding box of
     * @returns {BBox} The GeoJSON bounding box
     * @memberof BBoxFunctions
     */
    static getGeoJSONBBox(geojson: object): BBox;
    /**
     * Converts WKT or WKB to BBox
     *
     * @static
     * @param {(string|Buffer)} wk Well-known representation to get bounding box of
     * @param {('wkt'|'wkb')} [type='wkt'] Type of well-known representation
     * @returns {BBox} The resulting bounding box
     * @memberof BBoxFunctions
     */
    static getWKBBox(wk: (string | Buffer), type?: ('wkt' | 'wkb')): BBox;
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
    static getBBoxSQLSentence(bbox: BBox, latitudeCol: string, longitudeCol: string): string;
    /**
     * Converts geohash to BBox
     *
     * @static
     * @param {string} geohash Geohash to convert to BBox
     * @returns {number[]} [minLon, minLat, maxLon, maxLat]
     * @memberof BBoxFunctions
     */
    static getGeohashBBox(geohash: string): number[];
}
declare namespace BBoxFunctions {
    export { BBox, Coordinate, CornersBBox, GeoJSONPolygon, GeoJSONFeature };
}
/**
 * [minLon, minLat, maxLon, maxLat]
 */
type BBox = number[];
type CornersBBox = {
    /**
     * [lat, lon] for south-west corner
     */
    sw: Coordinate;
    /**
     * [lat, lon] for north-west corner
     */
    nw: Coordinate;
    /**
     * [lat, lon] for north-east corner
     */
    ne: Coordinate;
    /**
     * [lat, lon] for south-east corner
     */
    se: Coordinate;
};
type GeoJSONPolygon = {
    /**
     * Type of geometry
     */
    type: 'Polygon';
    /**
     * Array of coordinates
     */
    coordinates: Coordinate[][];
};
type GeoJSONFeature = {
    /**
     * Type of feature
     */
    type: 'Feature';
    /**
     * Polygon geometry
     */
    geometry: GeoJSONPolygon;
    /**
     * Properties of feature
     */
    properties: object;
};
/**
 * [latitude, longitude]
 */
type Coordinate = number[];
