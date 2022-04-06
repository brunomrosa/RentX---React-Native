import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from 'styled-components';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Container } from './styles';

interface Props extends BorderlessButtonProps {
  color?: string;
  onPress?: () => void;
}

export function BackButton({ color, onPress, ...rest }: Props) {
  const theme = useTheme();
  const navigation = useNavigation();

  const handlePress = () => {
    onPress ? onPress() : navigation.goBack();
  };

  return (
    <Container onPress={handlePress} {...rest}>
      <MaterialIcons name="chevron-left" size={24} color={color || theme.colors.shape} />
    </Container>
  );
}
