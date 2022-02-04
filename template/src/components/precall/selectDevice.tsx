/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more 
 information visit https://appbuilder.agora.io. 
*********************************************
*/

import React, { useContext } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native'
import ColorContext from '../ColorContext';
import TextInput from '../../atoms/TextInput';
import PrimaryButton from '../../atoms/PrimaryButton';
import SelectDevice from '../../subComponents/SelectDevice';
import PreCallContext from './PreCallContext';

const selectDevice: React.FC = () => {
  const { title, username, setUsername, queryComplete, setCallActive } = useContext(PreCallContext)
  const { primaryColor } = useContext(ColorContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: $config.SECONDARY_FONT_COLOR + '25',
        marginLeft: 50,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: $config.PRIMARY_COLOR,
        height: '70%',
        minHeight: 340,
        minWidth: 380,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: '10%',
      }}>
      <Text style={[style.titleHeading, { color: $config.PRIMARY_COLOR }]}>
        {title}
      </Text>
      <View style={{ height: 20 }} />
      <View style={[{ shadowColor: primaryColor }, style.precallPickers]}>
        {/* <View style={{flex: 1}}> */}
        <Text
          style={[style.subHeading, { color: $config.PRIMARY_FONT_COLOR }]}>
          Select Input Device
        </Text>
        {/* </View> */}
        <View style={{ height: 20 }} />
        <View
          style={{
            flex: 1,
            maxWidth: Platform.OS === 'web' ? '25vw' : 'auto',
          }}>
          <SelectDevice />
        </View>
        <View
          style={{
            flex: 1,
            width: 350,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <TextInput
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
            onSubmitEditing={() => { }}
            placeholder={
              queryComplete ? 'Display name*' : 'Getting name...'
            }
            editable={queryComplete}
          />
          <View style={{ height: 20 }} />
          <PrimaryButton
            onPress={() => setCallActive(true)}
            disabled={!queryComplete || username.trim() === ''}
            text={queryComplete ? 'Join Room' : 'Loading...'}
          />
        </View>
      </View>
    </View>
  )
}

export default selectDevice;

const style = StyleSheet.create({
  titleHeading: {
    fontSize: 28,
    fontWeight: '700',
    color: $config.SECONDARY_FONT_COLOR,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: $config.SECONDARY_FONT_COLOR,
  },
  precallPickers: {
    alignItems: 'center',
    alignSelf: 'center',
    // alignContent: 'space-around',
    justifyContent: 'space-around',
    // flex: 1,
    marginBottom: '10%',
    height: '35%',
    minHeight: 280,
  }
})
