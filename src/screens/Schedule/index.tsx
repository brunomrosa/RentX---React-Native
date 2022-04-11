import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { BackButton } from 'components/BackButton';
import ArrowSvg from 'assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

import { Button } from 'components/Button';
import { Calendar, DayProps, MarkedDateProps } from 'components/Calendar';
import { generateInterval } from 'components/Calendar/generateInterval';
import { getPlataformDate } from 'utils/getPlataformDate';

import { ScheduleRouteProp, ScheduleScreenProps } from 'routes/interfaces';

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export function Schedule() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);

  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const navigation = useNavigation<ScheduleScreenProps>();
  const route = useRoute<ScheduleRouteProp>();

  const { car } = route.params;

  const handleConfirmSchedule = () => {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  };

  const handleChangeDate = (date: DayProps) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(date);
    const interval = generateInterval(start, end);

    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlataformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Header>
        <BackButton />
        <Title>
          Escolha uma
          {'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          onPress={handleConfirmSchedule}
          enabled={!!rentalPeriod.startFormatted}
          title="Confirmar"
        />
      </Footer>
    </Container>
  );
}
