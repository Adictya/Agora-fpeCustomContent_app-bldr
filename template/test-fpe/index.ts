import {useEffect} from 'react';
import {installFPE} from 'fpe-api/install';
import {MaxVideoRenderer} from '../src/components/POC_VideoRenderer';
import WhiteboardRenderer from './components/WhiteboardRenderer';
import {useRtcContext, renderComponentInterface} from 'fpe-api';
import {
  UidStateInterface,
  UserUidInterface,
  UidInterface,
  ToggleState,
} from 'agora-rn-uikit/src';

interface whiteboardInterface {
  type: 'whiteboard';
  name: string;
}
declare module 'agora-rn-uikit' {
  // interface UidInterface {
  //   type: string,
  //   name: string,
  // }
  // interface UidInterfaceA {}
  // interface UidInterfaceB {
  //   type: 'whiteboard';
  //   name: string;
  // }
  // export type UidInterface = {
  export type UserUidInterface = whiteboardInterface;
  // export type UidInterface = UidInterfaceA | UidInterfaceB;
}

declare module 'fpe-api' {
  interface renderComponentObjectInterface {
    whiteboard: React.FC<renderComponentInterface>;
  }
}

const config = installFPE({
  components: {
    videoCall: {
      renderComponentObject: {
        rtc: MaxVideoRenderer,
        whiteboard: WhiteboardRenderer,
      },
    },
  },
  poc: {
    useUserContext: () => {
      const {setUidArray} = useRtcContext();
      useEffect(() => {
        setUidArray((uidState) => {
          if (
            uidState.min.filter((e) => e.type === 'whiteboard' && e.name).length > 0 ||
            uidState.max[0].type === 'whiteboard'
          ) {
            return uidState;
          } else {
            const whiteboardItem: UidInterface = {
              type: 'whiteboard',
              name: 'test'
            };
            return {
              ...uidState,
              min: [...uidState.min, whiteboardItem],
            };
          }
        });
      }, []);
    },
  },
});

export default config;
