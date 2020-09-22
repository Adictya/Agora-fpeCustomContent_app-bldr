import React, {useState, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ColorContext from '../components/ColorContext';
import {useHistory} from './Router';
import Clipboard from '../subComponents/Clipboard';

const Share = (props: any) => {
  const history = useHistory();
  const {
    urlView,
    urlHost,
    pstn,
    joinPhrase,
    roomTitle,
    hostControlCheckbox,
  } = props;
  const {primaryColor} = useContext(ColorContext);

  const enterMeeting = () => {
    if (urlHost) {
      history.push(`/${joinPhrase}`);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(
      pstn
        ? hostControlCheckbox
          ? `Meeting - ${roomTitle}
URL for Attendee: ${urlView}
URL for Host: ${urlHost}

PSTN Number: ${pstn.number}
PSTN Pin: ${pstn.dtmf}`
          : `Meeting - ${roomTitle}
Meeting URL: ${urlHost}

PSTN Number: ${pstn.number}
PSTN Pin: ${pstn.dtmf}`
        : hostControlCheckbox
        ? `Meeting - ${roomTitle}
URL for Attendee: ${urlView}
URL for Host: ${urlHost}`
        : `Meeting - ${roomTitle}
Meeting URL: ${urlHost}`,
    );
  };

  const [dim, setDim] = useState([
    Dimensions.get('window').width,
    Dimensions.get('window').height,
    Dimensions.get('window').width > Dimensions.get('window').height,
  ]);
  let onLayout = (e: any) => {
    setDim([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
  };

  return (
    <View style={style.content} onLayout={onLayout}>
      <View style={style.leftContent}>
        <Text style={style.heading}>Meeting Created</Text>
        {hostControlCheckbox ? (
          <>
            <Text style={style.urlTitle}>URL for Attendee:</Text>
            <View style={style.urlHolder}>
              <Text style={style.url}>{urlView}</Text>
            </View>
          </>
        ) : (
          <></>
        )}
        <Text style={style.urlTitle}>
          {hostControlCheckbox ? 'URL for Host:' : 'Meeting URL'}
        </Text>
        <View style={style.urlHolder}>
          <Text style={style.url}>{urlHost}</Text>
        </View>
        {pstn ? (
          <View style={style.pstnHolder}>
            <View style={style.urlTitle}>
              <Text style={style.urlTitle}>PSTN:</Text>
              <View style={style.urlHolder}>
                <Text style={style.url}>{pstn.number}</Text>
              </View>
            </View>
            <View>
              <Text style={style.urlTitle}>Pin:</Text>
              <View style={style.urlHolder}>
                <Text style={style.url}>{pstn.dtmf}</Text>
              </View>
            </View>
          </View>
        ) : (
          <></>
        )}
        <TouchableOpacity
          style={[style.secondaryBtn, {borderColor: primaryColor}]}
          onPress={() => copyToClipboard()}>
          <Text style={[style.secondaryBtnText, {color: primaryColor}]}>
            Copy to clipboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.primaryBtn, {backgroundColor: primaryColor}]}
          onPress={() => enterMeeting()}>
          <Text style={style.primaryBtnText}>Enter Meeting (as host)</Text>
        </TouchableOpacity>
      </View>
      {dim[0] > dim[1] + 150 ? (
        <View style={style.full}>
          <View style={{flex: 1, backgroundColor: '#00ff00', opacity: 0}} />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  full: {flex: 1},
  main: {
    flex: 2,
    justifyContent: 'space-evenly',
    marginHorizontal: '10%',
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {flex: 6, flexDirection: 'row'},
  leftContent: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
    marginBottom: '5%',
    marginRight: '5%',
    marginHorizontal: 'auto',
  },
  heading: {
    fontSize: 38,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  headline: {
    fontSize: 20,
    fontWeight: '400',
    color: '#777',
    marginBottom: 20,
  },
  inputs: {
    flex: 1,
    width: '100%',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  primaryBtn: {
    width: '60%',
    backgroundColor: '#099DFD',
    maxWidth: 400,
    minWidth: 200,
    minHeight: 45,
  },
  primaryBtnText: {
    width: '100%',
    height: 45,
    lineHeight: 45,
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
  },
  secondaryBtn: {
    width: '60%',
    borderColor: '#099DFD',
    borderWidth: 3,
    maxWidth: 400,
    minHeight: 42,
    minWidth: 200,
  },
  secondaryBtnText: {
    width: '100%',
    height: 45,
    lineHeight: 45,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    textAlignVertical: 'center',
    color: '#099DFD',
  },
  checkboxHolder: {
    marginVertical: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxTitle: {
    color: '#333',
    paddingHorizontal: 5,
    fontWeight: '700',
  },
  checkboxCaption: {color: '#333', paddingHorizontal: 5},
  checkboxTextHolder: {
    marginVertical: 0, //check if 5
    flexDirection: 'column',
  },
  urlTitle: {
    color: '#333',
    fontSize: 14,
  },
  urlHolder: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 15,
    justifyContent: 'center',
    maxWidth: 400,
    minHeight: 45,
  },
  url: {
    color: '#333',
    fontSize: 18,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  pstnHolder: {
    flexDirection: 'row',
    width: '80%',
  },
  pstnMargin: {
    marginRight: '10%',
  },
});

export default Share;
