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
import { serialize } from 'ecmason';
import React from 'react';
import { TagRenderer } from './TagRenderer';
import {
  ThemeProvider,
  ThemeProviderProps,
  useCreateStyle,
  useTheme,
} from './ThemeProvider';

interface ViewInternalProps<T> {
  value: T;
}

export interface ViewProps<T> extends ThemeProviderProps, ViewInternalProps<T> {
}

function ViewInternal<T>({ value }: ViewInternalProps<T>): JSX.Element {
  const serializedData = serialize(value);

  const theme = useTheme();
  const createStyle = useCreateStyle();

  const container = useMemoCondition(() => createStyle({
    fontFamily: 'monospace',
    cursor: 'default',
    backgroundColor: theme.base00,
    position: 'relative',
    padding: '8px',
    whiteSpace: 'nowrap',
    overflowX: 'scroll',
  }), theme);

  return (
    <div className={container}>
      <TagRenderer
        parent={undefined}
        name={undefined}
        tag={serializedData.tag}
        value={serializedData.value}
      />
    </div>
  );
}

export default function View<T>({ value, ...props }: ViewProps<T>): JSX.Element {
  return (
    <ThemeProvider.Provider {...props}>
      <ViewInternal value={value} />
    </ThemeProvider.Provider>
  );
}
