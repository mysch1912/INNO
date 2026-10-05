import { Pressable, Text } from 'react-native';

import { GlobalStyle } from '../styles/GlobalStyle';

export default function ButtonComponent({ title, onPress, secondary }) {
  return (
    <Pressable
      style={secondary ? GlobalStyle.secondaryButton : GlobalStyle.button}
      onPress={onPress}
    >
      <Text
        style={
          secondary
            ? GlobalStyle.secondaryButtonText
            : GlobalStyle.buttonText
        }
      >
        {title}
      </Text>
    </Pressable>
  );
}