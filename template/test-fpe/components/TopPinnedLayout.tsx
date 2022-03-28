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
import React, {useState, useContext} from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import {RtcContext} from '../../agora-rn-uikit';
import {MinUidContext} from '../../agora-rn-uikit';
import {MaxUidContext} from '../../agora-rn-uikit';
import {layoutComponent} from 'fpe-api';
const topPinned = true;

const TopPinnedVideo: layoutComponent = ({maxVideoArray, minVideoArray}) => {
  const [collapse, setCollapse] = useState(false);
  // Custom Hook *********************
  const [dim, setDim] = useState([
    Dimensions.get('window').width,
    Dimensions.get('window').height,
    Dimensions.get('window').width > Dimensions.get('window').height,
  ]);
  let onLayout = () => {
    setTimeout(() => {
      let {height, width} = Dimensions.get('window');
      let isLandscape = width > height;
      setDim([width, height, isLandscape]);
    }, 20);
  };
  // **********************************
  const isSidePinnedlayout = topPinned === true ? false : dim[2]; // if either explicity set to false or auto evaluation
  const max = useContext(MaxUidContext);
  const min = useContext(MinUidContext);
  const {dispatch} = useContext(RtcContext);
  return (
    <View
      style={{
        flexDirection: isSidePinnedlayout ? 'row' : 'column',
        flex: 1,
        padding: 4,
      }}
      onLayout={onLayout}>
      {isSidePinnedlayout && (
        <Pressable
          onPress={() => setCollapse(!collapse)}
          style={{
            position: 'absolute',
            zIndex: 50,
            marginTop: 5,
            width: 35,
            height: 35,
            marginLeft: collapse ? 5 : '20.1%',
            backgroundColor: $config.SECONDARY_FONT_COLOR + 'aa',
            borderRadius: 50,
            justifyContent: 'center',
          }}>
          {/* <Image
            source={{
              uri: icons.micOff,
            }}
            style={[style.MicIcon]}
            resizeMode={'contain'}
          /> */}
          <Text
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              color: $config.PRIMARY_COLOR,
              fontWeight: '500',
              fontSize: 20,
            }}>
            {collapse ? '>' : '<'}
          </Text>
        </Pressable>
      )}
      {!collapse && (
        <ScrollView
          horizontal={!isSidePinnedlayout}
          decelerationRate={0}
          // snapToInterval={
          //   dim[2] ? dim[0] * 0.1125 + 2 : ((dim[1] / 3.6) * 16) / 9
          // }
          // snapToAlignment={'center'}
          style={
            isSidePinnedlayout
              ? {width: '20%', paddingHorizontal: 8}
              : {flex: 1}
          }>
          {minVideoArray.map((Video, i) => (
            <Pressable
              style={
                isSidePinnedlayout
                  ? {
                      width: '100%',
                      height: dim[0] * 0.1125 + 2, // width * 20/100 * 9/16 + 2
                      zIndex: 40,
                      paddingBottom: 8,
                    }
                  : {
                      width: ((dim[1] / 3) * 16) / 9 / 2 + 12, //dim[1] /4.3
                      height: '100%',
                      zIndex: 40,
                      paddingRight: 8,
                      paddingVertical: 4,
                    }
              }
              key={'minVideo' + i}
              onPress={() => {
                dispatch({type: 'SwapVideo', value: [min[i]]});
              }}>
              {Video}
            </Pressable>
          ))}
        </ScrollView>
      )}
      <View
        style={
          isSidePinnedlayout
            ? collapse
              ? style.width100
              : style.width80
            : style.flex4
        }>
        {maxVideoArray.map((Video, i) => (
          <View style={style.flex1}>{Video}</View>
        ))}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  width80: {width: '80%'},
  width100: {width: '100%'},
  flex2: {flex: 2},
  flex4: {flex: 4, backgroundColor: '#ffffff00'},
  flex1: {flex: 1},
});

export default TopPinnedVideo;
