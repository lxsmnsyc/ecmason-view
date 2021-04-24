import { ECMASon, RecursiveRef } from 'ecmason';
import React from 'react';
import ContentContainer from '../ContentContainer';
import MetaInfo from '../MetaInfo';
import Brace from '../symbols/Brace';
import { registerTag, TagProps, TagRenderer } from '../TagRenderer';

registerTag(
  'RECURSIVE(SET)',
  ({ value, expanded }: TagProps<RecursiveRef<ECMASon<any>[]> | number>) => (
    <MetaInfo
      value={value}
      expanded={expanded}
      type="Set"
    />
  ),
  ({ value, expanded }) => {
    if (typeof value === 'number') {
      return <></>;
    }
    if (value.value instanceof Array) {
      if (!expanded || value.value.length === 0) {
        return <></>;
      }
      return (
        <>
          <ContentContainer>
            {
              value.value.map((val, key) => (
                <TagRenderer
                  key={key}
                  parent="array"
                  name={key}
                  tag={val.tag}
                  value={val.value}
                />
              ))
            }
          </ContentContainer>
          <Brace value="]" indent />
        </>
      );
    }
    return <></>;
  },
);
