import {
  RobotoBold,
  RobotoLight,
  RobotoMedium,
  RobotoRegular,
  RobotoThin,
} from '@app/styles/fonts';

import {useFonts} from 'expo-font';

export function useCustomFonts() {
  return useFonts({
    [RobotoRegular]: require('../../assets/fonts/Roboto-Regular.ttf'),
    [RobotoMedium]: require('../../assets/fonts/Roboto-Medium.ttf'),
    [RobotoLight]: require('../../assets/fonts/Roboto-Light.ttf'),
    [RobotoThin]: require('../../assets/fonts/Roboto-Thin.ttf'),
    [RobotoBold]: require('../../assets/fonts/Roboto-Bold.ttf'),
  });
}
