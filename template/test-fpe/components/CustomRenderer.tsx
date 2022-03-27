import React from 'react';
import {UidInterface} from '../../agora-rn-uikit';
import {MaxVideoRenderer} from '../../src/components/POC_VideoRenderer';
import Layout from '../../src/subComponents/LayoutEnum';
import WhiteboardRenderer from './WhiteboardRenderer';

export type RenderComponentType = (
  data: UidInterface,
  index: number,
  isMax: boolean,
  activeLayout: Layout,
) => Element | undefined | JSX.Element;

const RenderComponent: RenderComponentType = (
  data,
  index,
  isMax,
  activeLayout,
) => {
  switch (data.type) {
    case 'rtc':
      return (
        <MaxVideoRenderer
          user={data}
          key={`maxVideo${index}`}
          isMax={isMax}
          index={index}
        />
      );
    case 'whiteboard':
      return (
        <WhiteboardRenderer
          user={data}
          key={`maxVideo${index}`}
          isMax={isMax}
          index={index}
        />
      );
  }
};

export default RenderComponent;
