import React from 'react';
import { Platform } from 'react-native'
import Icon  from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {useTheme} from 'styled-components'

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  const theme = useTheme();

  return(
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 51,
          paddingVertical: Platform.OS === 'ios'
          ? 20
          : 0
        }
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color}) =>
            <Icon
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: (({ size, color}) =>
            <Icon
              name="attach-money"
              size={size}
              color={color}
            />
          )
        }}

      />
      <Screen
        name="Resumo"
        component={Register}
        options={{
          tabBarIcon: (({ size, color}) =>
            <Icon
              name="pie-chart"
              size={size}
              color={color}
            />
          )
        }}
      />
    </Navigator>
  )
}
