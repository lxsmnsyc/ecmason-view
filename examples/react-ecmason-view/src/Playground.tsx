import React, { useState, useEffect } from 'react';
import { View } from 'react-ecmason-view';
import { schemes } from 'base16-ts';

const a = new Map([
  [/Hello World/, new Date()],
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
    +0,
    -0,
    null,
  ],
};

// Support for recursion
a.set('recursive', object);

export default function Playground(): JSX.Element {
  const [scheme, setScheme] = useState('defaultDark');
  const [displayDataTypes, setDisplayDataTypes] = useState(true);
  const [displayArrayKeys, setDisplayArrayKeys] = useState(true);
  const [displayObjectSize, setDisplayObjectSize] = useState(true);
  const [quotesOnKeys, setQuotesOnKeys] = useState(true);

  const currentScheme = schemes[scheme];

  useEffect(() => {
    // Update root variables
    const root = document.documentElement;

    root.style.setProperty('--base00', currentScheme.base00);
    root.style.setProperty('--base01', currentScheme.base01);
    root.style.setProperty('--base02', currentScheme.base02);
    root.style.setProperty('--base03', currentScheme.base03);
    root.style.setProperty('--base04', currentScheme.base04);
    root.style.setProperty('--base05', currentScheme.base05);
    root.style.setProperty('--base06', currentScheme.base06);
    root.style.setProperty('--base07', currentScheme.base07);
    root.style.setProperty('--base08', currentScheme.base08);
    root.style.setProperty('--base09', currentScheme.base09);
    root.style.setProperty('--base0A', currentScheme.base0A);
    root.style.setProperty('--base0B', currentScheme.base0B);
    root.style.setProperty('--base0C', currentScheme.base0C);
    root.style.setProperty('--base0D', currentScheme.base0D);
    root.style.setProperty('--base0E', currentScheme.base0E);
    root.style.setProperty('--base0F', currentScheme.base0F);
  }, [scheme]);

  return (
    <>
      <section>
        <h3>Scheme</h3>
        <select
          onChange={(e) => {
            setScheme(e.currentTarget.value);
          }}
          defaultValue={scheme}
        >
          {
            Object.entries(schemes).map(([key, val]) => (
              <option key={key} value={key}>
                {val.scheme}
              </option>
            ))
          }
        </select>
      </section>
      <section>
        <h3>Options</h3>
        <button
          type="button"
          onClick={() => {
            setDisplayDataTypes(!displayDataTypes);
          }}
        >
          {`${displayDataTypes ? 'Hide' : 'Show'} Data Types`}
        </button>
        <button
          type="button"
          onClick={() => {
            setDisplayArrayKeys(!displayArrayKeys);
          }}
        >
          {`${displayArrayKeys ? 'Hide' : 'Show'} Array Keys`}
        </button>
        <button
          type="button"
          onClick={() => {
            setDisplayObjectSize(!displayObjectSize);
          }}
        >
          {`${displayObjectSize ? 'Hide' : 'Show'} Object Size`}
        </button>
        <button
          type="button"
          onClick={() => {
            setQuotesOnKeys(!quotesOnKeys);
          }}
        >
          {`${quotesOnKeys ? 'Hide' : 'Show'} Quotes on Keys`}
        </button>
      </section>
      <section>
        <h3>Preview</h3>
        <div className="code">
          <View
            theme={currentScheme}
            displayDataTypes={displayDataTypes}
            displayArrayKeys={displayArrayKeys}
            displayObjectSize={displayObjectSize}
            quotesOnKeys={quotesOnKeys}
            value={object}
          />
        </div>
      </section>
    </>
  );
}
