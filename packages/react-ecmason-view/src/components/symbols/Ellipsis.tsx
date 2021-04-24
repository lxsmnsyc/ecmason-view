import { useMemoCondition } from '@lyonph/react-hooks';
import React from 'react';
import { useCreateStyle, useTheme } from '../ThemeProvider';

export default function Ellipsis(): JSX.Element {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useMemoCondition(() => createStyle({
    display: 'inline-block',
    color: theme.base09,
    fontSize: '18px',
    lineHeight: '10px',
    cursor: 'pointer',
  }), theme);

  return (
    <span className={style}>…</span>
  );
}
