import get from 'lodash/get';
import is from '@sindresorhus/is';
import { DatasetOptions } from './DatasetOptions';

export class Accessors {
  public longitude: (item: any) => number;

  public latitude: (item: any) => number;

  constructor(options: DatasetOptions) {
    this.latitude = options.latitudeAccessor != null
      ? options.latitudeAccessor
      : (d: any): number => get(d, is.nullOrUndefined(options.latitudeProp) ? 'latitude' : options.latitudeProp);
    this.longitude = options.longitudeAccessor != null
      ? options.longitudeAccessor
      : (d: any): number => get(d, is.nullOrUndefined(options.longitudeProp) ? 'longitude' : options.longitudeProp);
  }
}
