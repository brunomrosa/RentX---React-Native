import React from 'react';

import CarLoadAnimation from 'assets/load_animation.json';

import AnimatedLottieView from 'lottie-react-native';
import { Container } from './styles';

export const LoadAnimation = () => (
  <Container>
    <AnimatedLottieView
      source={CarLoadAnimation}
      autoPlay
      style={{ height: 200 }}
      resizeMode="contain"
      loop
    />
  </Container>
);
