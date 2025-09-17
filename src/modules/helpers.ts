import type { BBox } from './bbox';

/**
 * Converts lat lon array to lon lat array
 *
 * @export
 * @param  {number[]} array [lat, lon] array to convert
 * @return {number[]} [lon, lat] array
 */
export function latLonToLonLat(array: number[]): number[] {
  return JSON.parse(JSON.stringify(array)).reverse();
}

/**
 * Checks if BBox is valid
 *
 * @export
 * @param  {(BBox | number[])} bbox BBox to check
 * @return {void}
 */
export function checkBBox(bbox: BBox | number[]): void {
  const bboxLength = 4;

  if (!Array.isArray(bbox)) {
    throw new Error('BBox should be an array');
  }

  if (Array.isArray(bbox) && bbox.length !== bboxLength) {
    throw new Error(
      'BBox should have 4 coordinates [minLon, minLat, maxLon, maxLat]',
    );
  }
}

type Coord = [number, number];

export interface Corners {
  sw: Coord;
  nw: Coord;
  ne: Coord;
  se: Coord;
}

class CornersFromBBox {
  public sw: Coord;

  public nw: Coord;

  public ne: Coord;

  public se: Coord;

  /**
   * Creates an instance of CornersFromBBox.
   *
   * @param  {BBox} bbox [minLon, minLat, maxLon, maxLat] The bbox to get corners of
   * @memberof CornersFromBBox
   */
  constructor([minLon, minLat, maxLon, maxLat]: BBox) {
    this.sw = [minLat, minLon];
    this.nw = [maxLat, minLon];
    this.ne = [maxLat, maxLon];
    this.se = [minLat, maxLon];
  }

  /**
   * Returns a plain object frmo class
   *
   * @return {Corners} A plain object
   * @memberof CornersFromBBox
   */
  public toPlain(): Corners {
    return {
      sw: this.sw,
      nw: this.nw,
      ne: this.ne,
      se: this.se,
    };
  }
}

/**
 * Gets corners from a bbox
 *
 * @export
 * @param  {BBox} bbox BBox to get corners of
 * @return {Corners} The corners as [lat, lon] coordinates
 */
export function BBoxToCorners(bbox: BBox): Corners {
  return new CornersFromBBox(bbox).toPlain();
}

/**
 * Returns corners in a lon, lat order
 *
 * @param {Corners} corners
 * @return {Corners}
 */
export function enforceLonLatCorners(corners: Corners): Corners {
  function reverseClone(coords: Coord): Coord {
    return [...coords].reverse() as Coord;
  }

  return {
    sw: reverseClone(corners.sw),
    se: reverseClone(corners.se),
    nw: reverseClone(corners.nw),
    ne: reverseClone(corners.ne),
  };
}

/**
 * Checks if number is between a min and max
 *
 * @export
 * @param {number} toCheck
 * @param {number} min
 * @param {number} max
 * @return {boolean}
 */
export function isBetween(toCheck: number, min: number, max: number): boolean {
  return toCheck >= min && toCheck <= max;
}

/**
 * Gets an array of unique values
 *
 * @export
 * @template T
 * @param {T[]} array Array to find uniques of
 * @return {T[]} The unique values
 */
export function uniq<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}
