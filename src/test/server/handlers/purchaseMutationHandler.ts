import {graphql} from 'msw';
import {
  PurchaseMutation,
  PurchaseMutationVariables,
} from '@app/graphql/generated';

export const purchaseMutationHandler = graphql.mutation<
  PurchaseMutation,
  PurchaseMutationVariables
>('purchaseMutation', (req, res, ctx) => {
  console.log(Date.now(), 'API', 'purchaseMutationHandler', req.variables);

  return res(
    ctx.data({
      purchase: {
        customer: {
          balance: 995000,
        },
        success: true,
        errorMessage: null,
      },
    }),
  );
});
