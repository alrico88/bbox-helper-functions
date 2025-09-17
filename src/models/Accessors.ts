import dlv from 'dlv';
import is from '@sindresorhus/is';
import type { DatasetOptions } from './DatasetOptions';

export class Accessors<T> {
  public longitude: (item: T) => number;

  public latitude: (item: T) => number;

  constructor(options: DatasetOptions<T>) {
    this.latitude =
      options.latitudeAccessor != null
        ? options.latitudeAccessor
        : (d): number =>
            dlv(
              d as object,
              is.nullOrUndefined(options.latitudeProp)
                ? 'latitude'
                : options.latitudeProp,
            );
    this.longitude =
      options.longitudeAccessor != null
        ? options.longitudeAccessor
        : (d): number =>
            dlv(
              d as object,
              is.nullOrUndefined(options.longitudeProp)
                ? 'longitude'
                : options.longitudeProp,
            );
  }
}
