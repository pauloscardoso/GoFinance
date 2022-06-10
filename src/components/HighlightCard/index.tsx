import React from 'react';
import {
  Container,
  Header,
  Title,
  IconButton,
  Footer,
  Amount,
  LastTransaction,
 } from './styles';

 interface Props {
   type: 'up' | 'down' | 'total';
   title: string;
   amount: string;
   lastTransaction: string;
 }

 const icon = {
   up: 'arrow-upward',
   down: 'arrow-downward',
   total: 'attach-money',
 }

export const HighlightCard = ({
  type,
  title,
  amount,
  lastTransaction
}: Props) => {
  return(
    <Container
      type={type}
    >
      <Header>
        <Title
          type={type}
        >
          {title}
        </Title>
        <IconButton
          name={icon[type]}
          type={type}
        />
      </Header>
      <Footer>
        <Amount
          type={type}
        >
          {amount}
        </Amount>
        <LastTransaction
          type={type}
        >
          {lastTransaction}
        </LastTransaction>
      </Footer>
    </Container>
  )
}
