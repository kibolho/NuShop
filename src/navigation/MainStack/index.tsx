import {HomeScreen} from '@app/screens/Home';
import type {MainStack as MainStackType} from '@app/navigation/types';
import {OfferDetailsScreen} from '@app/screens/OfferDetails';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useHeaderStyles} from '@app/hooks/useHeaderStyles';

const Stack = createStackNavigator<MainStackType>();

export function MainStack() {
  const headerOptionsStyles = useHeaderStyles();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={headerOptionsStyles}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Home',
        }}
      />
      <Stack.Screen
        name="OfferDetails"
        component={OfferDetailsScreen}
        options={{
          headerTitle: 'Offer details',
        }}
      />
    </Stack.Navigator>
  );
}
