/**
 * @license
 * MIT License
 *
 * Copyright (c) 2021 Alexis Munsayac
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @author Alexis Munsayac <alexis.munsayac@gmail.com>
 * @copyright Alexis Munsayac 2021
 */
import { useMemoCondition } from '@lyonph/react-hooks';
import React from 'react';
import DataTypeLabel from '../DataTypeLabel';
import { registerTag, TagProps } from '../TagRenderer';
import Ellipsis from '../symbols/Ellipsis';
import { useTheme, useCreateStyle, useCollapseStringAfterLength } from '../ThemeProvider';

function NumberRenderer({ value }: TagProps<number>): JSX.Element {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useMemoCondition(() => createStyle({
    display: 'inline-block',
    color: theme.base09,
  }), theme);

  return (
    <div className={style}>
      <DataTypeLabel type="number" />
      { value }
    </div>
  );
}

function BooleanRenderer({ value }: TagProps<boolean>): JSX.Element {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useMemoCondition(() => createStyle({
    display: 'inline-block',
    color: theme.base09,
  }), theme);

  return (
    <div className={style}>
      <DataTypeLabel type="boolean" />
      { value ? 'true' : 'false' }
    </div>
  );
}

function NullRenderer(): JSX.Element {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useMemoCondition(() => createStyle({
    display: 'inline-block',
    color: theme.base08,
    fontWeight: 'bold',
  }), theme);

  return (
    <div className={style}>
      null
    </div>
  );
}

function CollapsibleString({ value, expanded }: TagProps<string>): JSX.Element {
  const collapseStringAfterLength = useCollapseStringAfterLength();

  return (
    <span>
      &quot;
      {
        (expanded || collapseStringAfterLength == null)
          ? value
          : (
            <>
              {value.substring(0, collapseStringAfterLength)}
              <Ellipsis />
            </>
          )
      }
      &quot;
    </span>
  );
}

function StringRenderer({ value, expanded }: TagProps<string>) {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useMemoCondition(() => createStyle({
    display: 'inline-block',
    color: theme.base0B,
  }), theme);

  return (
    <div className={style}>
      <DataTypeLabel type="string" />
      <CollapsibleString value={value} expanded={expanded} />
    </div>
  );
}

registerTag(
  'PRIMITIVE',
  ({ value, expanded }: TagProps<string | number | boolean | null>) => {
    if (typeof value === 'number') {
      return <NumberRenderer value={value} expanded={expanded} />;
    }
    if (typeof value === 'boolean') {
      return <BooleanRenderer value={value} expanded={expanded} />;
    }
    if (typeof value === 'string') {
      return <StringRenderer value={value} expanded={expanded} />;
    }
    if (value === null) {
      return <NullRenderer />;
    }
    return <></>;
  },
);
