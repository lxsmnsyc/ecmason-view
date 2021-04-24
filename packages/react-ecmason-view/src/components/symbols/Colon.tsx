import { useMemoCondition } from '@lyonph/react-hooks';
import React from 'react';
import { useCreateStyle, useTheme } from '../ThemeProvider';

export default function Colon(): JSX.Element {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useMemoCondition(() => createStyle({
    display: 'inline-block',
    margin: '0px 5px',
    color: theme.base05,
    verticalAlign: 'top',
  }), theme);

  return (
    <span className={style}>:</span>
  );
}
