import { useConditionalMemo } from '@lyonph/react-hooks';
import React from 'react';
import { useCreateStyle, useDisplayObjectSize, useTheme } from './ThemeProvider';

interface SizeProps {
  value: number;
}

function SizeInternal({ value }: SizeProps): JSX.Element {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useConditionalMemo(() => createStyle({
    display: 'inline-block',
    fontSize: '11px',
    marginRight: '4px',
    opacity: '0.8',
    color: theme.base05,
    cursor: 'default',
    fontWeight: 'bold',
    padding: '1px 2px',
    borderRadius: '3px',
    backgroundColor: theme.base01,
  }), theme);

  return (
    <div className={style}>
      {`${value} items`}
    </div>
  );
}

export default function Size({ value }: SizeProps): JSX.Element {
  const displayObjectSize = useDisplayObjectSize();

  if (displayObjectSize) {
    return <SizeInternal value={value} />;
  }
  return <></>;
}
