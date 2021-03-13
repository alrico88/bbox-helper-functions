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

### Type aliases

- [BBox](#bbox)

### Functions

- [BBoxToCorners](#bboxtocorners)
- [BBoxToGeoJSONFeature](#bboxtogeojsonfeature)
- [BBoxToGeoJSONPolygon](#bboxtogeojsonpolygon)
- [BBoxToWK](#bboxtowk)
- [getBBoxSQLSentence](#getbboxsqlsentence)
- [getGeoJSONBBox](#getgeojsonbbox)
- [getGeohashBBox](#getgeohashbbox)
- [getWKBBox](#getwkbbox)

## Type aliases

### BBox

Ƭ **BBox**: [*number*, *number*, *number*, *number*]

Defined in: modules/bbox.ts:2

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

Defined in: modules/helpers.ts:84

---

### BBoxToGeoJSONFeature

▸ **BBoxToGeoJSONFeature**(`bbox`: [_BBox_](#bbox), `properties?`: GeoJsonProperties): _Feature_<Polygon\>

#### Parameters:

| Name         | Type              |
| :----------- | :---------------- |
| `bbox`       | [_BBox_](#bbox)   |
| `properties` | GeoJsonProperties |

**Returns:** _Feature_<Polygon\>

Defined in: modules/geojson.ts:17

---

### BBoxToGeoJSONPolygon

▸ **BBoxToGeoJSONPolygon**(`bbox`: [_BBox_](#bbox)): Polygon

#### Parameters:

| Name   | Type            |
| :----- | :-------------- |
| `bbox` | [_BBox_](#bbox) |

**Returns:** Polygon

Defined in: modules/geojson.ts:6

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

Defined in: modules/wk.ts:15

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

Defined in: modules/sql.ts:15

---

### getGeoJSONBBox

▸ **getGeoJSONBBox**(`geojson`: GeoJSON): [_BBox_](#bbox)

#### Parameters:

| Name      | Type    |
| :-------- | :------ |
| `geojson` | GeoJSON |

**Returns:** [_BBox_](#bbox)

Defined in: modules/geojson.ts:25

---

### getGeohashBBox

▸ **getGeohashBBox**(`geohash`: _string_): [_BBox_](#bbox)

#### Parameters:

| Name      | Type     |
| :-------- | :------- |
| `geohash` | _string_ |

**Returns:** [_BBox_](#bbox)

Defined in: modules/geohash.ts:4

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

Defined in: modules/wk.ts:29
