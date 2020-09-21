import React, {useState, useContext, useEffect} from 'react';
import {View, Platform, StyleSheet, Text} from 'react-native';
import RtcConfigure from '../../agora-rn-uikit/src/RTCConfigure';
import {PropsProvider} from '../../agora-rn-uikit/src/PropsContext';
import Navbar from '../components/Navbar';
import Precall from '../components/Precall';
import ParticipantsView from '../components/ParticipantsView';
import PinnedVideo from '../components/PinnedVideo';
import Controls from '../components/Controls';
import GridVideo from '../components/GridVideo';
import styles from '../components/styles';
import {useParams, useHistory} from '../components/Router';
import Chat from '../components/Chat';
import RtmConfigure from '../components/RTMConfigure';
import DeviceConfigure from '../components/DeviceConfigure';
import {gql, useQuery} from '@apollo/client';
import Watermark from '../subComponents/Watermark';
import StorageContext from '../components/StorageContext';

const JOIN_CHANNEL_PHRASE_AND_GET_USER = gql`
  query JoinChannel($passphrase: String!) {
    joinChannel(passphrase: $passphrase) {
      channel
      title
      isHost
      mainUser {
        rtc
        rtm
        uid
      }
      screenShare {
        rtc
        rtm
        uid
      }
    }
    getUser {
      name
      email
    }
  }
`;

const JOIN_CHANNEL_PHRASE = gql`
  query JoinChannel($passphrase: String!) {
    joinChannel(passphrase: $passphrase) {
      channel
      title
      isHost
      mainUser {
        rtc
        rtm
        uid
      }
      screenShare {
        rtc
        rtm
        uid
      }
    }
  }
`;

const VideoCall: React.FC = () => {
  const {store} = useContext(StorageContext);
  const [username, setUsername] = useState('Getting name...');
  const [participantsView, setParticipantsView] = useState(false);
  const [callActive, setCallActive] = useState($config.precall ? false : true);
  const [layout, setLayout] = useState(false);
  const [recordingActive, setRecordingActive] = useState(false);
  const [chatDisplayed, setChatDisplayed] = useState(false);
  const [queryComplete, setQueryComplete] = useState(false);
  const {phrase} = useParams();
  let isHost = true; //change to false by default after testing
  let title = null;
  let rtcProps = {
    appId: 'b8c2ef0f986541a8992451c07d30fb4b',
    channel: null,
    uid: null,
    token: null,
    rtm: null,
    screenShareUid: null,
    screenShareToken: null,
    dual: true,
  };
  let data, loading, error;

  ({data, loading, error} = useQuery(
    store.token === null
      ? JOIN_CHANNEL_PHRASE
      : JOIN_CHANNEL_PHRASE_AND_GET_USER,
    {
      variables: {passphrase: phrase},
  }));

  if (!loading && data) {
    console.log('token:', rtcProps.token);
    rtcProps = {
      appId: 'b8c2ef0f986541a8992451c07d30fb4b',
      channel: data.joinChannel.channel,
      uid: data.joinChannel.mainUser.uid,
      token: data.joinChannel.mainUser.rtc,
      rtm: data.joinChannel.mainUser.rtm,
      dual: true,
      screenShareUid: data.joinChannel.screenShare.uid,
      screenShareToken: data.joinChannel.screenShare.rtc,
    };
    isHost = data.joinChannel.isHost;
    title = data.joinChannel.title;
    console.log('query done: ', data, queryComplete);
    console.log('!!!', title);
    if (username === 'Getting name...') {
      if (data.getUser){
        setUsername(data.getUser.name);
      } else {
        setUsername('');
      }
    }
    console.log('token:', rtcProps.token);
    queryComplete ? {} : setQueryComplete(true);
  }

  const history = useHistory();
  const callbacks = {
    EndCall: () => history.push('/'),
  };

  return (
    <>
      {queryComplete || !callActive ? (
        <>
          {$config.watermark && callActive ? <Watermark /> : <></>}
          <PropsProvider
            value={{
              rtcProps,
              callbacks,
              styleProps,
            }}>
            <RtcConfigure callActive={callActive}>
              <DeviceConfigure>
                <RtmConfigure
                  setRecordingActive={setRecordingActive}
                  name={username}
                  callActive={callActive}>
                  {callActive ? (
                    <View style={style.full}>
                      <Navbar
                        participantsView={participantsView}
                        setParticipantsView={setParticipantsView}
                        chatDisplayed={chatDisplayed}
                        setChatDisplayed={setChatDisplayed}
                        layout={layout}
                        setLayout={setLayout}
                        recordingActive={recordingActive}
                        setRecordingActive={setRecordingActive}
                        isHost={isHost}
                        title={title}
                      />
                      <View style={style.videoView}>
                        {participantsView ? (
                          <ParticipantsView isHost={isHost} />
                        ) : (
                          <></>
                        )}
                        {layout ? <PinnedVideo /> : <GridVideo />}
                      </View>
                      <Controls
                        recordingActive={recordingActive}
                        setRecordingActive={setRecordingActive}
                        chatDisplayed={chatDisplayed}
                        setChatDisplayed={setChatDisplayed}
                        isHost={isHost}
                      />
                      {chatDisplayed ? (
                        $config.chat ? (
                          <Chat setChatDisplayed={setChatDisplayed} />
                        ) : (
                          <></>
                        )
                      ) : (
                        <></>
                      )}
                    </View>
                  ) : $config.precall ? (
                    <Precall
                      username={username}
                      setUsername={setUsername}
                      setCallActive={setCallActive}
                      queryComplete={queryComplete}
                    />
                  ) : (
                    <></>
                  )}
                </RtmConfigure>
              </DeviceConfigure>
            </RtcConfigure>
          </PropsProvider>
        </>
      ) : (
        <>
          <Text>Loading...</Text>
        </>
      )}
    </>
  );
};

const styleProps = {
  maxViewStyles: styles.temp,
  minViewStyles: styles.temp,
  localBtnContainer: styles.bottomBar,
  localBtnStyles: {
    muteLocalAudio: styles.localButton,
    muteLocalVideo: styles.localButton,
    switchCamera: styles.localButton,
    endCall: styles.endCall,
    fullScreen: styles.localButton,
    recording: styles.localButton,
    screenshare: styles.localButton,
  },
  theme: $config.primaryColor,
  remoteBtnStyles: {
    muteRemoteAudio: styles.remoteButton,
    muteRemoteVideo: styles.remoteButton,
    remoteSwap: styles.remoteButton,
    minCloseBtnStyles: styles.minCloseBtn,
  },
  BtnStyles: styles.remoteButton,
};
//change these to inline styles or sth
const style = StyleSheet.create({
  full: {
    flex: 1,
  },
  videoView: {
    flex: 12,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
});

export default VideoCall;
