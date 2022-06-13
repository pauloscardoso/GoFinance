import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { theme } from './src/global/theme';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/Routes/app.routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
          <AppRoutes />
        </NavigationContainer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
