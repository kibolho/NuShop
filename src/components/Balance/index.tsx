import {PixelRatio, StyleSheet, View} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import {Paragraph} from '../Typography/Paragraph';
import Shimmer from '../Shimmer';
import {LIST_LEFT_SPACING} from '@app/styles/constants';
import {getDimensions} from '@app/utils/deviceUtils';
import {toCurrencyWithCode} from '@app/utils/currency';
import useLocalStorage from '@app/hooks/useLocalStorage';

type BalanceProps = {
  balance?: number;
  isLoading?: boolean;
};

export const Balance: React.FC<BalanceProps> = ({
  balance,
  isLoading = false,
}) => {
  const [isShowingBalance, setIsShowingBalance] = useLocalStorage<boolean>(
    'IS_EYE_OPEN',
    false,
  );

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        {isLoading || !isShowingBalance ? (
          <Shimmer width={getDimensions().width / 2} height={30} />
        ) : (
          <Paragraph ellipsizeMode="tail" size={'l'}>
            {toCurrencyWithCode(balance)}
          </Paragraph>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          setIsShowingBalance(prev => !prev);
        }}>
        <Ionicons
          name={isShowingBalance ? 'eye' : 'eye-off'}
          size={32}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

const fontScale = PixelRatio.getFontScale();

export const BALANCE_VIEW_HEIGHT = 50 * fontScale;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: BALANCE_VIEW_HEIGHT,
    paddingHorizontal: LIST_LEFT_SPACING,
  },
  leftView: {
    alignItems: 'center',
  },
});
