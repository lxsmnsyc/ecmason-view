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
import { useForceUpdate, useMemoCondition } from '@lyonph/react-hooks';
import React, { ReactNode } from 'react';

import {
  createPropsSelectorModel, createSelector, createValue, useScopedModelExists,
} from 'react-scoped-model';

interface TreeCacheContextProps {
  name: string;
  memory: Map<string, any>;
  forceUpdate: () => void;
}

const TreeCacheContext = createPropsSelectorModel<TreeCacheContextProps>({
  displayName: 'ReactECMASonView.TreeCacheContext',
});

export const useTreeCache = createValue(TreeCacheContext);

export const useTreeMemory = createSelector(
  TreeCacheContext,
  (state) => state.memory,
);

export const useTreeForceUpdate = createSelector(
  TreeCacheContext,
  (state) => state.forceUpdate,
);

interface TreeCacheProps {
  name: string;
  children: ReactNode;
}

function RootTreeCache(
  { name, children }: TreeCacheProps,
) {
  const memory = useMemoCondition(() => new Map<string, any>(), name);
  const forceUpdate = useForceUpdate();

  return (
    <TreeCacheContext.Provider
      name={name}
      memory={memory}
      forceUpdate={forceUpdate}
    >
      { children }
    </TreeCacheContext.Provider>
  );
}

function ChildTreeCache(
  { name, children }: TreeCacheProps,
) {
  const parent = useTreeCache();

  const memory = useMemoCondition(() => {
    const cached = parent.memory.get(name);

    if (cached) {
      return cached;
    }

    const newMemory = new Map<string, any>();
    parent.memory.set(name, newMemory);
    return newMemory;
  }, name);

  const forceUpdate = useForceUpdate();

  return (
    <TreeCacheContext.Provider
      name={name}
      memory={memory}
      forceUpdate={forceUpdate}
    >
      { children }
    </TreeCacheContext.Provider>
  );
}

export default function TreeCache(
  { name, children }: TreeCacheProps,
): JSX.Element {
  const exists = useScopedModelExists(TreeCacheContext);

  if (exists) {
    return (
      <ChildTreeCache name={name}>
        { children }
      </ChildTreeCache>
    );
  }

  return (
    <RootTreeCache name={name}>
      { children }
    </RootTreeCache>
  );
}
