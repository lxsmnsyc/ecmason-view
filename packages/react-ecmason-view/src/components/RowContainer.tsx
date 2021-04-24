import { useMemoCondition } from '@lyonph/react-hooks';
import React, { ReactNode } from 'react';
import { useTheme, useCreateStyle, useIndentSize } from './ThemeProvider';

interface RowContainerProps {
  children: ReactNode;
}

export default function RowContainer({ children }: RowContainerProps): JSX.Element {
  const theme = useTheme();
  const createStyle = useCreateStyle();
  const indentSize = useIndentSize();

  const style = useMemoCondition(() => createStyle({
    paddingTop: '3px',
    paddingBottom: '3px',
    paddingRight: '5px',
    paddingLeft: `calc(5px * ${indentSize})`,
    borderLeft: `1px solid ${theme.base01}`,
  }), {
    theme,
    indentSize,
  }, (prev, next) => (
    !Object.is(prev.theme, next.theme)
    && !Object.is(prev.indentSize, next.indentSize)
  ));

  return (
    <div className={style}>
      {children}
    </div>
  );
}
