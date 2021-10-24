import React from 'react';
import {useColorScheme} from 'react-native';
import storage from '@app/services/storage';

export type ThemeModes = 'auto' | 'dark' | 'light';

export const THEME_MODE_KEY = 'THEME_MODE_KEY';

export function useThemeState() {
  const [themeModeState, setThemeModeState] =
    React.useState<ThemeModes>('auto');
  const userPrefferedThemeMode = useColorScheme();
  const [isReady, setIsReady] = React.useState(false);

  React.useLayoutEffect(() => {
    const restoreThemeMode = async () => {
      try {
        const themeMode = ((await storage.get(THEME_MODE_KEY)) ||
          'auto') as ThemeModes;
        setThemeModeState(themeMode);
      } catch (e) {
        // ignore error
      } finally {
        setIsReady(true);
      }
    };
    restoreThemeMode();
  }, []);

  React.useEffect(() => {
    const saveThemeMode = async () => {
      await storage.set(THEME_MODE_KEY, themeModeState);
    };

    saveThemeMode();
  }, [themeModeState]);

  const themeMode =
    themeModeState === 'auto' ? userPrefferedThemeMode : themeModeState;

  return {themeModeState, themeMode, setThemeModeState, isReady};
}
