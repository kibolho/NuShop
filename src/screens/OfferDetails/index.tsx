import {ErrorBoundary} from 'react-error-boundary';
import {QueryErrorResetBoundary} from 'react-query';
import React from 'react';
import {OfferDetails} from './OfferDetails';
import {ErrorScreen} from '@app/components/ErrorScreen';
import {Layout} from '@app/components/Layout';
import {LoadingScreen} from '@app/components/LoadingScreen';

type Props = React.ComponentProps<typeof OfferDetails>;

export function OfferDetailsScreen(props: Props) {
  return (
    <Layout>
      <QueryErrorResetBoundary>
        {({reset}) => (
          <ErrorBoundary
            fallbackRender={props => (
              <ErrorScreen {...props} message={'Error loading offer details'} />
            )}
            onReset={reset}>
            <React.Suspense fallback={<LoadingScreen />}>
              <OfferDetails {...props} />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Layout>
  );
}
