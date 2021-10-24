import {PixelRatio, StyleSheet, View} from 'react-native';

import React from 'react';
import {Paragraph} from '../Typography/Paragraph';
import Shimmer from '../Shimmer';
import {LIST_LEFT_SPACING} from '@app/styles/constants';
import {getDimensions} from '@app/utils/deviceUtils';

type WelcomeProps = {
  name?: string;
  isLoading?: boolean;
};

export const Welcome: React.FC<WelcomeProps> = ({name, isLoading}) => {
  return (
    <View style={styles.container}>
      <Paragraph size={'l'}>{'Hello, '}</Paragraph>
      {isLoading ? (
        <Shimmer width={getDimensions().width / 2} height={30} />
      ) : (
        <Paragraph size={'l'}>{name}</Paragraph>
      )}
    </View>
  );
};

const fontScale = PixelRatio.getFontScale();

export const BALANCE_VIEW_HEIGHT = 50 * fontScale;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: BALANCE_VIEW_HEIGHT,
    paddingHorizontal: LIST_LEFT_SPACING,
  },
});
