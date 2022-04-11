import React from 'react';

import { StatusBar, StyleSheet, View } from 'react-native';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { useNavigation, useRoute } from '@react-navigation/native';
import { BackButton } from 'components/BackButton';
import { ImageSlider } from 'components/ImageSlider';
import { Accessory } from 'components/Accessory';

import { useTheme } from 'styled-components';
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from './styles';
import { Button } from '../../components/Button';

import { getCarAccessoryIcon } from '../../utils/getCarAccesoryIcon';
import { CarDetailsRouteProp, CarDetailsScreenProps } from '../../routes/interfaces';

export const CarDetails = () => {
  const navigation = useNavigation<CarDetailsScreenProps>();
  const route = useRoute<CarDetailsRouteProp>();
  const theme = useTheme();
  const { car } = route.params;

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP),
  }));

  const slideCarsStyleAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
  }));

  const handleConfirm = () => {
    navigation.navigate('Schedule', { car });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary },
        ]}
      >
        <Header style={{ zIndex: 2 }}>
          <BackButton onPress={handleBack} />
        </Header>
        <Animated.View style={slideCarsStyleAnimation}>
          <CarImages>
            <ImageSlider imagesUrl={car.photos} />
          </CarImages>
        </Animated.View>
      </Animated.View>
      <Content scrollEventThrottle={16} onScroll={scrollHandler}>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>
              R$
              {car.rent.price}
            </Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.name}
              name={accessory.name}
              icon={getCarAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Content>
      <Footer>
        <Button onPress={handleConfirm} title="Escolher período de aluguel" />
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
  back: {
    marginTop: 24,
  },
});
