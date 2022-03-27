import React, {useContext} from 'react';
import {MinUidContext, MaxUidContext} from '../../agora-rn-uikit';
import RenderComponent from './POC_RenderComponent';
// import Layout from '../subComponents/LayoutEnum';
import {useFpe, VideoCallInterface} from 'fpe-api';

const VideoArrayRenderer = ({
  // activeLayout,
  children,
}: {
  //activeLayout: Layout;
  children: any;
}) => {
  const max = useContext(MaxUidContext);
  const min = useContext(MinUidContext);
  const FpeRenderComponent = useFpe((config) => {
    const videocall = config.components?.videoCall as VideoCallInterface;
    return videocall.renderComponentObject;
  });

  const minArray = min.map((user, index) => {
    const Comp = FpeRenderComponent
      ? FpeRenderComponent[user.type]
      : RenderComponent[user.type];
    return <Comp user={user} isMax={false} index={index} />;
  });

  const maxArray = max.map((user, index) => {
    const Comp = FpeRenderComponent
      ? FpeRenderComponent[user.type]
      : RenderComponent[user.type];
    return <Comp user={user} isMax={false} index={index} />;
  });

  const videoArray = [...max, ...min].map((user, index) => {
    const Comp = FpeRenderComponent
      ? FpeRenderComponent[user.type]
      : RenderComponent[user.type];
    return <Comp user={user} isMax={index === 0} index={index} />;
  });

  return <>{children(minArray, maxArray, videoArray)}</>;
};

export default VideoArrayRenderer;
