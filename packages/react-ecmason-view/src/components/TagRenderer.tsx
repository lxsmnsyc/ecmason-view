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
import { useConstant, useFreshState, useConditionalMemo } from '@lyonph/react-hooks';
import React, { ReactNode } from 'react';
import Key from './Key';
import RowContainer from './RowContainer';
import { useCreateStyle, useTheme } from './ThemeProvider';
import TreeCache, { useTreeMemory } from './TreeCache';

export interface TagProps<T> {
  value: T;
  expanded: boolean;
}

export interface Tag<T> {
  tag: string;
  render: (props: TagProps<T>) => JSX.Element;
  expand?: (props: TagProps<T>) => JSX.Element;
}

const TAGS = new Map<string, Tag<any>>();

export function registerTag<T>(
  tag: string,
  render: (props: TagProps<T>) => JSX.Element,
  expand?: (props: TagProps<T>) => JSX.Element,
): void {
  TAGS.set(tag, {
    tag,
    render,
    expand,
  });
}

interface TagRendererContainerProps {
  withParent: boolean;
  children: ReactNode;
}

function TagRendererContainer(
  { withParent, children }: TagRendererContainerProps,
): JSX.Element {
  if (withParent) {
    return (
      <RowContainer>
        {children}
      </RowContainer>
    );
  }
  return (
    <>
      { children }
    </>
  );
}

interface TagRendererInternalProps<T> {
  parent: 'array' | 'object' | undefined;
  name: string | number | undefined;
  tag: Tag<T>;
  value: T;
}

function TagRendererInternal<T>(
  {
    parent, name, tag, value,
  }: TagRendererInternalProps<T>,
) {
  const Meta = tag.render;
  const Expand = tag.expand;

  const memory = useTreeMemory();
  const [state, setState] = useFreshState(
    (): boolean => memory.get('collapsed') ?? true,
    memory,
  );

  const show = () => {
    setState(() => {
      memory.set('collapsed', true);
      return true;
    });
  };
  const hide = () => {
    setState(() => {
      memory.set('collapsed', false);
      return false;
    });
  };

  const toggle = () => {
    setState((current) => {
      memory.set('collapsed', !current);
      return !current;
    });
  };

  const theme = useTheme();
  const createStyle = useCreateStyle();

  const container = useConditionalMemo(() => createStyle({
    fontFamily: 'monospace',
    cursor: 'default',
    backgroundColor: theme.base00,
    position: 'relative',
  }), theme);

  const clickable = useConstant(() => createStyle({
    cursor: 'pointer',
  }));

  return (
    <TagRendererContainer withParent={parent != null}>
      <div className={container}>
        <span
          className={clickable}
          role="button"
          aria-expanded={state}
          tabIndex={-1}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              show();
            }
            if (e.key === 'Escape') {
              hide();
            }
          }}
        >
          {
            parent && name != null && (
              <Key
                type={parent}
                value={name}
              />
            )
          }
          <Meta value={value} expanded={state} />
        </span>
        {
          state && Expand
            ? <Expand value={value} expanded={state} />
            : <></>
        }
      </div>
    </TagRendererContainer>
  );
}

interface TagRendererProps {
  parent: 'array' | 'object' | undefined;
  name: string | number | undefined;
  tag: string;
  value: any;
}

export function TagRenderer(
  {
    name, tag, value, parent,
  }: TagRendererProps,
): JSX.Element {
  const currentTag = TAGS.get(tag);

  if (currentTag) {
    return (
      <TreeCache name={`${name ?? 'root'}`}>
        <TagRendererInternal
          parent={parent}
          tag={currentTag}
          name={name}
          value={value}
        />
      </TreeCache>
    );
  }

  return <></>;
}
