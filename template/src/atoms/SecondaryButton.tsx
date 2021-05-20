import React, {useContext} from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from 'react-native';
import {secondaryBtn, secondaryButtonText} from '../../theme.json';
import ColorContext from '../components/ColorContext';

export interface ButtonProps extends PressableProps {
  text?: string;
}

export default function SecondaryButton(props: ButtonProps) {
  const {primaryColor} = useContext(ColorContext);
  const {children, ...otherProps} = props;
  return (
    <Pressable
      style={[
        styles.secondaryBtn,
        {borderColor: props.disabled ? primaryColor + '80' : primaryColor},
      ]}
      {...otherProps}>
      {props.text ? (
        <Text
          style={[
            styles.secondaryButtonText as StyleProp<TextStyle>,
            {color: props.disabled ? primaryColor + '80' : primaryColor},
          ]}>
          {props.text}
        </Text>
      ) : (
        <></>
      )}
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  secondaryBtn,
  secondaryButtonText,
});
