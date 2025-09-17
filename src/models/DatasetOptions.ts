export type AccessorFunction<T> = (item: T) => number;

export interface DatasetOptions<T> {
  latitudeProp?: string;
  longitudeProp?: string;
  latitudeAccessor?: AccessorFunction<T>;
  longitudeAccessor?: AccessorFunction<T>;
}
