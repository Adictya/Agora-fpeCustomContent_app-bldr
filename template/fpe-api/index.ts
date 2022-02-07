import React from 'react';
import { DEFAULT_ROUTES, CustomRoutesInterface } from './route/defaultRoutes';

/**
 * Importing components
 */
import { PreCallScreen, PreCallLocalMute, PreCallVideoPreview ,
  PreCallLocalAudioMute, PreCallLocalVideoMute, PreCallLogo,
  PreCallSetName,PreCallSelectDevice
} from "../src/components/precall/index";


import ROUTE_KEY from './route/keys';

interface ChatCmpInterface {
  chatBubble?: React.FC<{}>;
  chatInput?: React.FC<{}>;
}
interface VideoLayoutInterface {
  name: string;
  icons?: string[];
  component: React.FC<{}>;
}

interface VideoCallScreenInterface {
  chat?: React.FC<{}> | ChatCmpInterface;
  participants?: React.FC<{}>;
  settings?: React.FC<{}>;
  topBar?: React.FC<{}>;
  bottomBar?: React.FC<{}>;
  videoLayout?: VideoLayoutInterface[];
}

interface VideoAudioMuteInterface{
  audioMute?: React.FC<{}>;
  videoMute?: React.FC<{}>;
}
// export interface PrecallScreenInterface {
//   videoPreview?: React.FC<{}>;
//   videoAudioMute?: React.FC<{}> | VideoAudioMuteInterface
//   cameraSelector?: React.FC<{}>;
//   micSelector?: React.FC<{}>;
//   nameInput?: React.FC<{}>;
//   joinCallButton?: React.FC<{}>;
// }
export interface ComponentsInterface {
  createMeetingScreen?: React.FC<{}>;
  joinMeetingScreen?: React.FC<{}>;
  shareMeetingLinks?: React.FC<{}>;
  PreCallScreen?: React.FC<{}>;
  videoCallScreen?: VideoCallScreenInterface | React.FC<{}>;
}

interface MessageCallBack {
  notify?: () => void;
}
interface SubcomponentsInterface{
  PreCallVideoPreview?: React.FC<{}>;
  PreCallLocalMute?: React.FC<{}>;
  PreCallLocalAudioMute?: React.FC<{}>;
  PreCallLocalVideoMute?: React.FC<{}>;
  PreCallLogo?: React.FC<{}>;
  PreCallSetName?: React.FC<{}>;
  PreCallSelectDevice?: React.FC<{}>;
}
export interface FpeApiInterface {
  /**
   * components used to replace whole screen
   */
  components?: ComponentsInterface;
  /**
   * subcomponents used to replace part of screen or component
   */
  subcomponents?: SubcomponentsInterface,
  /**
   * custom routes used to add new page/routes
   */
  custom_routes?: CustomRoutesInterface[];
  /**
   * message callback used to listen for incoming message from private or public 
   */
  message_callback?: MessageCallBack;
}

let subcomponents:SubcomponentsInterface = {
  PreCallVideoPreview: PreCallVideoPreview,
  PreCallLogo: PreCallLogo,
  PreCallLocalAudioMute: PreCallLocalAudioMute,
  PreCallLocalVideoMute: PreCallLocalVideoMute,
  PreCallLocalMute: PreCallLocalMute,
  PreCallSetName: PreCallSetName,
  PreCallSelectDevice: PreCallSelectDevice
}

let components: ComponentsInterface = {
  PreCallScreen: PreCallScreen
}

let FpeApiConfig: FpeApiInterface = {
  components: components,
  subcomponents: subcomponents
};
 
const getFpeSubCmpConfig = (): SubcomponentsInterface => {
  return FpeApiConfig?.subcomponents ? FpeApiConfig.subcomponents : subcomponents
} 
const getFpeCmpConfig = (): ComponentsInterface => {
  return FpeApiConfig?.components ? FpeApiConfig.components : components
} 
const getFpeCustomRoutes = (): CustomRoutesInterface[] => {
  return FpeApiConfig?.custom_routes ? FpeApiConfig.custom_routes : []
}

const getFpeConfig = (key:string) => {
  if(key){
    return FpeApiConfig[key]
  }
  return FpeApiConfig
};

const installComponents = (components?: ComponentsInterface) => {
  let temp = {...FpeApiConfig.components}
  if(components?.PreCallScreen){
    temp = {
      ...temp,
      PreCallScreen: components?.PreCallScreen
    }
  }
  FpeApiConfig.components = temp
}

const installSubComponents = (subcomponents?: SubcomponentsInterface) => {
  let temp = {...FpeApiConfig.subcomponents}
  if(subcomponents?.PreCallVideoPreview){
    temp = {
      ...temp,
      PreCallVideoPreview: subcomponents?.PreCallVideoPreview
    }
  }
  FpeApiConfig.subcomponents = temp

}

const installCustomRoutes = (custom_routes:any) => {
  FpeApiConfig.custom_routes = custom_routes?.concat(DEFAULT_ROUTES)
}

const installFPE = (config: FpeApiInterface) => {
  installComponents(config?.components)
  installSubComponents(config?.subcomponents)
  installCustomRoutes(config?.custom_routes)
  return FpeApiConfig
};

export {installFPE, getFpeConfig, ROUTE_KEY, getFpeSubCmpConfig, getFpeCmpConfig, getFpeCustomRoutes, type CustomRoutesInterface};
