import { useConstant } from '@lyonph/react-hooks';
import React, { ReactNode } from 'react';
import { useCreateStyle } from './ThemeProvider';

interface ContentContainerProps {
  children: ReactNode;
}

export default function ContentContainer({ children }: ContentContainerProps): JSX.Element {
  const createStyle = useCreateStyle();

  const style = useConstant(() => createStyle({
    marginLeft: '6px',
  }));

  return (
    <div className={style}>
      {children}
    </div>
  );
}
