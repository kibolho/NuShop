import {ColorSchemeName, Platform, StyleSheet, View} from 'react-native';
import {QueryClientProvider, focusManager} from 'react-query';
import {AppStateStatus} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import useAppState from 'react-native-appstate-hook';
import {DarkTheme, DefaultTheme} from '@app/styles/themes';

import {APP_NOT_READY} from '@app/test/testIDs';
import {GraphQLClientProvider} from '@app/providers/GraphQLClientProvider';
import {MainStack} from '@app/navigation/MainStack';
import {ModalProvider} from '@app/providers/ModalProvider';
import {NetworkStatusProvider} from '@app/providers/NetworkStatusProvider';
import {ThemeModeProvider} from '@app/providers/ThemeModeProvider';
import {initPersistor} from '@app/services/persistor';
import {queryClient} from '@app/services/queryClient';
import {useCustomFonts} from '@app/hooks/useCustomFonts';
import {useOnlineManager} from '@app/hooks/useOnlineManager';
import {useThemeState} from '@app/hooks/useThemeState';
import {ModalManager} from '@app/components/Modal/ModalManager';

// Load React Query cache from the async storage
initPersistor(queryClient);

function onAppStateChange(status: AppStateStatus) {
  focusManager.setFocused(status === 'active');
}

function getStatusBarStyle(themeColorScheme: ColorSchemeName) {
  const isIOS = Platform.OS === 'ios';
  return themeColorScheme !== 'dark' ? (isIOS ? 'dark' : 'light') : 'light';
}

export default function App() {
  const [loaded] = useCustomFonts();
  const {isReady, themeMode, themeModeState, setThemeModeState} =
    useThemeState();

  useAppState({
    onChange: onAppStateChange,
  });

  useOnlineManager();

  const theme = themeMode === 'dark' ? DarkTheme : DefaultTheme;

  if (!loaded || !isReady)
    return (
      <View
        style={[styles.fill, {backgroundColor: theme.colors.primary}]}
        testID={APP_NOT_READY}
      />
    );

  return (
    <GraphQLClientProvider>
      <QueryClientProvider client={queryClient}>
        <NetworkStatusProvider>
          <NavigationContainer theme={theme}>
            <PaperProvider theme={theme}>
              <ThemeModeProvider
                themeMode={themeMode}
                setThemeMode={setThemeModeState}
                themeModeState={themeModeState}>
                <ModalProvider>
                  <StatusBar style={getStatusBarStyle(themeMode)} />
                  <SafeAreaProvider
                    style={{backgroundColor: theme.colors.primary}}>
                    <MainStack />
                    <ModalManager />
                  </SafeAreaProvider>
                </ModalProvider>
              </ThemeModeProvider>
            </PaperProvider>
          </NavigationContainer>
        </NetworkStatusProvider>
      </QueryClientProvider>
    </GraphQLClientProvider>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
