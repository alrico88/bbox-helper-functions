import Formatter from 'string-object-formatter';
import {BBox} from './bbox';
import {BBoxToCorners, checkBBox, enforceLonLatCorners} from './helpers';

/**
 * Gets a SQL sentence to use to filter a BBox
 * Checks if a certain column value is inside a BBox
 *
 * @export
 * @param  {BBox} bbox The BBox to use as filter
 * @param  {string} latitudeCol The latitude column name
 * @param  {string} longitudeCol The longitude column name
 * @return {string} The SQL sentence
 */
export function getBBoxSQLSentence(bbox: BBox, latitudeCol: string, longitudeCol: string): string {
  checkBBox(bbox);

  const [minLon, minLat, maxLon, maxLat] = bbox;
  const formatter = new Formatter('{{', '}}');

  return formatter.format(
    'AND {{latitudeCol}} <= {{maxLat}} AND {{latitudeCol}} >= {{minLat}} AND {{longitudeCol}} <= {{maxLon}} AND {{longitudeCol}} >= {{minLon}}',
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
 * Creates a PostGIS bounding box expression from a BBox
 *
 * @param {BBox} bbox The BBox to convert to a polygon
 * @return {string} The SQL sentences
 */
export function getBBoxPostGISSentence(bbox: BBox): string {
    const {sw, se, nw, ne} = enforceLonLatCorners(BBoxToCorners(bbox));

    return `ST_MAKEPOLYGON(ST_MAKELINE([ST_GEOGPOINT(${sw.toString()}),ST_GEOGPOINT(${nw.toString()}),ST_GEOGPOINT(${ne.toString()}),ST_GEOGPOINT(${se.toString()})]))`;
}
