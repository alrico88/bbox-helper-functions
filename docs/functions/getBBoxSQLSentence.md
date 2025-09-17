[**bbox-helper-functions**](../README.md)

***

[bbox-helper-functions](../README.md) / getBBoxSQLSentence

# Function: getBBoxSQLSentence()

> **getBBoxSQLSentence**(`bbox`, `latitudeCol`, `longitudeCol`): `string`

Defined in: [modules/sql.ts:15](https://github.com/alrico88/bbox-helper-functions/blob/master/src/modules/sql.ts#L15)

Gets a SQL sentence to use to filter a BBox
Checks if a certain column value is inside a BBox

## Parameters

### bbox

[`BBox`](../type-aliases/BBox.md)

The BBox to use as filter

### latitudeCol

`string`

The latitude column name

### longitudeCol

`string`

The longitude column name

## Returns

`string`

The SQL sentence

## Export
