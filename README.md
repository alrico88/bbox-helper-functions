## Classes

<dl>
<dt><a href="#BBoxFunctions">BBoxFunctions</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#BBox">BBox</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>[minLon, minLat, maxLon, maxLat]</p>
</dd>
<dt><a href="#Coordinate">Coordinate</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>[latitude, longitude]</p>
</dd>
<dt><a href="#CornersBBox">CornersBBox</a></dt>
<dd></dd>
<dt><a href="#GeoJSONPolygon">GeoJSONPolygon</a></dt>
<dd></dd>
<dt><a href="#GeoJSONFeature">GeoJSONFeature</a></dt>
<dd></dd>
</dl>

<a name="BBoxFunctions"></a>

## BBoxFunctions

**Kind**: global class

- [BBoxFunctions](#BBoxFunctions)
  - [new BBoxFunctions()](#new_BBoxFunctions_new)
  - [.BBoxToCorners(bbox)](#BBoxFunctions.BBoxToCorners) ⇒ [<code>CornersBBox</code>](#CornersBBox)
  - [.BBoxToWK(bbox, [type])](#BBoxFunctions.BBoxToWK) ⇒ <code>string</code> \| <code>Buffer</code>
  - [.BBoxToGeoJSONPolygon(bbox)](#BBoxFunctions.BBoxToGeoJSONPolygon) ⇒ [<code>GeoJSONPolygon</code>](#GeoJSONPolygon)
  - [.BBoxToGeoJSONFeature(bbox, [properties])](#BBoxFunctions.BBoxToGeoJSONFeature) ⇒ [<code>GeoJSONFeature</code>](#GeoJSONFeature)
  - [.getGeoJSONBBox(geojson)](#BBoxFunctions.getGeoJSONBBox) ⇒ [<code>BBox</code>](#BBox)
  - [.getWKBBox(wk, [type])](#BBoxFunctions.getWKBBox) ⇒ [<code>BBox</code>](#BBox)
  - [.getBBoxSQLSentence(bbox, latitudeCol, longitudeCol)](#BBoxFunctions.getBBoxSQLSentence) ⇒ <code>string</code>

<a name="new_BBoxFunctions_new"></a>

### new BBoxFunctions()

Compendium of methods to manipulate BBoxes

<a name="BBoxFunctions.BBoxToCorners"></a>

### BBoxFunctions.BBoxToCorners(bbox) ⇒ [<code>CornersBBox</code>](#CornersBBox)

Converts BBox to corners object, getting coordinates for sw, nw, ne, se

**Kind**: static method of [<code>BBoxFunctions</code>](#BBoxFunctions)  
**Returns**: [<code>CornersBBox</code>](#CornersBBox) - The object representing the corners of the bounding box

| Param | Type                       | Description                 |
| ----- | -------------------------- | --------------------------- |
| bbox  | [<code>BBox</code>](#BBox) | The bounding box to convert |

<a name="BBoxFunctions.BBoxToWK"></a>

### BBoxFunctions.BBoxToWK(bbox, [type]) ⇒ <code>string</code> \| <code>Buffer</code>

Converts a bounding box to a WKT string

**Kind**: static method of [<code>BBoxFunctions</code>](#BBoxFunctions)  
**Returns**: <code>string</code> \| <code>Buffer</code> - The well-known representation of the bounding box

| Param  | Type                                                         | Default                      | Description                 |
| ------ | ------------------------------------------------------------ | ---------------------------- | --------------------------- |
| bbox   | [<code>BBox</code>](#BBox)                                   |                              | The bounding box to convert |
| [type] | <code>&#x27;wkt&#x27;</code> \| <code>&#x27;wkb&#x27;</code> | <code>&quot;wkt&quot;</code> | Well-known type             |

<a name="BBoxFunctions.BBoxToGeoJSONPolygon"></a>

### BBoxFunctions.BBoxToGeoJSONPolygon(bbox) ⇒ [<code>GeoJSONPolygon</code>](#GeoJSONPolygon)

Converts bounding box to a GeoJSON Polygon geometry

**Kind**: static method of [<code>BBoxFunctions</code>](#BBoxFunctions)  
**Returns**: [<code>GeoJSONPolygon</code>](#GeoJSONPolygon) - The GeoJSON polygon geometry representation

| Param | Type                       | Description                 |
| ----- | -------------------------- | --------------------------- |
| bbox  | [<code>BBox</code>](#BBox) | The bounding box to convert |

<a name="BBoxFunctions.BBoxToGeoJSONFeature"></a>

### BBoxFunctions.BBoxToGeoJSONFeature(bbox, [properties]) ⇒ [<code>GeoJSONFeature</code>](#GeoJSONFeature)

Converts bounding box to a GeoJSON Polygon feature

**Kind**: static method of [<code>BBoxFunctions</code>](#BBoxFunctions)  
**Returns**: [<code>GeoJSONFeature</code>](#GeoJSONFeature) - GeoJSON feature

| Param        | Type                       | Default         | Description                            |
| ------------ | -------------------------- | --------------- | -------------------------------------- |
| bbox         | [<code>BBox</code>](#BBox) |                 | The bounding box to convert            |
| [properties] | <code>object</code>        | <code>{}</code> | Properties to embed in GeoJSON feature |

<a name="BBoxFunctions.getGeoJSONBBox"></a>

### BBoxFunctions.getGeoJSONBBox(geojson) ⇒ [<code>BBox</code>](#BBox)

Gets the bounding box of any GeoJSON

**Kind**: static method of [<code>BBoxFunctions</code>](#BBoxFunctions)  
**Returns**: [<code>BBox</code>](#BBox) - The GeoJSON bounding box

| Param   | Type                | Description                    |
| ------- | ------------------- | ------------------------------ |
| geojson | <code>object</code> | GeoJSON to get bounding box of |

<a name="BBoxFunctions.getWKBBox"></a>

### BBoxFunctions.getWKBBox(wk, [type]) ⇒ [<code>BBox</code>](#BBox)

Converts WKT or WKB to BBox

**Kind**: static method of [<code>BBoxFunctions</code>](#BBoxFunctions)  
**Returns**: [<code>BBox</code>](#BBox) - The resulting bounding box

| Param  | Type                                                         | Default                      | Description                                      |
| ------ | ------------------------------------------------------------ | ---------------------------- | ------------------------------------------------ |
| wk     | <code>string</code> \| <code>Buffer</code>                   |                              | Well-known representation to get bounding box of |
| [type] | <code>&#x27;wkt&#x27;</code> \| <code>&#x27;wkb&#x27;</code> | <code>&#x27;wkt&#x27;</code> | Type of well-known representation                |

<a name="BBoxFunctions.getBBoxSQLSentence"></a>

### BBoxFunctions.getBBoxSQLSentence(bbox, latitudeCol, longitudeCol) ⇒ <code>string</code>

Gets SQL sentence to query by bounding box
Assumes latitude and longitude are in separate columns

**Kind**: static method of [<code>BBoxFunctions</code>](#BBoxFunctions)  
**Returns**: <code>string</code> - The SQL sentence

| Param        | Type                       | Description                                 |
| ------------ | -------------------------- | ------------------------------------------- |
| bbox         | [<code>BBox</code>](#BBox) | The bounding box to convert to SQL sentence |
| latitudeCol  | <code>string</code>        | The latitude column name                    |
| longitudeCol | <code>string</code>        | The longitude column name                   |

<a name="BBox"></a>

## BBox : <code>Array.&lt;number&gt;</code>

[minLon, minLat, maxLon, maxLat]

**Kind**: global typedef  
<a name="Coordinate"></a>

## Coordinate : <code>Array.&lt;number&gt;</code>

[latitude, longitude]

**Kind**: global typedef  
<a name="CornersBBox"></a>

## CornersBBox

**Kind**: global typedef  
**Properties**

| Name | Type                                   | Description                      |
| ---- | -------------------------------------- | -------------------------------- |
| sw   | [<code>Coordinate</code>](#Coordinate) | [lat, lon] for south-west corner |
| nw   | [<code>Coordinate</code>](#Coordinate) | [lat, lon] for north-west corner |
| ne   | [<code>Coordinate</code>](#Coordinate) | [lat, lon] for north-east corner |
| se   | [<code>Coordinate</code>](#Coordinate) | [lat, lon] for south-east corner |

<a name="GeoJSONPolygon"></a>

## GeoJSONPolygon

**Kind**: global typedef  
**Properties**

| Name        | Type                                                | Description          |
| ----------- | --------------------------------------------------- | -------------------- |
| type        | <code>&#x27;Polygon&#x27;</code>                    | Type of geometry     |
| coordinates | <code>Array.&lt;Array.&lt;Coordinate&gt;&gt;</code> | Array of coordinates |

<a name="GeoJSONFeature"></a>

## GeoJSONFeature

**Kind**: global typedef  
**Properties**

| Name       | Type                                           | Description           |
| ---------- | ---------------------------------------------- | --------------------- |
| type       | <code>&#x27;Feature&#x27;</code>               | Type of feature       |
| geometry   | [<code>GeoJSONPolygon</code>](#GeoJSONPolygon) | Polygon geometry      |
| properties | <code>object</code>                            | Properties of feature |
