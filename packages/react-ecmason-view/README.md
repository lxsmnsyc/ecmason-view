# react-ecmason-view

> React component for inspecting modern ES objects

[![NPM](https://img.shields.io/npm/v/react-ecmason-view.svg)](https://www.npmjs.com/package/react-ecmason-view) [![JavaScript Style Guide](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

## Install

```bash
npm install --save react-ecmason-view
```

```bash
yarn add react-ecmason-view
```

## Usage

```tsx
import { View } from 'react-ecmason-view';

// Supports Map
const a = new Map([
  // Supports RegExp and Date 
  [/Hello World/, new Date()],
  // Supports Promise and Functions
  [Promise.resolve(), function exampleCallback() {}],
]);

// Support for plain objects
const object = {
  a,
  // Support for Set
  b: new Set([
    // Support for NaN
    NaN,
    // Support for undefined
    undefined,
    // Support for infinity
    Infinity,
    -Infinity,
  ]),
  c: [
    // Support for signed zeroes
    -0,
    null,
  ],
  // Support for Errors
  d: new SyntaxError('This is an error'),
};

// Support for recursion
a.set('recursive', object);

// Create our inspector
<View
  value={object}
/>
```

## Features

### Modern ES Objects Parser

`react-ecmason-view` uses [`ecmason`](https://github.com/lxsmnsyc/ecmason) to serialize objects and display their values in context. On top of the current features of `ecmason`, `react-ecmason-view` adds custom transformers to be able to display functions and Promises.

### Base16 Schemes

`react-ecmason-view` uses [`base16-ts`](https://base16-ts.vercel.app/default-dark) as a peer dependency for the color scheme of the component.

You can install `base16-ts` to gain access to more themes.

```bash
yarn add base16-ts
```

```tsx
import { schemes } from 'base16-ts'

<View
  theme={schemes.monokai}
/>
```

### SSR

`react-ecmason-view` uses [`cxs`](https://github.com/cxs-css/cxs) to generate dynamic classes. You can import `styles` from `react-ecmason-view` to pre-render classes specially on ReactSSR.

```tsx
import { styles } from 'react-ecmason-view';

// Ensure cache is free
styles.reset();
const html = ReactDOMServer.renderToString(<App />)
const css = styles.render()

const doc = `<!DOCTYPE html>
<style>${css}</style>
${html}
`
// Reset the cache for the next render
styles.reset()
```

### Custom Tags

To be added.

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)
