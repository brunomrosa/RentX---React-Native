import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Container, Content, Title, Message, Footer } from './styles';

import LogoSVG from '../../assets/logo_background_gray.svg';
import DoneSVG from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';

export function SchedulingComplete() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  const handleOk = () => {
    navigation.navigate('Home' as never);
  };

  return (
    <Container>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <LogoSVG width={width} />

      <Content>
        <DoneSVG width={80} height={80} />
        <Title>Carro Alugado!</Title>

        <Message>
          {'Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.'}
        </Message>
      </Content>

      <Footer>
        <ConfirmButton onPress={handleOk} title="OK" />
      </Footer>
    </Container>
  );
}
