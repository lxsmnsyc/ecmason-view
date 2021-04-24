import { useMemoCondition } from '@lyonph/react-hooks';
import React from 'react';
import { registerTag } from '../TagRenderer';
import { useTheme, useCreateStyle } from '../ThemeProvider';

registerTag(
  'NAN',
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
        NaN
      </div>
    );
  },
);
