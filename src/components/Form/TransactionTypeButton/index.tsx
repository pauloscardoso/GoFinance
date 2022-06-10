import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  IconButton,
  Title,
  Button
} from './styles';

const icons = {
  up: 'arrow-upward',
  down: 'arrow-downward',
}

interface Props extends RectButtonProps{
  type: 'up' | 'down';
  title: string;
  isActive: boolean;
}

export const TransactionTypeButton = ({type, title, isActive,...rest}: Props) => {
  return(
    <Container
      isActive={isActive}
      type={type}

    >
      <Button
        {...rest}
      >
        <IconButton name={icons[type]} type={type}/>
        <Title>
          {title}
        </Title>
      </Button>
    </Container>
  )
}
