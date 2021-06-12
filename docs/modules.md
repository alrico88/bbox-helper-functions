[bbox-helper-functions](README.md) / Exports

# bbox-helper-functions

## Table of contents

### Interfaces

- [GeoPoint](interfaces/geopoint.md)

### Type aliases

- [AccessorFunction](modules.md#accessorfunction)
- [BBox](modules.md#bbox)

### Functions

- [BBoxToCorners](modules.md#bboxtocorners)
- [BBoxToGeoJSONFeature](modules.md#bboxtogeojsonfeature)
- [BBoxToGeoJSONPolygon](modules.md#bboxtogeojsonpolygon)
- [BBoxToWK](modules.md#bboxtowk)
- [getBBoxSQLSentence](modules.md#getbboxsqlsentence)
- [getDatasetBBox](modules.md#getdatasetbbox)
- [getGeoJSONBBox](modules.md#getgeojsonbbox)
- [getGeohashBBox](modules.md#getgeohashbbox)
- [getGeohashesInBBox](modules.md#getgeohashesinbbox)
- [getWKBBox](modules.md#getwkbbox)
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

Defined in: [modules/datasets.ts:4](https://github.com/alrico88/bbox-helper-functions/blob/b8ecf76/src/modules/datasets.ts#L4)

___

### BBox

Ƭ **BBox**: [*number*, *number*, *number*, *number*]

Defined in: [modules/bbox.ts:2](https://github.com/alrico88/bbox-helper-functions/blob/b8ecf76/src/modules/bbox.ts#L2)

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

Defined in: [modules/helpers.ts:84](https://github.com/alrico88/bbox-helper-functions/blob/b8ecf76/src/modules/helpers.ts#L84)

___

### BBoxToGeoJSONFeature

▸ **BBoxToGeoJSONFeature**(`bbox`: [*BBox*](modules.md#bbox), `properties?`: GeoJsonProperties): *Feature*<Polygon\>

#### Parameters:

Name | Type |
:------ | :------ |
`bbox` | [*BBox*](modules.md#bbox) |
`properties` | GeoJsonProperties |

**Returns:** *Feature*<Polygon\>

Defined in: [modules/geojson.ts:17](https://github.com/alrico88/bbox-helper-functions/blob/b8ecf76/src/modules/geojson.ts#L17)

___

### BBoxToGeoJSONPolygon

▸ **BBoxToGeoJSONPolygon**(`bbox`: [*BBox*](modules.md#bbox)): Polygon

#### Parameters:

Name | Type |
:------ | :------ |
`bbox` | [*BBox*](modules.md#bbox) |

**Returns:** Polygon

Defined in: [modules/geojson.ts:6](https://github.com/alrico88/bbox-helper-functions/blob/b8ecf76/src/modules/geojson.ts#L6)

___

### BBoxToWK

▸ **BBoxToWK**(`bbox`: [*BBox*](modules.md#bbox), `type?`: WKType): *string* \| Buffer

Converts a BBox to WK

**`export`** 

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`bbox` | [*BBox*](modules.md#bbox) | - | The BBox to convert to WK   |
`type` | WKType | 'wkt' | - |

**Returns:** *string* \| Buffer

The resulting WK

Defined in: [modules/wk.ts:15](https://github.com/alrico88/bbox-helper-functions/blob/b8ecf76/src/modules/wk.ts#L15)

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

Defined in: [modules/sql.ts:15](https://github.com/alrico88/bbox-helper-functions/blob/b8ecf76/src/modules/sql.ts#L15)

___

### getDatasetBBox

▸ **getDatasetBBox**(`dataset`: *any*[], `datasetOptions?`: DatasetOptions): [*BBox*](modules.md#bbox)

Gets the BBox of an array of objects

**`export`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dataset` | *any*[] | Dataset to find BBox of   |
`datasetOptions` | DatasetOptions | - |

**Returns:** [*BBox*](modules.md#bbox)

The dataset's bbox

Defined in: [modules/datasets.ts:52](https://github.com/alrico88/bbox-helper-functions/blob/b8ecf76/src/modules/datasets.ts#L52)

___

### getGeoJSONBBox

▸ **getGeoJSONBBox**(`geojson`: GeoJSON): [*BBox*](modules.md#bbox)

#### Parameters:

Name | Type |
:------ | :------ |
`geojson` | GeoJSON |

**Returns:** [*BBox*](modules.md#bbox)

Defined in: [modules/geojson.ts:25](https://github.com/alrico88/bbox-helper-functions/blob/b8ecf76/src/modules/geojson.ts#L25)

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

Defined in: [modules/geohash.ts:14](https://github.com/alrico88/bbox-helper-functions/blob/b8ecf76/src/modules/geohash.ts#L14)

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

Defined in: [modules/geohash.ts:28](https://github.com/alrico88/bbox-helper-functions/blob/b8ecf76/src/modules/geohash.ts#L28)

___

### getWKBBox

▸ **getWKBBox**(`wk`: *string* \| Buffer): [*BBox*](modules.md#bbox)

Gets the BBox of a WK

**`export`** 

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`wk` | *string* \| Buffer | The WK to get BBox of   |

**Returns:** [*BBox*](modules.md#bbox)

The WK BBox

Defined in: [modules/wk.ts:29](https://github.com/alrico88/bbox-helper-functions/blob/b8ecf76/src/modules/wk.ts#L29)

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

Defined in: [modules/bbox.ts:17](https://github.com/alrico88/bbox-helper-functions/blob/b8ecf76/src/modules/bbox.ts#L17)

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

Defined in: [modules/bbox.ts:37](https://github.com/alrico88/bbox-helper-functions/blob/b8ecf76/src/modules/bbox.ts#L37)
