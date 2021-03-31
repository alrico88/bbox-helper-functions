import {BBox} from './bbox';
import {get} from 'lodash';

export type AccessorFunction = (item: any) => number;

interface DatasetOptions {
  latitudeProp?: string;
  longitudeProp?: string;
  latitudeAccessor?: AccessorFunction;
  longitudeAccessor?: AccessorFunction;
}

interface BBoxAsObject {
  minLat: number;
  minLon: number;
  maxLat: number;
  maxLon: number;
}

class DefaultDatasetOptions implements DatasetOptions {
  public latitudeProp: string;
  public longitudeProp: string;

  constructor() {
    this.latitudeProp = 'latitude';
    this.longitudeProp = 'longitude';
  }
}

class Accessors {
  public longitude: (item: any) => number;
  public latitude: (item: any) => number;

  constructor(options: DatasetOptions) {
    this.latitude = options.latitudeAccessor != null
      ? options.latitudeAccessor
      : (d: any): number => get(d, options.latitudeProp != null ? options.latitudeProp : 'latitude');
    this.longitude = options.longitudeAccessor != null
      ? options.longitudeAccessor
      : (d: any): number => get(d, options.longitudeProp != null ? options.longitudeProp : 'longitude');
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
export function getDatasetBBox(dataset: any[], datasetOptions: DatasetOptions = new DefaultDatasetOptions()): BBox {
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

    const {minLat, minLon, maxLat, maxLon} = dataset.reduce((agg: BBoxAsObject, item) => {
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
  } else {
    const defaultCoord = 180;

    return [-defaultCoord, -defaultCoord, defaultCoord, defaultCoord];
  }
}
