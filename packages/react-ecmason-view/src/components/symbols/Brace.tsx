import { useMemoCondition } from '@lyonph/react-hooks';
import React from 'react';
import { useCreateStyle, useTheme } from '../ThemeProvider';

interface BraceProps {
  value: '[' | ']' | '{' | '}';
  indent: boolean;
}

export default function Brace({ value, indent }: BraceProps): JSX.Element {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useMemoCondition(() => createStyle({
    display: 'inline-block',
    color: theme.base05,
    fontWeight: 'bold',
    cursor: 'pointer',
    paddingLeft: indent ? '3px' : '0px',
  }), {
    theme,
    indent,
  }, (prev, next) => (
    !Object.is(prev.theme, next.theme)
    && !Object.is(prev.indent, next.indent)
  ));

  return (
    <span className={style}>{value}</span>
  );
}
