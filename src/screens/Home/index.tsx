import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';

import { Car } from 'components/Car';

import { HomeScreenProps } from 'routes/interfaces';
import { CarDTO } from 'dtos/CarDTO';

import Logo from 'assets/logo.svg';
import { LoadAnimation } from 'components/LoadAnimation';
import api from '../../services/api';
import { Container, Header, TotalCars, HeaderContent, CarList } from './styles';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export const Home = () => {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation<HomeScreenProps>();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: positionY.value,
      },
      {
        translateX: positionX.value,
      },
    ],
  }));

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionY.value = withSpring(event.translationY + ctx.positionY);
      positionX.value = withSpring(event.translationX + ctx.positionX);
    },
    onEnd(event) {
      return event;
    },
  });

  const handleCarDetails = (item: CarDTO) => {
    navigation.navigate('CarDetails', {
      car: item,
    });
  };

  const handleOpenMyCars = () => {
    navigation.navigate('MyCars');
  };

  const fetchCars = async () => {
    try {
      const response = await api.get('/cars');
      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && (
            <TotalCars>
              Total de
              {cars.length < 10 ? ` 0${cars.length}` : ` ${cars.length}`}
            </TotalCars>
          )}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Car onPress={() => handleCarDetails(item)} data={item} />}
        />
      )}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.main,
              },
            ]}
          >
            <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
};
