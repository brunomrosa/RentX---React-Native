import React, { useEffect, useState } from 'react';

import { Alert, StatusBar, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

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
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';
import { Button } from '../../components/Button';
import { SchedulingDetailsRouteProp, SchedulingDetailsScreenProps } from '../../routes/interfaces';
import { getCarAccessoryIcon } from '../../utils/getCarAccesoryIcon';
import { getPlataformDate } from '../../utils/getPlataformDate';
import api from '../../services/api';

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<SchedulingDetailsScreenProps>();
  const route = useRoute<SchedulingDetailsRouteProp>();

  const { car, dates } = route.params;

  const rentTotal = Number(dates.length * car.rent.price);

  const theme = useTheme();

  const handleConfirmSchedule = async () => {
    setLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    console.log(schedulesByCar.data);

    const unavailable_dates = [...schedulesByCar.data.unavailable_dates, ...dates];

    await api.post('schedules_byuser', {
      car,
      user_id: 1,
      startDate: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    });

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => navigation.navigate('SchedulingComplete'))
      .catch(() => {
        Alert.alert('Não foi possível confirmar o agendamento');
        setLoading(false);
      });
  };

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    });
  }, []);

  return (
    <Container>
      <StatusBar />
      <Header>
        <BackButton />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            'https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png',
          ]}
        />
      </CarImages>

      <Content>
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text} />
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>
              R$
              {rentTotal}
            </RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          onPress={handleConfirmSchedule}
          color={theme.colors.success}
          title="Alugar Agora"
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
