import React from "react";

import { StatusBar, View } from "react-native";

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";

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
} from "./styles";
import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";

import { getCarAccessoryIcon } from "../../utils/getCarAccesoryIcon";
import {
  CarDetailsRouteProp,
  CarDetailsScreenProps,
} from "../../routes/interfaces";

export const CarDetails = () => {
  const navigation = useNavigation<CarDetailsScreenProps>();
  const route = useRoute<CarDetailsRouteProp>();

  const { car } = route.params;

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    console.log(event.contentOffset.y);
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const slideCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  const handleConfirm = () => {
    navigation.navigate("Schedule", { car });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.View style={[headerStyleAnimation]}>
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

        <CarImages style={slideCarsStyleAnimation}>
          <ImageSlider imagesUrl={car.photos} />
        </CarImages>
      </Animated.View>
      <Content scrollEventThrottle={16} onScroll={scrollHandler}>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
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
