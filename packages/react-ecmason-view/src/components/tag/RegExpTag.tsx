import { useMemoCondition } from '@lyonph/react-hooks';
import React from 'react';
import DataTypeLabel from '../DataTypeLabel';
import { registerTag, TagProps } from '../TagRenderer';
import { useTheme, useCreateStyle } from '../ThemeProvider';

registerTag(
  'REGEXP',
  ({ value }: TagProps<[string, string]>) => {
    const theme = useTheme();
    const createStyle = useCreateStyle();

    const style = useMemoCondition(() => createStyle({
      display: 'inline-block',
      color: theme.base0C,
    }), theme);

    return (
      <div className={style}>
        <DataTypeLabel type="regexp" />
        {`/${value[0]}/${value[1]}`}
      </div>
    );
  },
);
