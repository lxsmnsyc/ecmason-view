import { useMemoCondition } from '@lyonph/react-hooks';
import { RecursiveRef } from 'ecmason';
import React from 'react';
import DataTypeLabel from './DataTypeLabel';
import Reference from './Reference';
import Size from './Size';
import Brace from './symbols/Brace';
import Ellipsis from './symbols/Ellipsis';
import { TagProps } from './TagRenderer';
import { useCreateStyle, useTheme } from './ThemeProvider';

interface MetaProps<T> {
  value: T;
  expanded: boolean;
}

function Meta<T>({ value, expanded }: MetaProps<T>): JSX.Element {
  const size = value instanceof Array ? value.length : Object.keys(value).length;

  return (
    <>
      <Size
        value={size}
      />
      <Brace
        value={value instanceof Array ? '[' : '{'}
        indent={false}
      />
      {
        size > 0
          ? (
            !expanded && (
              <>
                <Ellipsis />
                <Brace
                  value={value instanceof Array ? ']' : '}'}
                  indent={false}
                />
              </>
            )
          )
          : (
            <Brace
              value={value instanceof Array ? ']' : '}'}
              indent={false}
            />
          )
      }
    </>
  );
}

type MetaInfoProps<T> = TagProps<RecursiveRef<T> | number> & {
  type: string;
};

export default function MetaInfo<T>(
  { type, value, expanded }: MetaInfoProps<T>,
): JSX.Element {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useMemoCondition(() => createStyle({
    display: 'inline-block',
    color: theme.base0A,
  }), theme);

  return (
    <div className={style}>
      <DataTypeLabel type={type} />
      <Reference id={typeof value === 'number' ? value : value.id} />
      {
        typeof value === 'object' && (
          <Meta
            value={value.value}
            expanded={expanded}
          />
        )
      }
    </div>
  );
}
