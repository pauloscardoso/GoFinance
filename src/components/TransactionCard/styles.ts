import styled from 'styled-components/native';
import icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Type } from './index';

interface TransactionProps {
  type: Type;
}

export const Container = styled.View`
  background-color: ${({ theme }) =>
    theme.colors.shape};
  border-radius: 5px;
  padding: 17px 24px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) =>
    theme.fonts.regular};
  color: ${({ theme }) =>
    theme.colors.text_dark};
  font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text<TransactionProps>`
  font-family: ${({ theme }) =>
    theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  margin-top: 2px;
  color: ${({ theme, type }) =>
    type === 'positive'
      ? theme.colors.success
      : theme.colors.attention};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 19px;
`;

export const Category = styled.View`
  flex-direction: row;
`;

export const Icon = styled(icon)`
  color: ${({ theme }) =>
    theme.colors.text};
  font-size: ${RFValue(20)}px;
`;

export const CategoryName = styled.Text`
  font-family: ${({ theme }) =>
    theme.fonts.regular};
  color: ${({ theme }) =>
    theme.colors.text};
  font-size: ${RFValue(14)}px;
  margin-left: 14px;
`;

export const Date = styled.Text`
  font-family: ${({ theme }) =>
    theme.fonts.regular};
  color: ${({ theme }) =>
    theme.colors.text};
  font-size: ${RFValue(14)}px;
`;
