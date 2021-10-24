import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {graphql} from 'msw';
import * as purchaseHook from '@app/screens/hooks/usePurchase';
import {OfferDetailsScreen} from '@app/screens/OfferDetails';
import {offers} from '@app/test/data/offers';
import {
  ERROR_SCREEN,
  IMAGE,
  MODAL_TITLE_DESCRIPTION,
  OFFER_DETAILS,
  PURCHASE_BUTTON,
} from '@app/test/testIDs';
import {fireEvent, render, waitFor} from '@app/test/testUtils';
import {toCurrencyWithCode} from '@app/utils/currency';
import {server} from '@app/test/server';
import {
  PurchaseMutation,
  PurchaseMutationVariables,
} from '@app/graphql/generated';

const Stack = createStackNavigator();

function Component() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OfferDetails"
        component={OfferDetailsScreen}
        initialParams={{offer: offers[0]}}
      />
    </Stack.Navigator>
  );
}

describe('OfferDetails component tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should display offer details', async () => {
    const {queryByTestId, queryByText} = render(<Component />);

    expect(queryByTestId(OFFER_DETAILS)).not.toBeNull();

    expect(queryByText(offers[0].product.name)).not.toBeNull();
    expect(queryByTestId(`${IMAGE}${offers[0].product.image}`)).not.toBeNull();
    expect(queryByText(offers[0].product.description)).not.toBeNull();
    expect(queryByText(toCurrencyWithCode(offers[0].price))).not.toBeNull();
  });

  it('Should display the error screen if an exception is thrown', () => {
    jest.spyOn(purchaseHook, 'usePurchase').mockImplementation(() => {
      throw 'error';
    });
    const {queryByTestId} = render(<Component />);

    expect(queryByTestId(ERROR_SCREEN)).not.toBeNull();
  });

  it('Should be able to buy', async () => {
    const {queryByTestId, queryByText} = render(<Component />);

    const purchaseButton = queryByTestId(PURCHASE_BUTTON);
    expect(purchaseButton).not.toBeNull();

    fireEvent.press(purchaseButton);

    await waitFor(async () =>
      expect(queryByTestId(MODAL_TITLE_DESCRIPTION)).not.toBeNull(),
    );
    expect(queryByText('Sucesso')).not.toBeNull();
  });
  it('Should not be able to buy', async () => {
    const errorMessage = "You don't have that much money";
    // Mock the API mutation to throw a GraphQL error
    server.use(
      graphql.mutation<PurchaseMutation, PurchaseMutationVariables>(
        'purchaseMutation',
        (req, res, ctx) => {
          console.log(
            Date.now(),
            'API',
            'purchaseMutation',
            'throw error',
            req.variables,
          );
          return res(
            ctx.data({
              purchase: {
                success: false,
                errorMessage: errorMessage,
              },
            }),
          );
        },
      ),
    );

    const {queryByTestId, queryByText} = render(<Component />);

    const purchaseButton = queryByTestId(PURCHASE_BUTTON);
    expect(purchaseButton).not.toBeNull();

    fireEvent.press(purchaseButton);

    await waitFor(async () =>
      expect(queryByTestId(MODAL_TITLE_DESCRIPTION)).not.toBeNull(),
    );
    expect(queryByText(errorMessage)).not.toBeNull();
  });
});
