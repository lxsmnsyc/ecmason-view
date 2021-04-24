import React, { useState } from 'react';
import { View, themes } from 'react-ecmason-view';

const a = new Map([
  // Support for Dates
  ['hello', new Date()],
  // Support for Regex
  ['world', /Hello World/],
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
    +0,
    -0,
    null,
  ],
};

// Support for recursion
a.set('recursive', object);

export default function App(): JSX.Element {
  const [state, setState] = useState('default');
  return (
    <>
      <div>
        <select
          onChange={(e) => {
            setState(e.currentTarget.value);
          }}
          defaultValue={state}
        >
          {
            Object.entries(themes).map(([key, val]) => (
              <option key={key} value={key}>
                {val.scheme}
              </option>
            ))
          }
        </select>
      </div>
      <View
        theme={themes[state]}
        value={object}
      />
    </>
  );
}
