import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import Color from 'color';
import {
  configureFonts,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {
  black,
  green,
  greyDark,
  greyDarkest,
  greyDarkLess,
  greyLight,
  orange,
  purple,
  purpleLight,
  red,
  white,
} from './colors';
import {
  RobotoBold,
  RobotoLight,
  RobotoMedium,
  RobotoRegular,
  RobotoThin,
} from './fonts';

const fonts = {
  regular: {
    fontFamily: RobotoRegular,
    fontWeight: 'normal' as const,
  },
  medium: {
    fontFamily: RobotoMedium,
    fontWeight: '700' as const,
  },
  light: {
    fontFamily: RobotoLight,
    fontWeight: '300' as const,
  },
  thin: {
    fontFamily: RobotoThin,
    fontWeight: '200' as const,
  },
  bold: {
    fontFamily: RobotoBold,
    fontWeight: '700' as const,
  },
};

const fontConfig = {
  ios: {
    ...fonts,
  },
  android: {
    ...fonts,
  },
};

// ReactNativePaper global augmentation with custom properties
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      info: string;
      dividerBackground: string;
      headerBackground: string;
      headerTint: string;
    }
  }
}

export const DefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: purple,
    accent: greyDarkest,
    background: white,
    success: green,
    info: green,
    warning: orange,
    error: red,
    link: purpleLight,
    border: greyLight,
    headerBackground: purple,
    headerTint: white,
    dividerBackground: Color(black).alpha(0.25).rgb().toString(),
  },
  fonts: configureFonts(fontConfig),
};

export const DarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  ...DefaultTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    ...DefaultTheme.colors,
    background: black,
    backgroundHighlighted: greyDarkest,
    text: white,
    iconBackgroundDisabled: greyDarkLess,
    placeholder: greyDarkLess,
    border: greyDark,
    headerBackground: greyDarkest,
    headerTint: white,
    dividerBackground: Color(white).alpha(0.15).rgb().toString(),
  },
};
