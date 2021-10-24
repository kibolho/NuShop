import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTheme} from 'react-native-paper';
import {useViewer} from '../hooks/useViewer';
import {OFFER_ITEM_HEIGHT, OfferItem} from '@app/components/OfferItem';

import {Balance} from '@app/components/Balance';
import {Divider} from '@app/components/Divider';
import {LIST_LEFT_SPACING} from '@app/styles/constants';
import type {MainStack} from '@app/navigation/types';
import {HOME} from '@app/test/testIDs';
import {Offer} from '@app/graphql/generated';
import {Welcome} from '@app/components/Welcome';
import {useOnlineStatus} from '@app/providers/hooks/useOnlineStatus';
import {useRefreshByUser} from '@app/hooks/useRefreshByUser';

type OfferListScreenNavigationProp = StackNavigationProp<MainStack, 'Home'>;

type Props = {
  navigation: OfferListScreenNavigationProp;
};

export function OfferList({navigation}: Props) {
  const theme = useTheme();
  const isOnline = useOnlineStatus();

  const {offers, viewer, refetch, isFetching} = useViewer();
  const {isRefetchingByUser, refetchByUser} = useRefreshByUser(refetch);

  const onListItemPress = React.useCallback(
    (offer: Offer) => {
      navigation.navigate('OfferDetails', {
        offer,
      });
    },
    [navigation],
  );

  const renderItem = React.useCallback(
    ({item}: {item: Offer}) => {
      return <OfferItem item={item} onPress={onListItemPress} />;
    },
    [onListItemPress],
  );

  return (
    <View style={[styles.fill]}>
      <FlatList
        testID={HOME}
        ListHeaderComponent={
          <>
            <Welcome name={viewer?.name} isLoading={isFetching} />
            <Balance balance={viewer?.balance} isLoading={isFetching} />
          </>
        }
        refreshControl={
          isOnline ? (
            <RefreshControl
              refreshing={isRefetchingByUser}
              onRefresh={refetchByUser}
              tintColor={theme.colors.primary}
            />
          ) : undefined
        }
        data={offers}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReachedThreshold={1}
        style={[
          styles.fill,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
        ItemSeparatorComponent={() => (
          <Divider
            style={{
              marginLeft: LIST_LEFT_SPACING,
            }}
          />
        )}
        getItemLayout={(_data, index) => ({
          length: OFFER_ITEM_HEIGHT,
          offset: OFFER_ITEM_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
