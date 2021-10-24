import {StyleSheet, View} from 'react-native';

import {Button} from 'react-native-paper';
import type {FallbackProps} from 'react-error-boundary';
import React from 'react';
import {Paragraph} from './Typography/Paragraph';
import {ERROR_SCREEN} from '@app/test/testIDs';
import {spacings} from '@app/styles/spacings';

type Props = FallbackProps & {
  message?: string;
};

export function ErrorScreen({error, message, resetErrorBoundary}: Props) {
  const errorMessage = message || error.message;

  return (
    <View style={styles.container} testID={ERROR_SCREEN}>
      <Paragraph style={styles.errorMessage}>{errorMessage}</Paragraph>
      <Button mode="contained" onPress={resetErrorBoundary} uppercase={false}>
        Retry
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    marginBottom: spacings.large,
  },
});
