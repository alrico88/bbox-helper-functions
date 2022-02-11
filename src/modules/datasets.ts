/* eslint-disable max-len */
import { Accessors } from '../models/Accessors';
import { BBoxAsObject } from '../models/BBoxAsObject';
import { DatasetOptions } from '../models/DatasetOptions';
import { BBox } from './bbox';

class DefaultDatasetOptions implements DatasetOptions {
  public latitudeProp: string;

  public longitudeProp: string;

  constructor() {
    this.latitudeProp = 'latitude';
    this.longitudeProp = 'longitude';
  }
}

/**
 * Gets the BBox of an array of objects
 *
 * @export
 * @param {any[]} dataset Dataset to find BBox of
 * @param {DatasetOptions} [datasetOptions=new DefaultDatasetOptions()] Options for defining latitude and longitude props or accessors
 * @return {BBox} The dataset's bbox
 */
export function getDatasetBBox(
  dataset: any[],
  datasetOptions: DatasetOptions = new DefaultDatasetOptions(),
): BBox {
  const accessors = new Accessors(datasetOptions);

  if (dataset.length > 0) {
    const firstElement = 0;
    const initLon = accessors.longitude(dataset[firstElement]);
    const initLat = accessors.latitude(dataset[firstElement]);

    const initializer: BBoxAsObject = {
      minLat: initLat,
      minLon: initLon,
      maxLat: initLat,
      maxLon: initLon,
    };

    const {
      minLat, minLon, maxLat, maxLon,
    } = dataset.reduce((agg: BBoxAsObject, item) => {
      const latitude = accessors.latitude(item);
      const longitude = accessors.longitude(item);

      if (latitude < agg.minLat) {
        agg.minLat = latitude;
      }

      if (longitude < agg.minLon) {
        agg.minLon = longitude;
      }

      if (latitude > agg.maxLat) {
        agg.maxLat = latitude;
      }

      if (longitude > agg.maxLon) {
        agg.maxLon = longitude;
      }

      return agg;
    }, initializer);

    return [minLon, minLat, maxLon, maxLat];
  }
  const defaultLon = 180;
  const defaultLat = 90;

  return [-defaultLon, -defaultLat, defaultLon, defaultLat];
}
