import {useEffect} from 'react';
import {installFPE} from 'fpe-api/install';
import {MaxVideoRenderer} from '../src/components/POC_VideoRenderer';
import WhiteboardRenderer from './components/WhiteboardRenderer';
import {useRtcContext} from 'fpe-api';

const config = installFPE({
  components: {
    videoCall: {
      renderComponent: {
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
            uidState.min.filter((e) => e.type === 'whiteboard').length > 0 ||
            uidState.max[0].type === 'whiteboard'
          ) {
            return uidState;
          } else {
            return {
              ...uidState,
              min: [...uidState.min, {type: 'whiteboard', name: 'hii2'}],
            };
          }
        });
      }, []);
    },
  },
});

export default config;
