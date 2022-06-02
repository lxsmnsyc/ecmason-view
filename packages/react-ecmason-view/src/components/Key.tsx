/**
 * @license
 * MIT License
 *
 * Copyright (c) 2022 Alexis Munsayac
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
 * @copyright Alexis Munsayac 2022
 */
import { useConditionalMemo } from '@lyonph/react-hooks';
import React from 'react';
import Colon from './symbols/Colon';
import Quote from './symbols/Quote';
import { useCreateStyle, useDisplayArrayKeys, useTheme } from './ThemeProvider';

export interface KeyProps {
  type: 'array' | 'object';
  value: number | string;
}

interface ArrayKeyProps {
  value: number | string;
}

function ArrayKey({ value }: ArrayKeyProps): JSX.Element {
  const displayArrayKeys = useDisplayArrayKeys();
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useConditionalMemo(() => createStyle({
    display: 'inline-block',
    color: theme.base09,
    letterSpacing: '0.5px',
    fontStyle: 'none',
    verticalAlign: 'top',
    opacity: '0.85',
    ':hover': {
      opacity: '1',
    },
  }), theme);

  if (displayArrayKeys) {
    return (
      <span className={style}>
        <span>{value}</span>
        <Colon />
      </span>
    );
  }

  return <></>;
}

interface ObjectKeyProps {
  value: number | string;
}

function ObjectKey({ value }: ObjectKeyProps): JSX.Element {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useConditionalMemo(() => createStyle({
    display: 'inline-block',
    color: theme.base0B,
    letterSpacing: '0.5px',
    fontStyle: 'none',
    verticalAlign: 'top',
    opacity: '0.85',
    ':hover': {
      opacity: '1',
    },
  }), theme);

  return (
    <span className={style}>
      <Quote />
      <span>{value}</span>
      <Quote />
      <Colon />
    </span>
  );
}

export default function Key({ type, value }: KeyProps): JSX.Element {
  // eslint-disable-next-line react/destructuring-assignment
  if (type === 'array') {
    return <ArrayKey value={value} />;
  }
  return <ObjectKey value={value} />;
}
