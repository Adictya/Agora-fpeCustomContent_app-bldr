import React, {useContext} from 'react';
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
  const FpeRenderComponentent = useFpe(
    (config) => config.components?.videoCall?.renderComponent,
  );

  const minArray = min.map((user, i) =>
    FpeRenderComponentent
      ? FpeRenderComponentent(user, i, false, activeLayout)
      : RenderComponent(user, i, false, activeLayout),
  );

  const maxArray = max.map((user, i) =>
    FpeRenderComponentent
      ? FpeRenderComponentent(user, i, true, activeLayout)
      : RenderComponent(user, i, true, activeLayout),
  );

  const videoArray = [...max, ...min].map((user, i) =>
    FpeRenderComponentent
      ? FpeRenderComponentent(user, i, i === 0 ? true : false, activeLayout)
      : RenderComponent(user, i, i === 0 ? true : false, activeLayout),
  );

  return <>{children(minArray, maxArray, videoArray)}</>;
};

export default VideoArrayRenderer;
