import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { Container, Header, TotalCars, HeaderContent, CarList, MyCarsButton } from './styles';

import { HomeScreenProps } from '../../routes/interfaces';
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';
import { Load } from '../../components/Load';
import { Car } from '../../components/Car';
import api from '../../services/api';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation<HomeScreenProps>();

  const handleCarDetails = (item: CarDTO) => {
    navigation.navigate('CarDetails', { car: item });
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

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de {cars.length < 10 ? `0${cars.length}` : cars.length}</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Car onPress={() => handleCarDetails(item)} data={item} />}
        />
      )}

      <MyCarsButton>
        <Ionicons
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape}
          onPress={handleOpenMyCars}
        />
      </MyCarsButton>
    </Container>
  );
}
