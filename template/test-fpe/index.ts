import {useEffect} from 'react';
import {installFPE} from 'fpe-api/install';
import {MaxVideoRenderer} from '../src/components/POC_VideoRenderer';
import WhiteboardRenderer from './components/WhiteboardRenderer';
import {useRtcContext, renderComponentInterface} from 'fpe-api';
import TopPinnedVideo from './components/TopPinnedLayout';
import {UidStateInterface, UidInterface, ToggleState} from 'agora-rn-uikit/src';
import { UserUidInterface } from 'agora-rn-uikit/src/Contexts/PropsContext';

interface whiteboardInterface extends UserUidInterface<'whiteboard'> {
  type: 'rtc';
  name: string;
  enabled: boolean;
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
  // export type UidInterface = UidInterface | whiteboardInterface;
  export interface UidInterface {
    name: string,
    enabled: boolean,
  }
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
      customLayout: (layouts) => {
        return [
          ...layouts,
          {
            name: 'topPinned',
            component: TopPinnedVideo,
          },
        ];
      },
    },
  },
  poc: {
    useUserContext: () => {
      const {setUidArray} = useRtcContext();
      useEffect(() => {
        setUidArray((uidState) => {
          if (
            uidState.min.filter((e) => e.type === 'whiteboard' && e.enabled)
              .length > 0 ||
            uidState.max[0].type === 'whiteboard'
          ) {
            return uidState;
          } else {
            const whiteboardItem: whiteboardInterface = {
              type: 'rtc',
              name: 'test',
              enabled: true,
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
