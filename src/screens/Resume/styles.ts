import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  height: ${RFValue(83)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const Content = styled(ScrollView)``;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelect = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 24px;
`;

export const MonthSelectButton = styled(BorderlessButton)`
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const SelectIcon = styled(Icon)`
  color: black;
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  color: black;
  font-size: ${RFValue(20)}px;
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
