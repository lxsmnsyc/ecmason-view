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
