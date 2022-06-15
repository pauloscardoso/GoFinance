import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { AuthProvider } from './src/hooks/auth';
import { theme } from './src/global/theme';
import { Routes } from './src/Routes';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle="light-content"
        />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
