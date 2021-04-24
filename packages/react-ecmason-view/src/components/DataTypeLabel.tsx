import { useConstant } from '@lyonph/react-hooks';
import React from 'react';
import { useCreateStyle, useDisplayDataTypes } from './ThemeProvider';

interface DataTypeLabelProps {
  type: string;
}

export default function DataTypeLabel({ type }: DataTypeLabelProps): JSX.Element {
  const createStyle = useCreateStyle();

  const style = useConstant(() => createStyle({
    fontSize: '11px',
    marginRight: '4px',
    opacity: '0.8',
  }));

  const displayDataTypes = useDisplayDataTypes();

  if (displayDataTypes) {
    return (
      <span className={style}>
        {type}
      </span>
    );
  }

  return <></>;
}
