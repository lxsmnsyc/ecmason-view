import { useConstant } from '@lyonph/react-hooks';
import React from 'react';
import { useCreateStyle, useQuotesOnKeys } from '../ThemeProvider';

export default function Quote(): JSX.Element {
  const createStyle = useCreateStyle();

  const style = useConstant(() => createStyle({
    verticalAlign: 'top',
  }));

  const quoteOnKeys = useQuotesOnKeys();

  if (quoteOnKeys) {
    return (
      <span className={style}>&quot;</span>
    );
  }

  return <></>;
}
