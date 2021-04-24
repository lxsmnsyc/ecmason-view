import { useMemoCondition } from '@lyonph/react-hooks';
import React from 'react';
import DataTypeLabel from '../DataTypeLabel';
import { registerTag } from '../TagRenderer';
import { useCreateStyle, useTheme } from '../ThemeProvider';

registerTag(
  '+0',
  () => {
    const theme = useTheme();
    const createStyle = useCreateStyle();

    const style = useMemoCondition(() => createStyle({
      display: 'inline-block',
      color: theme.base09,
    }), theme);

    return (
      <div className={style}>
        <DataTypeLabel type="number" />
        0
      </div>
    );
  },
);

registerTag(
  '-0',
  () => {
    const theme = useTheme();
    const createStyle = useCreateStyle();

    const style = useMemoCondition(() => createStyle({
      display: 'inline-block',
      color: theme.base09,
    }), theme);

    return (
      <div className={style}>
        <DataTypeLabel type="number" />
        -0
      </div>
    );
  },
);
