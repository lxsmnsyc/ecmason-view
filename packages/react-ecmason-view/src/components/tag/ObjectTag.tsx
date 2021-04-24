import { ECMASon, RecursiveRef } from 'ecmason';
import React from 'react';
import ContentContainer from '../ContentContainer';
import MetaInfo from '../MetaInfo';
import Brace from '../symbols/Brace';
import { registerTag, TagProps, TagRenderer } from '../TagRenderer';

registerTag(
  'RECURSIVE(OBJECT)',
  ({ value, expanded }: TagProps<RecursiveRef<Record<string, ECMASon<any>>> | number>) => (
    <MetaInfo
      value={value}
      expanded={expanded}
      type="object"
    />
  ),
  ({ value, expanded }) => {
    if (typeof value === 'number') {
      return <></>;
    }
    if (typeof value.value === 'object') {
      if (!expanded || Object.keys(value.value).length === 0) {
        return <></>;
      }
      return (
        <>
          <ContentContainer>
            {
              Object.entries(value.value).map(([key, val]) => (
                <TagRenderer
                  key={key}
                  parent="object"
                  name={key}
                  tag={val.tag}
                  value={val.value}
                />
              ))
            }
          </ContentContainer>
          <Brace value="}" indent />
        </>
      );
    }
    return <></>;
  },
);
