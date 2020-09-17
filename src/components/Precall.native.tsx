import React, {useContext} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import MaxUidContext from '../../agora-rn-uikit/src/MaxUidContext';
import {MaxVideoView} from '../../agora-rn-uikit/Components';
import {
  LocalAudioMute,
  LocalVideoMute,
  SwitchCamera,
} from '../../agora-rn-uikit/Components';
import LocalUserContext from '../../agora-rn-uikit/src/LocalUserContext';
import RtcContext from '../../agora-rn-uikit/src/RtcContext';
import images from '../assets/images';
import ColorContext from '../components/ColorContext';

const Precall = (props: any) => {
  const {primaryColor} = useContext(ColorContext);
  const maxUsers = useContext(MaxUidContext);
  const rtc = useContext(RtcContext);
  rtc.RtcEngine.startPreview();
  const {setCallActive, queryComplete} = props;
  return (
    <ImageBackground
      source={{uri: images.background}}
      style={style.full}
      resizeMode={'cover'}>
      <View style={style.heading}>
        <Text style={style.headingText}>Precall </Text>
      </View>
      <View style={style.full}>
        <MaxVideoView user={maxUsers[0]} key={maxUsers[0].uid} />
      </View>
      <View style={style.controls}>
        <LocalUserContext>
          <LocalVideoMute />
          <View style={style.width50} />
          <LocalAudioMute />
          <View style={style.width50} />
          <SwitchCamera />
        </LocalUserContext>
      </View>
      <TouchableOpacity
        onPress={() => setCallActive(true)}
        disabled={!queryComplete}
        style={
          queryComplete
            ? [style.buttonActive, {backgroundColor: primaryColor}]
            : [style.buttonDisabled, {backgroundColor: primaryColor}]
        }>
        <Text style={style.buttonText}>
          {queryComplete ? 'Join Room' : 'Loading...'}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  full: {flex: 1},
  heading: {flex: 0.1, justifyContent: 'center'},
  headingText: {
    fontSize: 24,
    color: '#333',
    fontWeight: '700',
    alignSelf: 'center',
  },
  controls: {flex: 0.2, flexDirection: 'row', alignSelf: 'center', padding: 10},
  width50: {width: 50},
  buttonActive: {
    backgroundColor: '#099DFD',
    height: 50,
    width: 180,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  buttonDisabled: {
    backgroundColor: '#099DFD80',
    height: 50,
    width: 180,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  buttonText: {
    width: '100%',
    height: 45,
    lineHeight: 45,
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
  },
});

export default Precall;
