import React from 'react';
import { Container, Category, IconButton } from './styles';

interface Props {
  title: string;
  onPress: () => void;
}

export const CategorySelectButton = ({title, onPress}: Props) => {
  return(
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <IconButton name="chevron-down"/>
    </Container>
  )
}
