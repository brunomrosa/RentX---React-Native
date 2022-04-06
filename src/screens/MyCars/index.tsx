import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { MyCarsScreenProps } from '../../routes/interfaces';
import api from '../../services/api';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import theme from '../../styles/theme';
import { Load } from '../../components/Load';

interface CarProps {
  car: CarDTO;
  user_id: string;
  id: string;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const response = await api.get('/schedules_byuser?user_id=1');
      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const navigation = useNavigation<MyCarsScreenProps>();

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <Container>
      <Header>
        <BackButton />
        <Title>
          Escolha uma
          {'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>

        <SubTitle>Conforto, segurança e qualidade</SubTitle>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos Feitos</AppointmentsTitle>
            <AppointmentsQuantity>
              {cars.length < 10 ? `0${cars.length}` : cars.length}
            </AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
