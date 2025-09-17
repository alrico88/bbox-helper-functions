[**bbox-helper-functions**](../README.md)

***

[bbox-helper-functions](../README.md) / getGeohashesInBBox

# Function: getGeohashesInBBox()

> **getGeohashesInBBox**(`bbox`, `precision`, `strict?`): `string`[]

Defined in: [modules/geohash.ts:37](https://github.com/alrico88/bbox-helper-functions/blob/master/src/modules/geohash.ts#L37)

Gets all the geohashes inside a BBox

## Parameters

### bbox

[`BBox`](../type-aliases/BBox.md)

The BBox

### precision

`number`

Precision for the geohashes

### strict?

`boolean` = `false`

Only return geohashes whose centroids are inside BBox

## Returns

`string`[]

Array of geohash strings

## Export
