import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Checkbox from '../subComponents/Checkbox';
import images from '../assets/images';
import {useHistory} from '../components/Router';
import {gql, useMutation} from '@apollo/client';
import Logo from '../subComponents/Logo';
import OpenInNativeButton from '../subComponents/OpenInNativeButton';
import Share from '../components/Share';

type PasswordInput = {
  host: string;
  view: string;
};

const CREATE_CHANNEL = gql`
  mutation CreateChannel(
    $channel: String!
    $enableLink: Boolean
    $enablePSTN: Boolean
    $password: PasswordInput
  ) {
    createChannel(
      channel: $channel
      enableLink: $enableLink
      password: $password
      enablePSTN: $enablePSTN
    ) {
      password {
        host
        view
      }
      passphrase {
        host
        view
      }
      pstn
    }
  }
`;
// https://agora-meet.netlify.app/join/khjshbdfkhsdf-sd-fkhsdbfsd
const Create = () => {
  const history = useHistory();
  const [channel, onChangeChannel] = useState('');
  const [pstnCheckbox, setPstnCheckbox] = useState(true);
  const [hostControlCheckbox, setHostControlCheckbox] = useState(false);
  const [urlView, setUrlView] = useState(null);
  const [urlHost, setUrlHost] = useState(null);
  const [pstn, setPstn] = useState(null);
  const [roomCreated, setRoomCreated] = useState(false);
  const [createChannel, {data, loading}] = useMutation(CREATE_CHANNEL);

  console.log('mutation data', data);

  const createRoom = () => {
    // if (channel !== '') {
    //   console.log('Create room invoked');
    //   createChannel({
    //     variables: {
    //       channel,
    //       enableLink: urlCheckbox,
    //       password: {host: hostPassword, view: attendeePassword},
    //       enablePSTN: pstnCheckbox,
    //     },
    //   }).then((res) => {
    //     console.log('promise data', res);
    //     res.data.createChannel.password.view
    //       ? setPasswordView(res.data.createChannel.password.view)
    //       : {};
    //     res.data.createChannel.password.host
    //       ? setPasswordHost(res.data.createChannel.password.host)
    //       : {};
    //     setUrlView(
    //       'https://agora-meet.netlify.app/join/' +
    //         res.data.createChannel.passphrase.view,
    //     );
    //     setUrlHost(
    //       'https://agora-meet.netlify.app/join/' +
    //         res.data.createChannel.passphrase.host,
    //     );
    //     setPstn(res.data.createChannel.pstn);
    //     setRoomCreated(true);
    //   });
    // }
    setRoomCreated(!roomCreated);
  };

  const [dim, setDim] = useState([0, 0]);
  let onLayout = (e: any) => {
    setDim([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
  };

  return (
    <ImageBackground
      source={{uri: images.background}}
      style={style.full}
      resizeMode={'cover'}>
      <View style={style.main}>
        <View style={style.nav}>
          <Logo />
          <OpenInNativeButton />
        </View>
        {!roomCreated ? (
          <View style={style.content} onLayout={onLayout}>
            <View style={style.leftContent}>
              <Text style={style.heading}>Create Meeting</Text>
              <Text style={style.headline}>
                The Real-Time Engagement Platform for meaningful human
                connections.
              </Text>
              <View style={style.inputs}>
                <TextInput
                  style={style.textInput}
                  value={channel}
                  onChangeText={(text) => onChangeChannel(text)}
                  onSubmitEditing={() => createRoom()}
                  placeholder="Enter Room Name"
                  placeholderTextColor="#777"
                  autoCorrect={false}
                />
                <View style={style.checkboxHolder}>
                  <Checkbox
                    value={pstnCheckbox}
                    onValueChange={setPstnCheckbox}
                  />
                  <View style={style.checkboxTextHolder}>
                    <Text style={style.checkboxTitle}>Use PSTN</Text>
                    <Text style={style.checkboxCaption}>
                      Join by dialing a number
                    </Text>
                  </View>
                </View>
                <View style={style.checkboxHolder}>
                  <Checkbox
                    value={hostControlCheckbox}
                    onValueChange={setHostControlCheckbox}
                  />
                  <View style={style.checkboxTextHolder}>
                    <Text style={style.checkboxTitle}>
                      Restrict Host Controls
                    </Text>
                    <Text style={style.checkboxCaption}>
                      {!hostControlCheckbox
                        ? 'Everyone is a Host'
                        : 'Host uses a seperate link'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  disabled={channel === ''}
                  style={
                    channel === '' ? style.primaryBtnDisabled : style.primaryBtn
                  }
                  onPress={() => createRoom()}>
                  <Text style={style.primaryBtnText}>Create Meeting</Text>
                </TouchableOpacity>
              </View>
            </View>
            {dim[0] > dim[1] + 150 ? (
              <View style={style.full}>
                <View
                  style={{flex: 1, backgroundColor: '#00ff00', opacity: 0}}
                />
              </View>
            ) : (
              <></>
            )}
          </View>
        ) : (
          <Share />
        )}
      </View>
    </ImageBackground>
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
  textInput: {
    width: '100%',
    paddingLeft: 8,
    borderColor: '#099DFD',
    borderWidth: 2,
    color: '#333',
    fontSize: 16,
    marginBottom: 15,
    maxWidth: 400,
    minHeight: 45,
  },
  primaryBtn: {
    width: '60%',
    backgroundColor: '#099DFD',
    maxWidth: 400,
    minWidth: 200,
    minHeight: 45,
  },
  primaryBtnDisabled: {
    width: '60%',
    backgroundColor: '#96D7FE',
    maxWidth: 400,
    minHeight: 45,
    minWidth: 200,
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
    minHeight: 45,
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

export default Create;
