import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Title, useTheme} from 'react-native-paper';

import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {usePurchase} from '../hooks/usePurchase';
import type {MainStack} from '@app/navigation/types';
import {IMAGE, OFFER_DETAILS, PURCHASE_BUTTON} from '@app/test/testIDs';
import {Paragraph} from '@app/components/Typography/Paragraph';
import {Solid} from '@app/components/Button/Solid';
import {getDimensions} from '@app/utils/deviceUtils';
import {spacings} from '@app/styles/spacings';
import {toCurrencyWithCode} from '@app/utils/currency';
import {useOnlineStatus} from '@app/providers/hooks/useOnlineStatus';

type OfferDetailsScreenNavigationProp = StackNavigationProp<
  MainStack,
  'OfferDetails'
>;

type Props = {
  navigation: OfferDetailsScreenNavigationProp;
  route: RouteProp<MainStack, 'OfferDetails'>;
};

export function OfferDetails({route}: Props) {
  const theme = useTheme();
  const isOnline = useOnlineStatus();
  const {offer} = route.params;

  const {mutate: onPressPurchase} = usePurchase();

  return (
    <ScrollView testID={OFFER_DETAILS}>
      <View>
        <View style={styles.rowAlign}>
          <Image
            testID={`${IMAGE}${offer.product.image}`}
            style={styles.image}
            resizeMode={'contain'}
            source={{uri: offer.product.image}}
            accessibilityIgnoresInvertColors
          />
        </View>
        <View style={styles.rowAlign}>
          <Title style={[{color: theme.colors.primary}]}>
            {offer.product.name}
          </Title>
        </View>
        <View style={styles.rowAlign}>
          <Paragraph style={[{color: theme.colors.text}]}>
            {offer.product.description}
          </Paragraph>
        </View>
        <View style={styles.rowAlign}>
          <Paragraph style={[{color: theme.colors.accent}]}>
            {toCurrencyWithCode(offer.price)}
          </Paragraph>
        </View>
        <View style={styles.rowAlign}>
          <Solid
            testID={PURCHASE_BUTTON}
            onPress={() => {
              if (isOnline) onPressPurchase({offerId: offer.id});
            }}>
            Buy
          </Solid>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rowAlign: {
    flexDirection: 'row',
    marginLeft: spacings.xxLarge,
    marginTop: spacings.xxLarge,
    marginRight: spacings.xxLarge,
  },
  image: {
    width: getDimensions().width - spacings.xxLarge * 2,
    height: 100,
  },
});
