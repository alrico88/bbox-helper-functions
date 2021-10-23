[bbox-helper-functions](README.md) / Exports

# bbox-helper-functions

## Table of contents

### Interfaces

- [DatasetOptions](interfaces/datasetoptions.md)
- [GeoPoint](interfaces/geopoint.md)

### Type aliases

- [AccessorFunction](modules.md#accessorfunction)
- [BBox](modules.md#bbox)

### Functions

- [BBoxToCorners](modules.md#bboxtocorners)
- [BBoxToGeoJSONFeature](modules.md#bboxtogeojsonfeature)
- [BBoxToGeoJSONPolygon](modules.md#bboxtogeojsonpolygon)
- [BBoxToWKT](modules.md#bboxtowkt)
- [getBBoxPostGISSentence](modules.md#getbboxpostgissentence)
- [getBBoxSQLSentence](modules.md#getbboxsqlsentence)
- [getDatasetBBox](modules.md#getdatasetbbox)
- [getGeoJSONBBox](modules.md#getgeojsonbbox)
- [getGeohashBBox](modules.md#getgeohashbbox)
- [getGeohashesInBBox](modules.md#getgeohashesinbbox)
- [getWKTBBox](modules.md#getwktbbox)
- [isBBoxInsideBBox](modules.md#isbboxinsidebbox)
- [isPointInsideBBox](modules.md#ispointinsidebbox)

## Type aliases

### AccessorFunction

Ƭ **AccessorFunction**: (`item`: *any*) => *number*

#### Type declaration:

▸ (`item`: *any*): *number*

#### Parameters:

Name | Type |
:------ | :------ |
`item` | *any* |

**Returns:** *number*

Defined in: models/DatasetOptions.ts:1

___

### BBox

Ƭ **BBox**: [*number*, *number*, *number*, *number*]

Defined in: [modules/bbox.ts:1](https://github.com/alrico88/bbox-helper-functions/blob/master/src/modules/bbox.ts#L1)

## Functions

### BBoxToCorners

▸ **BBoxToCorners**(`bbox`: [*BBox*](modules.md#bbox)): Corners

Gets corners from a bbox

**`export`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`bbox` | [*BBox*](modules.md#bbox) | BBox to get corners of   |

**Returns:** Corners

The corners as [lat, lon] coordinates

Defined in: [modules/helpers.ts:87](https://github.com/alrico88/bbox-helper-functions/blob/master/src/modules/helpers.ts#L87)

___

### BBoxToGeoJSONFeature

▸ **BBoxToGeoJSONFeature**(`bbox`: [*BBox*](modules.md#bbox), `properties?`: GeoJsonProperties): *Feature*<Polygon\>

#### Parameters:

Name | Type |
:------ | :------ |
`bbox` | [*BBox*](modules.md#bbox) |
`properties` | GeoJsonProperties |

**Returns:** *Feature*<Polygon\>

Defined in: [modules/geojson.ts:21](https://github.com/alrico88/bbox-helper-functions/blob/master/src/modules/geojson.ts#L21)

___

### BBoxToGeoJSONPolygon

▸ **BBoxToGeoJSONPolygon**(`bbox`: [*BBox*](modules.md#bbox)): Polygon

#### Parameters:

Name | Type |
:------ | :------ |
`bbox` | [*BBox*](modules.md#bbox) |

**Returns:** Polygon

Defined in: [modules/geojson.ts:8](https://github.com/alrico88/bbox-helper-functions/blob/master/src/modules/geojson.ts#L8)

___

### BBoxToWKT

▸ **BBoxToWKT**(`bbox`: [*BBox*](modules.md#bbox)): *string*

Converts a BBox to WKT

**`export`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`bbox` | [*BBox*](modules.md#bbox) | The BBox to convert to WKT   |

**Returns:** *string*

The resulting WKT

Defined in: [modules/wk.ts:14](https://github.com/alrico88/bbox-helper-functions/blob/master/src/modules/wk.ts#L14)

___

### getBBoxPostGISSentence

▸ **getBBoxPostGISSentence**(`bbox`: [*BBox*](modules.md#bbox)): *string*

Creates a PostGIS bounding box expression from a BBox

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`bbox` | [*BBox*](modules.md#bbox) | The BBox to convert to a polygon   |

**Returns:** *string*

The SQL sentences

Defined in: [modules/sql.ts:40](https://github.com/alrico88/bbox-helper-functions/blob/master/src/modules/sql.ts#L40)

___

### getBBoxSQLSentence

▸ **getBBoxSQLSentence**(`bbox`: [*BBox*](modules.md#bbox), `latitudeCol`: *string*, `longitudeCol`: *string*): *string*

Gets a SQL sentence to use to filter a BBox
Checks if a certain column value is inside a BBox

**`export`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`bbox` | [*BBox*](modules.md#bbox) | The BBox to use as filter   |
`latitudeCol` | *string* | The latitude column name   |
`longitudeCol` | *string* | The longitude column name   |

**Returns:** *string*

The SQL sentence

Defined in: [modules/sql.ts:15](https://github.com/alrico88/bbox-helper-functions/blob/master/src/modules/sql.ts#L15)

___

### getDatasetBBox

▸ **getDatasetBBox**(`dataset`: *any*[], `datasetOptions?`: [*DatasetOptions*](interfaces/datasetoptions.md)): [*BBox*](modules.md#bbox)

Gets the BBox of an array of objects

**`export`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dataset` | *any*[] | Dataset to find BBox of   |
`datasetOptions` | [*DatasetOptions*](interfaces/datasetoptions.md) | - |

**Returns:** [*BBox*](modules.md#bbox)

The dataset's bbox

Defined in: [modules/datasets.ts:26](https://github.com/alrico88/bbox-helper-functions/blob/master/src/modules/datasets.ts#L26)

___

### getGeoJSONBBox

▸ **getGeoJSONBBox**(`geojson`: GeoJSON): [*BBox*](modules.md#bbox)

#### Parameters:

Name | Type |
:------ | :------ |
`geojson` | GeoJSON |

**Returns:** [*BBox*](modules.md#bbox)

Defined in: [modules/geojson.ts:29](https://github.com/alrico88/bbox-helper-functions/blob/master/src/modules/geojson.ts#L29)

___

### getGeohashBBox

▸ **getGeohashBBox**(`geohash`: *string*): [*BBox*](modules.md#bbox)

Gets the BBox of a given geohash

**`export`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`geohash` | *string* | Geohash to find BBox of   |

**Returns:** [*BBox*](modules.md#bbox)

The BBox of the geohash

Defined in: [modules/geohash.ts:16](https://github.com/alrico88/bbox-helper-functions/blob/master/src/modules/geohash.ts#L16)

___

### getGeohashesInBBox

▸ **getGeohashesInBBox**(`bbox`: [*BBox*](modules.md#bbox), `precision`: *number*): *string*[]

Gets all the geohashes inside a BBox

**`export`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`bbox` | [*BBox*](modules.md#bbox) | The BBox   |
`precision` | *number* | Precision for the geohashes   |

**Returns:** *string*[]

Array of geohash strings

Defined in: [modules/geohash.ts:30](https://github.com/alrico88/bbox-helper-functions/blob/master/src/modules/geohash.ts#L30)

___

### getWKTBBox

▸ **getWKTBBox**(`wkt`: *string*): [*BBox*](modules.md#bbox)

Gets the BBox of a WKT

**`export`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`wkt` | *string* | The WKT to get BBox of   |

**Returns:** [*BBox*](modules.md#bbox)

The WKT BBox

Defined in: [modules/wk.ts:28](https://github.com/alrico88/bbox-helper-functions/blob/master/src/modules/wk.ts#L28)

___

### isBBoxInsideBBox

▸ **isBBoxInsideBBox**(`bboxToCheck`: [*BBox*](modules.md#bbox), `bboxContainer`: [*BBox*](modules.md#bbox)): *boolean*

Checks if a BBox is completely contained in another BBox

**`export`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`bboxToCheck` | [*BBox*](modules.md#bbox) | The BBox to check if it's inside   |
`bboxContainer` | [*BBox*](modules.md#bbox) | The BBox container   |

**Returns:** *boolean*

Whether the BBox is inside the other BBox

Defined in: [modules/bbox.ts:16](https://github.com/alrico88/bbox-helper-functions/blob/master/src/modules/bbox.ts#L16)

___

### isPointInsideBBox

▸ **isPointInsideBBox**(`point`: [*GeoPoint*](interfaces/geopoint.md), `bbox`: [*BBox*](modules.md#bbox)): *boolean*

Checks if a point is inside a BBox

**`export`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`point` | [*GeoPoint*](interfaces/geopoint.md) | The point to check   |
`bbox` | [*BBox*](modules.md#bbox) | The BBox to check   |

**Returns:** *boolean*

Whether the point is inside the BBox

Defined in: [modules/bbox.ts:36](https://github.com/alrico88/bbox-helper-functions/blob/master/src/modules/bbox.ts#L36)
