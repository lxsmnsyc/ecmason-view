import { useMemoCondition } from '@lyonph/react-hooks';
import { serialize } from 'ecmason';
import React from 'react';
import { TagRenderer } from './TagRenderer';
import { ThemeProvider, ThemeProviderProps, useCreateStyle, useTheme } from './ThemeProvider';

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
    overflow: 'scroll-x',
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
