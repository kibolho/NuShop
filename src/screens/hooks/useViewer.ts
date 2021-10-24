import {Offer, useViewerQuery} from '../../graphql/generated';

import {useGraphQLClient} from '@app/providers/hooks/useGraphQLClient';

export function useViewer() {
  const {graphQLClient} = useGraphQLClient();

  const queryInfo = useViewerQuery(graphQLClient, undefined, {
    suspense: true,
    useErrorBoundary: false,
    onSuccess: () => {
      console.log(Date.now(), 'Fetching viewer data succeed');
    },
    onError: e => {
      console.log(Date.now(), 'Fetching viewer data error', e);
    },
  });

  return {
    ...queryInfo,
    viewer: queryInfo.data?.viewer,
    offers: (queryInfo.data?.viewer?.offers ?? []) as Offer[],
    refetch: queryInfo.refetch,
  };
}
