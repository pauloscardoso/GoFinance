import React from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
  LoadContainer,
} from './styles';
import { useFocusEffect } from '@react-navigation/native';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export const Resume = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [totalByCategories, setTotalByCategories] = React.useState<CategoryData[]>([]);

  const theme = useTheme();

  const handleChangeDate = async (action: 'next' | 'prev') => {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    const dataKey = '@gofinance:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expenses = responseFormatted.filter(
      (expense: TransactionData) =>
        expense.type === 'negative' &&
        new Date(expense.date).getMonth() === selectedDate.getMonth() &&
        new Date(expense.date).getFullYear() === selectedDate.getFullYear(),
    );

    const expensesTotal = expenses.reduce((acumullator: number, expense: TransactionData) => {
      return acumullator + Number(expense.amount);
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionData) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = `${((categorySum / expensesTotal) * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
        });
      }
    });
    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [selectedDate]),
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleChangeDate('prev')}>
              <SelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

            <MonthSelectButton onPress={() => handleChangeDate('next')}>
              <SelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
              x="percent"
              y="total"
            />
          </ChartContainer>
          {totalByCategories.map((item) => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))}
        </Content>
      )}
    </Container>
  );
};
