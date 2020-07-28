import React, {useState, useContext} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import styles from '../components/styles';
import ChatContext from '../components/ChatContext';

const ChatInput = () => {
  const [message, onChangeMessage] = useState('');
  const {sendMessage, engine} = useContext(ChatContext);
  return (
    <View style={styles.chatInputView}>
      <TextInput
        style={styles.chatInput}
        value={message}
        onChangeText={(text) => onChangeMessage(text)}
        placeholder="Type your message.."
        placeholderTextColor="#000"
        autoCorrect={false}
      />
      <TouchableOpacity
        style={styles.ChatInputButton}
        onPress={() => sendMessage(message)}>
        <Text style={styles.ChatInputButtonText}> S </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;
