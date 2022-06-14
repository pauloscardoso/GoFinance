import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { theme } from './src/global/theme';
/* import { AppRoutes } from './src/Routes/app.routes'; */

import { SignIn } from './src/screens/SignIn';

import { AuthProvider } from './src/hooks/auth';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar
            backgroundColor={theme.colors.primary}
            barStyle="light-content"
          />
          <AuthProvider>
            <SignIn />
          </AuthProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
