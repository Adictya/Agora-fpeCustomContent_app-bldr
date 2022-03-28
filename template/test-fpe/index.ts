import {useEffect} from 'react';
import {installFPE} from 'fpe-api/install';
import {MaxVideoRenderer} from '../src/components/POC_VideoRenderer';
import WhiteboardRenderer from './components/WhiteboardRenderer';
import {useRtcContext, renderComponentInterface} from 'fpe-api';
import TopPinnedVideo from './components/TopPinnedLayout';

interface whiteboardInterface {
  type: 'whiteboard';
  name: string;
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
            uidState.min.filter((e) => e.type === 'whiteboard').length > 0 ||
            uidState.max[0].type === 'whiteboard'
          ) {
            return uidState;
          } else {
            const whiteboardItem: whiteboardInterface = {
              type: 'whiteboard',
              name: 'test',
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
