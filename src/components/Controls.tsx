import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import LocalUserContext from '../../agora-rn-uikit/src/LocalUserContext';
import {
  LocalAudioMute,
  LocalVideoMute,
  Endcall,
} from '../../agora-rn-uikit/Components';
import Recording from '../subComponents/Recording';
import styles from './styles';
import icons from '../assets/icons';
import ScreenshareButton from '../subComponents/ScreenshareButton';
import Settings from '../components/Settings';

export default function Controls(props: any) {
  const [screenshareActive, setScreenshareActive] = useState(false);
  const {
    setRecordingActive,
    recordingActive,
    setChatDisplayed,
    chatDisplayed,
    isHost,
    selectedCam,
    setSelectedCam,
    selectedMic,
    setSelectedMic,
    deviceList,
    setDeviceList,
  } = props;
  return (
    <LocalUserContext>
      <View style={{...styles.bottomBar}}>
        <LocalAudioMute />
        <LocalVideoMute />
        {isHost ? (
          <Recording
            recordingActive={recordingActive}
            setRecordingActive={setRecordingActive}
          />
        ) : (
          <></>
        )}
        <ScreenshareButton
          screenshareActive={screenshareActive}
          setScreenshareActive={setScreenshareActive}
        />
        <TouchableOpacity
          style={styles.localButton}
          onPress={() => {
            setChatDisplayed(!chatDisplayed);
          }}>
          <Image source={{uri: icons.chatIcon}} style={styles.buttonIcon} />
        </TouchableOpacity>
        <Endcall />
        <Settings
          selectedCam={selectedCam}
          setSelectedCam={setSelectedCam}
          selectedMic={selectedMic}
          setSelectedMic={setSelectedMic}
          deviceList={deviceList}
          setDeviceList={setDeviceList}
        />
      </View>
    </LocalUserContext>
  );
}
