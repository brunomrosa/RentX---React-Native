import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import Gasoline from '../../assets/gasoline.svg';
import { CarDTO } from '../../dtos/CarDTO';
import { getCarAccessoryIcon } from '../../utils/getCarAccesoryIcon';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

interface Props extends RectButtonProps {
  data: CarDTO;
}

export function Car({ data, ...rest }: Props) {
  const MotorIcon = getCarAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>
          <Type>
            <MotorIcon width={20} height={20} />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{
          uri: `${data.thumbnail}`,
        }}
        resizeMode="contain"
      />
    </Container>
  );
}
