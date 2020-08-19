/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import MaxUidContext from '../../agora-rn-uikit/src/MaxUidContext';
import {MaxVideoView} from '../../agora-rn-uikit/Components';
import {
  LocalAudioMute,
  LocalVideoMute,
  SwitchCamera,
} from '../../agora-rn-uikit/Components';
import LocalUserContext from '../../agora-rn-uikit/src/LocalUserContext';
import RtcContext from '../../agora-rn-uikit/src/RtcContext';
import styles from './styles';

const Precall = (props: any) => {
  const maxUsers = useContext(MaxUidContext);
  const rtc = useContext(RtcContext);
  rtc.RtcEngine.startPreview();
  const {setCallActive, queryComplete} = props;
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.1, justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 24,
            color: '#fff',
            fontWeight: '400',
            alignSelf: 'center',
          }}>
          Precall
        </Text>
      </View>
      <View style={{flex: 1}}>
        <MaxVideoView user={maxUsers[0]} key={maxUsers[0].uid} />
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center', padding: 10}}>
        <LocalUserContext>
          <LocalVideoMute />
          <View style={{width: 50}} />
          <LocalAudioMute />
          <View style={{width: 50}} />
          <SwitchCamera />
        </LocalUserContext>
      </View>
      <TouchableOpacity onPress={() => setCallActive(true)} disabled={!queryComplete}>
        <View
          style={queryComplete ? {
            backgroundColor: '#55aaff',
            height: 50,
            width: 180,
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }: {backgroundColor: '#55aaff',
          height: 50,
          width: 180,
          alignSelf: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          marginBottom: 10, opacity: .3}}>
          <Text style={styles.buttonText}>Join Room</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Precall;
