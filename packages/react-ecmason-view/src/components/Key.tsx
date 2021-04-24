import { useMemoCondition } from '@lyonph/react-hooks';
import React from 'react';
import Colon from './symbols/Colon';
import Quote from './symbols/Quote';
import { useCreateStyle, useDisplayArrayKeys, useTheme } from './ThemeProvider';

export interface KeyProps {
  type: 'array' | 'object';
  value: number | string;
}

interface ArrayKeyProps {
  value: number | string;
}

function ArrayKey({ value }: ArrayKeyProps): JSX.Element {
  const displayArrayKeys = useDisplayArrayKeys();
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useMemoCondition(() => createStyle({
    display: 'inline-block',
    color: theme.base09,
    letterSpacing: '0.5px',
    fontStyle: 'none',
    verticalAlign: 'top',
    opacity: '0.85',
    ':hover': {
      opacity: '1',
    },
  }), theme);

  if (displayArrayKeys) {
    return (
      <span className={style}>
        <span>{value}</span>
        <Colon />
      </span>
    );
  }

  return <></>;
}

interface ObjectKeyProps {
  value: number | string;
}

function ObjectKey({ value }: ObjectKeyProps): JSX.Element {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useMemoCondition(() => createStyle({
    display: 'inline-block',
    color: theme.base0B,
    letterSpacing: '0.5px',
    fontStyle: 'none',
    verticalAlign: 'top',
    opacity: '0.85',
    ':hover': {
      opacity: '1',
    },
  }), theme);

  return (
    <span className={style}>
      <Quote />
      <span>{value}</span>
      <Quote />
      <Colon />
    </span>
  );
}

export default function Key({ type, value }: KeyProps): JSX.Element {
  // eslint-disable-next-line react/destructuring-assignment
  if (type === 'array') {
    return <ArrayKey value={value} />;
  }
  return <ObjectKey value={value} />;
}
