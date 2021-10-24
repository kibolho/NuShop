import {GraphQLClient} from 'graphql-request';
import React from 'react';
import {BASE_URL, BEARER_TOKEN} from '@app/config/constants';

type Props = {
  children: React.ReactNode;
  defaultState?: GraphQLClientState;
};

export type GraphQLClientState = {
  graphQLClient: GraphQLClient;
};

export type GraphQLClientProviderState = GraphQLClientState | null;

export const GraphQLClientContext =
  React.createContext<GraphQLClientProviderState>(null);

const initialState: GraphQLClientState = {
  graphQLClient: new GraphQLClient(BASE_URL, {
    headers: {
      authorization: `Bearer ${BEARER_TOKEN}`,
    },
  }),
};

export function GraphQLClientProvider({children, defaultState}: Props) {
  return (
    <GraphQLClientContext.Provider value={defaultState || initialState}>
      {children}
    </GraphQLClientContext.Provider>
  );
}
