import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  IconButton,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export const Dashboard = () => {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title:"Desenvolvimento de site",
      amount:"R$12.000,00",
      category:{
        name: "Vendas",
        icon: "attach-money",
      },
      date:"13/04/2020"
    },
    {
      id: '2',
      type: 'negative',
      title: "Hamburgueria Pizzy",
      amount:"R$59,00",
      category:{
        name: "Alimentação",
        icon: "fastfood"
      },
      date:"10/04/2020"
    },
    {
      id: '3',
      type: 'negative',
      title:"Aluguel do apartamento",
      amount:"R$R$1.200,00",
      category:{
        name: "Casa",
        icon: "apartment",
      },
      date: "27/03/2020"
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
        <UserInfo>
          <Photo
            source={{ uri: 'https://avatars.githubusercontent.com/u/59941082?v=4'}}
          />
          <User>
            <UserGreeting>Olá,</UserGreeting>
            <UserName>Paulo</UserName>
          </User>
        </UserInfo>

        <LogoutButton onPress={() => {}}>
          <IconButton name="power-settings-new"/>
        </LogoutButton>

        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de abril'
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount='R$ 1.259,00'
          lastTransaction='Última saída dia 03 de abril'
        />
        <HighlightCard
          title="Total"
          amount='R$ 16.141,00'
          lastTransaction='01 a 16 de abril'
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>
          Listagem
        </Title>
        <TransactionsList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item}/>}
        />

      </Transactions>
    </Container>
  );
};

