# mypluralize
A GRPX lib that helps to pack / unpack Correctprice GRPX binary data vectors
## Installation 
```sh
npm install cp-grpx --save
yarn add cp-grpx
```
## Usage
### Javascript
```javascript
const grpx = new GRPX(desc, sect);
const unpackedData = grpx.unpack({grp0, grp1, ..., grp7});
const packedData = grpx.pack([{name, vaule}, {name, vaule} ...]);
```
### TypeScript
```typescript
import GRPX from 'cp-grpx';
```
### AMD
```javascript
define(function(require,exports,module){
  var pluralise = require('cp-grpx');
});
```
## Test 
```sh
npm run test
```