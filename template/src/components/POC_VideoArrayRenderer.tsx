import React, {useContext, useEffect} from 'react';
import {MinUidContext, MaxUidContext} from '../../agora-rn-uikit';
import RenderComponent from './POC_RenderComponent';
import Layout from '../subComponents/LayoutEnum';
import {useFpe} from 'fpe-api';

const VideoArrayRenderer = ({
  activeLayout,
  children,
}: {
  activeLayout: Layout;
  children: any;
}) => {
  const max = useContext(MaxUidContext);
  const min = useContext(MinUidContext);
  const FpeRenderComponent = useFpe(
    (config) => config.components?.videoCall?.renderComponentObject,
  );

  const minArray = min.map((user, index) =>
    FpeRenderComponent
      ? React.createElement(FpeRenderComponent[user.type], {
          user,
          index,
          isMax: false,
        })
      : React.createElement(RenderComponent[user.type], {
          user,
          index,
          isMax: false,
        }),
  );

  const maxArray = max.map((user, index) =>
    FpeRenderComponent
      ? React.createElement(FpeRenderComponent[user.type], {
          user,
          index,
          isMax: true,
        })
      : React.createElement(RenderComponent[user.type], {
          user,
          index,
          isMax: true,
        }),
  );

  const videoArray = [...max, ...min].map((user, index) =>
    FpeRenderComponent
      ? React.createElement(FpeRenderComponent[user.type], {
          user,
          index,
          isMax: index == 0,
        })
      : React.createElement(RenderComponent[user.type], {
          user,
          index,
          isMax: index == 0,
        }),
  );

  return <>{children(minArray, maxArray, videoArray)}</>;
};

export default VideoArrayRenderer;
