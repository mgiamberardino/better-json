# Circular JSON library

## What's it?

Typescript implementation of Circular JSON library.

## Installation

`npm install --save @mgiamberardino/better-json`

## How to use it?

ES6:
```
import * as BetterJSON from '@mgiamberardino/better-json';

const someCiruclarObj = [];
someCiruclarObj[0] = someCiruclarObj;

const otherObj = BetterJSON.parse(BetterJSON.stringify(someCiruclarObj));
...
```