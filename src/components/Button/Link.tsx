import {Button as PaperButton} from 'react-native-paper';
import React from 'react';

export function Link(props: React.ComponentProps<typeof PaperButton>) {
  return <PaperButton {...props} mode="text" style={[props.style]} />;
}
