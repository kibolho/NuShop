import {ErrorBoundary} from 'react-error-boundary';
import {QueryErrorResetBoundary} from 'react-query';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {OfferList} from './OfferList';
import {ErrorScreen} from '@app/components/ErrorScreen';
import {Layout} from '@app/components/Layout';
import {LoadingScreen} from '@app/components/LoadingScreen';
import type {MainStack as MainStackType} from '@app/navigation/types';

type HomeScreenNavigationProp = StackNavigationProp<MainStackType, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export function HomeScreen(props: Props) {
  return (
    <Layout>
      <QueryErrorResetBoundary>
        {({reset}) => (
          <ErrorBoundary
            fallbackRender={props => (
              <ErrorScreen {...props} message={'Error loading home page'} />
            )}
            onReset={reset}>
            <React.Suspense fallback={<LoadingScreen />}>
              <OfferList {...props} />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Layout>
  );
}
