import { useMemoCondition } from '@lyonph/react-hooks';
import React from 'react';
import DataTypeLabel from '../DataTypeLabel';
import { registerTag, TagProps } from '../TagRenderer';
import Ellipsis from '../symbols/Ellipsis';
import { useTheme, useCreateStyle, useCollapseStringAfterLength } from '../ThemeProvider';

function NumberRenderer({ value }: TagProps<number>): JSX.Element {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useMemoCondition(() => createStyle({
    display: 'inline-block',
    color: theme.base09,
  }), theme);

  return (
    <div className={style}>
      <DataTypeLabel type="number" />
      { value }
    </div>
  );
}

function BooleanRenderer({ value }: TagProps<boolean>): JSX.Element {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useMemoCondition(() => createStyle({
    display: 'inline-block',
    color: theme.base09,
  }), theme);

  return (
    <div className={style}>
      <DataTypeLabel type="boolean" />
      { value ? 'true' : 'false' }
    </div>
  );
}

function NullRenderer(): JSX.Element {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useMemoCondition(() => createStyle({
    display: 'inline-block',
    color: theme.base08,
    fontWeight: 'bold',
  }), theme);

  return (
    <div className={style}>
      null
    </div>
  );
}

function CollapsibleString({ value, expanded }: TagProps<string>): JSX.Element {
  const collapseStringAfterLength = useCollapseStringAfterLength();

  return (
    <span>
      &quot;
      {
        (expanded || collapseStringAfterLength == null)
          ? value
          : (
            <>
              {value.substring(0, collapseStringAfterLength)}
              <Ellipsis />
            </>
          )
      }
      &quot;
    </span>
  );
}

function StringRenderer({ value, expanded }: TagProps<string>) {
  const theme = useTheme();
  const createStyle = useCreateStyle();

  const style = useMemoCondition(() => createStyle({
    display: 'inline-block',
    color: theme.base0B,
  }), theme);

  return (
    <div className={style}>
      <DataTypeLabel type="string" />
      <CollapsibleString value={value} expanded={expanded} />
    </div>
  );
}

registerTag(
  'PRIMITIVE',
  ({ value, expanded }: TagProps<string | number | boolean | null>) => {
    if (typeof value === 'number') {
      return <NumberRenderer value={value} expanded={expanded} />;
    }
    if (typeof value === 'boolean') {
      return <BooleanRenderer value={value} expanded={expanded} />;
    }
    if (typeof value === 'string') {
      return <StringRenderer value={value} expanded={expanded} />;
    }
    if (value === null) {
      return <NullRenderer />;
    }
    return <></>;
  },
);
