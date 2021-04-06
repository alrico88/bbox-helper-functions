# bbox-helper-functions

## Installation

Using npm `npm i bbox-helper-functions`

Using yarn `yarn add bbox-helper-functions`

## Usage

In CommonJS env

```javascript
const { getWKBBox } = require('bbox-helper-functions');

const bbox = getWKBBox(
  'POLYGON((-3.706512451171875 40.420074462890625,-3.70513916015625 40.420074462890625,-3.70513916015625 40.42144775390625,-3.706512451171875 40.42144775390625,-3.706512451171875 40.420074462890625))'
);

// bbox will be [minLon, minLat, maxLon, maxLat]
```

Using imports

```javascript
import { getGeohashBBox } from 'bbox-helper-functions';

const geohashBBox = getGeohashBBox('ezjmun');

// geohashBBox will be [minLon, minLat, maxLon, maxLat]
```

## Table of contents

### Interfaces

- [GeoPoint](interfaces/geopoint.md)

### Type aliases

- [AccessorFunction](#accessorfunction)
- [BBox](#bbox)

### Functions

- [BBoxToCorners](#bboxtocorners)
- [BBoxToGeoJSONFeature](#bboxtogeojsonfeature)
- [BBoxToGeoJSONPolygon](#bboxtogeojsonpolygon)
- [BBoxToWK](#bboxtowk)
- [getBBoxSQLSentence](#getbboxsqlsentence)
- [getDatasetBBox](#getdatasetbbox)
- [getGeoJSONBBox](#getgeojsonbbox)
- [getGeohashBBox](#getgeohashbbox)
- [getWKBBox](#getwkbbox)
- [isBBoxInsideBBox](#isbboxinsidebbox)
- [isPointInsideBBox](#ispointinsidebbox)

## Type aliases

### AccessorFunction

Ƭ **AccessorFunction**: (`item`: _any_) => _number_

#### Type declaration:

▸ (`item`: _any_): _number_

#### Parameters:

| Name   | Type  |
| :----- | :---- |
| `item` | _any_ |

**Returns:** _number_

Defined in: [modules/datasets.ts:4](https://github.com/alrico88/bbox-helper-functions/blob/1d482ca/src/modules/datasets.ts#L4)

---

### BBox

Ƭ **BBox**: [*number*, *number*, *number*, *number*]

Defined in: [modules/bbox.ts:2](https://github.com/alrico88/bbox-helper-functions/blob/1d482ca/src/modules/bbox.ts#L2)

## Functions

### BBoxToCorners

▸ **BBoxToCorners**(`bbox`: [_BBox_](#bbox)): Corners

Gets corners from a bbox

**`export`**

#### Parameters:

| Name   | Type            | Description            |
| :----- | :-------------- | :--------------------- |
| `bbox` | [_BBox_](#bbox) | BBox to get corners of |

**Returns:** Corners

The corners as [lat, lon] coordinates

Defined in: [modules/helpers.ts:84](https://github.com/alrico88/bbox-helper-functions/blob/1d482ca/src/modules/helpers.ts#L84)

---

### BBoxToGeoJSONFeature

▸ **BBoxToGeoJSONFeature**(`bbox`: [_BBox_](#bbox), `properties?`: GeoJsonProperties): _Feature_<Polygon\>

#### Parameters:

| Name         | Type              |
| :----------- | :---------------- |
| `bbox`       | [_BBox_](#bbox)   |
| `properties` | GeoJsonProperties |

**Returns:** _Feature_<Polygon\>

Defined in: [modules/geojson.ts:17](https://github.com/alrico88/bbox-helper-functions/blob/1d482ca/src/modules/geojson.ts#L17)

---

### BBoxToGeoJSONPolygon

▸ **BBoxToGeoJSONPolygon**(`bbox`: [_BBox_](#bbox)): Polygon

#### Parameters:

| Name   | Type            |
| :----- | :-------------- |
| `bbox` | [_BBox_](#bbox) |

**Returns:** Polygon

Defined in: [modules/geojson.ts:6](https://github.com/alrico88/bbox-helper-functions/blob/1d482ca/src/modules/geojson.ts#L6)

---

### BBoxToWK

▸ **BBoxToWK**(`bbox`: [_BBox_](#bbox), `type?`: WKType): _string_ \| Buffer

Converts a BBox to WK

**`export`**

#### Parameters:

| Name   | Type            | Default value | Description               |
| :----- | :-------------- | :------------ | :------------------------ |
| `bbox` | [_BBox_](#bbox) | -             | The BBox to convert to WK |
| `type` | WKType          | 'wkt'         | -                         |

**Returns:** _string_ \| Buffer

The resulting WK

Defined in: [modules/wk.ts:15](https://github.com/alrico88/bbox-helper-functions/blob/1d482ca/src/modules/wk.ts#L15)

---

### getBBoxSQLSentence

▸ **getBBoxSQLSentence**(`bbox`: [_BBox_](#bbox), `latitudeCol`: _string_, `longitudeCol`: _string_): _string_

Gets a SQL sentence to use to filter a BBox
Checks if a certain column value is inside a BBox

**`export`**

#### Parameters:

| Name           | Type            | Description               |
| :------------- | :-------------- | :------------------------ |
| `bbox`         | [_BBox_](#bbox) | The BBox to use as filter |
| `latitudeCol`  | _string_        | The latitude column name  |
| `longitudeCol` | _string_        | The longitude column name |

**Returns:** _string_

The SQL sentence

Defined in: [modules/sql.ts:15](https://github.com/alrico88/bbox-helper-functions/blob/1d482ca/src/modules/sql.ts#L15)

---

### getDatasetBBox

▸ **getDatasetBBox**(`dataset`: _any_[], `datasetOptions?`: DatasetOptions): [_BBox_](#bbox)

Gets the BBox of an array of objects

**`export`**

#### Parameters:

| Name             | Type           | Description             |
| :--------------- | :------------- | :---------------------- |
| `dataset`        | _any_[]        | Dataset to find BBox of |
| `datasetOptions` | DatasetOptions | -                       |

**Returns:** [_BBox_](#bbox)

The dataset's bbox

Defined in: [modules/datasets.ts:52](https://github.com/alrico88/bbox-helper-functions/blob/1d482ca/src/modules/datasets.ts#L52)

---

### getGeoJSONBBox

▸ **getGeoJSONBBox**(`geojson`: GeoJSON): [_BBox_](#bbox)

#### Parameters:

| Name      | Type    |
| :-------- | :------ |
| `geojson` | GeoJSON |

**Returns:** [_BBox_](#bbox)

Defined in: [modules/geojson.ts:25](https://github.com/alrico88/bbox-helper-functions/blob/1d482ca/src/modules/geojson.ts#L25)

---

### getGeohashBBox

▸ **getGeohashBBox**(`geohash`: _string_): [_BBox_](#bbox)

#### Parameters:

| Name      | Type     |
| :-------- | :------- |
| `geohash` | _string_ |

**Returns:** [_BBox_](#bbox)

Defined in: [modules/geohash.ts:4](https://github.com/alrico88/bbox-helper-functions/blob/1d482ca/src/modules/geohash.ts#L4)

---

### getWKBBox

▸ **getWKBBox**(`wk`: _string_ \| Buffer): [_BBox_](#bbox)

Gets the BBox of a WK

**`export`**

#### Parameters:

| Name | Type               | Description           |
| :--- | :----------------- | :-------------------- |
| `wk` | _string_ \| Buffer | The WK to get BBox of |

**Returns:** [_BBox_](#bbox)

The WK BBox

Defined in: [modules/wk.ts:29](https://github.com/alrico88/bbox-helper-functions/blob/1d482ca/src/modules/wk.ts#L29)

---

### isBBoxInsideBBox

▸ **isBBoxInsideBBox**(`bboxToCheck`: [_BBox_](#bbox), `bboxContainer`: [_BBox_](#bbox)): _boolean_

Checks if a BBox is completely contained in another BBox

**`export`**

#### Parameters:

| Name            | Type            | Description                      |
| :-------------- | :-------------- | :------------------------------- |
| `bboxToCheck`   | [_BBox_](#bbox) | The BBox to check if it's inside |
| `bboxContainer` | [_BBox_](#bbox) | The BBox container               |

**Returns:** _boolean_

Whether the BBox is inside the other BBox

Defined in: [modules/bbox.ts:17](https://github.com/alrico88/bbox-helper-functions/blob/1d482ca/src/modules/bbox.ts#L17)

---

### isPointInsideBBox

▸ **isPointInsideBBox**(`point`: [_GeoPoint_](interfaces/geopoint.md), `bbox`: [_BBox_](#bbox)): _boolean_

Checks if a point is inside a BBox

**`export`**

#### Parameters:

| Name    | Type                                 | Description        |
| :------ | :----------------------------------- | :----------------- |
| `point` | [_GeoPoint_](interfaces/geopoint.md) | The point to check |
| `bbox`  | [_BBox_](#bbox)                      | The BBox to check  |

**Returns:** _boolean_

Whether the point is inside the BBox

Defined in: [modules/bbox.ts:37](https://github.com/alrico88/bbox-helper-functions/blob/1d482ca/src/modules/bbox.ts#L37)
