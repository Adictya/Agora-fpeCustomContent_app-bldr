import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import ColorContext from '../../src/components/ColorContext';

interface MaxVideoRendererInterface {
  user: any;
  // ----------
  // incase of single component for min and max
  // with conditional rendering.
  isMax?: Boolean;
  // ----------
  index: number;
}
const WhiteboardRenderer: React.FC<MaxVideoRendererInterface> = ({user}) => {
  const {primaryColor} = useContext(ColorContext);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
        borderColor: primaryColor,
        borderWidth: 2,
        borderRadius: 5,
      }}>
      <Text>I am whiteboard,{user.name}</Text>
    </View>
  );
};

export default WhiteboardRenderer;
