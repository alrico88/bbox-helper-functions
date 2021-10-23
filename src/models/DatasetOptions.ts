export type AccessorFunction = (item: any) => number;

export interface DatasetOptions {
  latitudeProp?: string;
  longitudeProp?: string;
  latitudeAccessor?: AccessorFunction;
  longitudeAccessor?: AccessorFunction;
}
