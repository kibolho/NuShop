import {Subheading as PaperSubheading} from 'react-native-paper';
import React from 'react';
import {StyleSheet} from 'react-native';

export function Subheading(
  props: React.ComponentProps<typeof PaperSubheading>,
) {
  return <PaperSubheading {...props} style={[props.style, styles.text]} />;
}

const styles = StyleSheet.create({
  text: {
    letterSpacing: 0.2,
  },
});
