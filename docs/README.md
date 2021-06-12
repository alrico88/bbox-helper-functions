bbox-helper-functions / [Exports](modules.md)

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

## Documentation

See [DOCS](./docs/modules.md)
