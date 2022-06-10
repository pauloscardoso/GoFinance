import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IconProps {
  type: 'up' | 'down';
}

interface ContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled.View<ContainerProps>`
  width: 48%;
  height: ${RFValue(56)}px;
  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};

  border-radius: 5px;

  ${({ isActive, type, theme }) =>
    isActive &&
    type === 'up' &&
    css`
      background-color: ${theme.colors.success_light};
    `};

  ${({ isActive, type, theme }) =>
    isActive &&
    type === 'down' &&
    css`
      background-color: ${theme.colors.attention_light};
    `};
`;

export const Button = styled(RectButton)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

export const IconButton = styled(Icon)<IconProps>`
  color: ${({ theme, type }) =>
    type === 'up' ? theme.colors.success : theme.colors.attention};
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
