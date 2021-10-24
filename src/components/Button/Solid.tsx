import {Button as PaperButton} from 'react-native-paper';
import React from 'react';

export function Solid(props: React.ComponentProps<typeof PaperButton>) {
  return <PaperButton {...props} mode="contained" style={[props.style]} />;
}
