import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import React from 'react';

type Props = {
  children: React.ReactChild;
  style?: StyleProp<ViewStyle>;
};

export function Layout({children, style}: Props) {
  return <View style={[styles.fill, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
