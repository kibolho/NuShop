import {Dimensions, Platform, ScaledSize} from 'react-native';

export const getDimensions = (): ScaledSize => Dimensions.get('window');
export const isIos = (): boolean => Platform.OS === 'ios';
