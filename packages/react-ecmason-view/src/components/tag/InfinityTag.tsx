import { useMemoCondition } from '@lyonph/react-hooks';
import React from 'react';
import { registerTag } from '../TagRenderer';
import { useCreateStyle, useTheme } from '../ThemeProvider';

registerTag(
  'INF',
  () => {
    const theme = useTheme();
    const createStyle = useCreateStyle();

    const style = useMemoCondition(() => createStyle({
      display: 'inline-block',
      color: theme.base08,
      fontWeight: 'bold',
    }), theme);

    return (
      <div className={style}>
        Infinity
      </div>
    );
  },
);

registerTag(
  '-INF',
  () => {
    const theme = useTheme();
    const createStyle = useCreateStyle();

    const style = useMemoCondition(() => createStyle({
      display: 'inline-block',
      color: theme.base08,
      fontWeight: 'bold',
    }), theme);

    return (
      <div className={style}>
        -Infinity
      </div>
    );
  },
);
