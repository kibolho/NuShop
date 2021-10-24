import {graphql} from 'msw';
import {viewer} from '@app/test/data/viewer';
import {ViewerQuery, ViewerQueryVariables} from '@app/graphql/generated';

export const viewerQueryHandler = graphql.query<
  ViewerQuery,
  ViewerQueryVariables
>('viewerQuery', (req, res, ctx) => {
  console.log(Date.now(), 'API', 'viewerQuery', req.variables);

  return res(
    ctx.data({
      viewer: viewer,
    }),
  );
});
