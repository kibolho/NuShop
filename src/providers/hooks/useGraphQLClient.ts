import {GraphQLClientContext} from '@app/providers/GraphQLClientProvider';
import React from 'react';

export function useGraphQLClient() {
  const contextValue = React.useContext(GraphQLClientContext);

  if (!contextValue) {
    throw new Error(
      'Wrap your components tree with a GraphQLClientProvider component',
    );
  }

  return contextValue;
}
