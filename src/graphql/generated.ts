import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';

import {GraphQLClient} from 'graphql-request';
export type Maybe<T> = T | null;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  URL: any;
};

export type Customer = {
  __typename?: 'Customer';
  balance: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  offers: Array<Maybe<Offer>>;
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  purchase?: Maybe<PurchaseMutationResponse>;
};

export type MutationRootPurchaseArgs = {
  offerId: Scalars['ID'];
};

export type Offer = {
  __typename?: 'Offer';
  id: Scalars['ID'];
  price: Scalars['Int'];
  product: Product;
};

export type Product = {
  __typename?: 'Product';
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['URL'];
  name: Scalars['String'];
};

export type PurchaseMutationResponse = {
  __typename?: 'PurchaseMutationResponse';
  customer: Customer;
  errorMessage?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  viewer?: Maybe<Customer>;
};

export type PurchaseMutationVariables = Exact<{
  offerId: Scalars['ID'];
}>;

export type PurchaseMutation = {
  __typename?: 'MutationRoot';
  purchase?: Maybe<{
    __typename?: 'PurchaseMutationResponse';
    success: boolean;
    errorMessage?: Maybe<string>;
    customer: {__typename?: 'Customer'; balance: number};
  }>;
};

export type ViewerQueryVariables = Exact<{[key: string]: never}>;

export type ViewerQuery = {
  __typename?: 'QueryRoot';
  viewer?: Maybe<{
    __typename?: 'Customer';
    id: string;
    name: string;
    balance: number;
    offers: Array<
      Maybe<{
        __typename?: 'Offer';
        id: string;
        price: number;
        product: {
          __typename?: 'Product';
          id: string;
          name: string;
          description: string;
          image: any;
        };
      }>
    >;
  }>;
};

export const PurchaseMutationDocument = `
    mutation purchaseMutation($offerId: ID!) {
  purchase(offerId: $offerId) {
    customer {
      balance
    }
    success
    errorMessage
  }
}
    `;
export const usePurchaseMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    PurchaseMutation,
    TError,
    PurchaseMutationVariables,
    TContext
  >,
) =>
  useMutation<PurchaseMutation, TError, PurchaseMutationVariables, TContext>(
    (variables?: PurchaseMutationVariables) =>
      fetcher<PurchaseMutation, PurchaseMutationVariables>(
        client,
        PurchaseMutationDocument,
        variables,
      )(),
    options,
  );
export const ViewerQueryDocument = `
    query viewerQuery {
  viewer {
    id
    name
    balance
    offers {
      id
      price
      product {
        id
        name
        description
        image
      }
    }
  }
}
    `;
export const useViewerQuery = <TData = ViewerQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: ViewerQueryVariables,
  options?: UseQueryOptions<ViewerQuery, TError, TData>,
) =>
  useQuery<ViewerQuery, TError, TData>(
    ['viewerQuery', variables],
    fetcher<ViewerQuery, ViewerQueryVariables>(
      client,
      ViewerQueryDocument,
      variables,
    ),
    options,
  );
