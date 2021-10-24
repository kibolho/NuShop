import {Image, PixelRatio, StyleSheet, View} from 'react-native';
import {TouchableRipple, useTheme} from 'react-native-paper';

import React from 'react';
import {Subheading} from './Typography/Subheading';
import {IMAGE, OFFER_ITEM} from '@app/test/testIDs';
import {LIST_LEFT_SPACING} from '@app/styles/constants';
import {Offer} from '@app/graphql/generated';
import {Paragraph} from '@app/components/Typography/Paragraph';
import {spacings} from '@app/styles/spacings';
import {toCurrencyWithCode} from '@app/utils/currency';

type Props = {
  item?: Offer | null;
  onPress: (offer: Offer) => void;
};

export function OfferItem({item, onPress}: Props) {
  const theme = useTheme();

  if (!item) return null;
  return (
    <TouchableRipple
      onPress={() => onPress(item)}
      accessibilityRole="button"
      testID={OFFER_ITEM}>
      <View style={styles.innerWrapper}>
        <View style={styles.leftView}>
          <Image
            testID={`${IMAGE}${item.product.image}`}
            style={styles.image}
            resizeMode={'contain'}
            source={{uri: item.product.image}}
            accessibilityIgnoresInvertColors
          />
        </View>
        <View style={styles.rightView}>
          <Paragraph
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[styles.title, theme.fonts.medium]}>
            {item.product.name}
          </Paragraph>
          <Subheading>{toCurrencyWithCode(item.price)}</Subheading>
        </View>
      </View>
    </TouchableRipple>
  );
}

const fontScale = PixelRatio.getFontScale();

export const OFFER_ITEM_HEIGHT = 100 * fontScale;

const styles = StyleSheet.create({
  innerWrapper: {
    flexDirection: 'row',
    paddingRight: spacings.large,
    paddingLeft: LIST_LEFT_SPACING,
    height: OFFER_ITEM_HEIGHT,
    paddingTop: spacings.large * fontScale,
    paddingBottom: spacings.medium * fontScale,
    marginBottom: spacings.xSmall,
  },
  leftView: {
    alignItems: 'center',
    marginBottom: spacings.xSmall * fontScale,
  },
  image: {
    width: OFFER_ITEM_HEIGHT,
    height: OFFER_ITEM_HEIGHT - spacings.large * fontScale * 2,
  },
  rightView: {
    flexDirection: 'column',
    marginTop: spacings.xSmall,
  },
  title: {
    flex: 1,
  },
});
