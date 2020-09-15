import React, {useContext} from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import ChatContext, {controlMessageEnum} from '../components/ChatContext';
import icons from '../assets/icons';

const RemoteVideoMute = (props: {
  uid: number;
  video: boolean;
  isHost: boolean;
}) => {
  const {sendControlMessageToUid} = useContext(ChatContext);
  return props.isHost ? (
    <TouchableOpacity
      onPress={() => {
        sendControlMessageToUid(controlMessageEnum.muteVideo, props.uid);
      }}>
      <Image
        style={style.buttonIconCam}
        source={{uri: props.video ? icons.videocam : icons.videocamOff}}
      />
    </TouchableOpacity>
  ) : (
    <View>
      <Image
        style={style.buttonIconCam}
        source={{uri: props.video ? icons.videocam : icons.videocamOff}}
      />
    </View>
  );
};

const style = StyleSheet.create({
  buttonIconCam: {
    width: 25,
    height: 25,
    marginHorizontal: 3,
    tintColor: '#099DFD',
  },
});

export default RemoteVideoMute;
