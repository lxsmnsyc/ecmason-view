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
import { useConditionalMemo } from '@lyonph/react-hooks';
import { RecursiveRef } from 'ecmason';
import React from 'react';
import DataTypeLabel from './DataTypeLabel';
import Reference from './Reference';
import Size from './Size';
import Brace from './symbols/Brace';
import Ellipsis from './symbols/Ellipsis';
import { TagProps } from './TagRenderer';
import { useCreateStyle, useTheme } from './ThemeProvider';

interface MetaProps<T> {
  value: T;
  expanded: boolean;
}

function Meta<T>({ value, expanded }: MetaProps<T>): JSX.Element {
  const size = value instanceof Array ? value.length : Object.keys(value).length;

  return (
    <>
      <Size
        value={size}
      />
      <Brace
        value={value instanceof Array ? '[' : '{'}
        indent={false}
      />
      {
        size > 0
          ? (
            !expanded && (
              <>
                <Ellipsis />
                <Brace
                  value={value instanceof Array ? ']' : '}'}
                  indent={false}
                />
              </>
            )
          )
          : (
            <Brace
              value={value instanceof Array ? ']' : '}'}
              indent={false}
            />
          )
      }
    </>
  );
}

type MetaInfoProps<T> = TagProps<RecursiveRef<T> | number> & {
  type: string;
};

export default function MetaInfo<T>(
  { type, value, expanded }: MetaInfoProps<T>,
): JSX.Element {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useConditionalMemo(() => createStyle({
    display: 'inline-block',
    color: theme.base0A,
  }), theme);

  return (
    <div className={style}>
      <DataTypeLabel type={type} />
      <Reference id={typeof value === 'number' ? value : value.id} />
      {
        typeof value === 'object' && (
          <Meta
            value={value.value}
            expanded={expanded}
          />
        )
      }
    </div>
  );
}
