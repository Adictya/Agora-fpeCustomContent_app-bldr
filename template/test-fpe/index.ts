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
          console.log('min', uidState.min);
          return {
            ...uidState,
            min: [...uidState.min, {type: 'whiteboard', name: 'hii2'}],
          };
        });
      }, []);
    },
  },
});

export default config;
