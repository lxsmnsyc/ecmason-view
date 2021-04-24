import { useMemoCondition } from '@lyonph/react-hooks';
import React from 'react';
import { useCreateStyle, useTheme } from './ThemeProvider';

interface ReferenceProps {
  id: number;
}

export default function Reference({ id }: ReferenceProps): JSX.Element {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useMemoCondition(() => createStyle({
    display: 'inline-block',
    fontSize: '11px',
    marginRight: '4px',
    opacity: '0.8',
    fontWeight: 'bold',
    padding: '1px 2px',
    borderRadius: '3px',
    backgroundColor: theme.base02,
  }), theme);

  return (
    <div className={style}>
      {`id: ${id}`}
    </div>
  );
}
