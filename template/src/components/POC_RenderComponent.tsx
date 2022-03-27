import {MaxVideoRenderer} from './POC_VideoRenderer';

export type RenderComponentType = {[key: string]: React.FC<any>};

const RenderComponent: RenderComponentType = {
  rtc: MaxVideoRenderer,
};

export default RenderComponent;
