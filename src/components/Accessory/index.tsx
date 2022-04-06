import React from "react";
import { SvgProps } from "react-native-svg";

import { Container, Name } from "./styles";

interface Props {
  name: String;
  icon: React.FC<SvgProps>;
}

export const Accessory = ({ name, icon: Icon }: Props) => {
  return (
    <Container>
      <Icon width={32} height={32} />
      <Name>{name}</Name>
    </Container>
  );
};