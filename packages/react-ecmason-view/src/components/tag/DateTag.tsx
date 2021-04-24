import { useMemoCondition } from '@lyonph/react-hooks';
import React from 'react';
import DataTypeLabel from '../DataTypeLabel';
import { registerTag, TagProps } from '../TagRenderer';
import { useTheme, useCreateStyle } from '../ThemeProvider';

registerTag(
  'DATE',
  ({ value }: TagProps<string>) => {
    const theme = useTheme();
    const createStyle = useCreateStyle();

    const style = useMemoCondition(() => createStyle({
      display: 'inline-block',
      color: theme.base0D,
    }), theme);

    return (
      <div className={style}>
        <DataTypeLabel type="date" />
        {value}
      </div>
    );
  },
);
