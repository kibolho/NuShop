import {useQueryClient} from 'react-query';
import {Customer, usePurchaseMutation} from '../../graphql/generated';
import {useGraphQLClient} from '@app/providers/hooks/useGraphQLClient';
import {useModal} from '@app/providers/hooks/useModal';
import {ModalTypes} from '@app/components/Modal/ModalManager';

export function usePurchase() {
  const {graphQLClient} = useGraphQLClient();
  const queryClient = useQueryClient();
  const {pushModal} = useModal();
  const mutation = usePurchaseMutation(graphQLClient, {
    onMutate: async offer => {
      console.log(Date.now(), 'Request Purchase ', offer);
      return {offer};
    },
    onSuccess: data => {
      console.log(Date.now(), 'Response Purchase ', data);
      if (data.purchase?.success) {
        const newBalance = data.purchase?.customer.balance;
        const previousViewer = queryClient.getQueryData<{viewer: Customer}>([
          'viewerQuery',
          undefined,
        ]);
        queryClient.setQueryData(['viewerQuery', undefined], {
          viewer: {
            ...previousViewer?.viewer,
            balance: newBalance,
          },
        });

        pushModal({
          modalType: ModalTypes.TitleDescription,
          modalProps: {
            title: 'Sucesso',
            description: 'Compra realizada',
          },
        });
      } else {
        pushModal({
          modalType: ModalTypes.TitleDescription,
          modalProps: {
            title: 'Ops',
            description: data.purchase?.errorMessage ?? 'Erro desconhecido',
          },
        });
      }
    },
    onError: (err, purchase) => {
      console.log(Date.now(), 'Purchase of ', purchase.offerId, 'error', err);
      let msg = 'Erro desconhecido';
      if (typeof err === 'string') {
        msg = err;
      }
      pushModal({
        modalType: ModalTypes.TitleDescription,
        modalProps: {
          title: 'Ops',
          description: msg,
        },
      });
    },
  });

  return mutation;
}
