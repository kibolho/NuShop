import {fireEvent, within} from '@testing-library/react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {offers} from '@app/test/data/offers';
import * as onlineStatus from '@app/providers/hooks/useOnlineStatus';
import * as viewer from '@app/screens/hooks/useViewer';

import {
  ERROR_SCREEN,
  OFFER_ITEM,
  LOADING_SCREEN,
  OFFER_DETAILS,
  HOME,
  SHIMMER,
  IMAGE,
} from '@app/test/testIDs';

import {HomeScreen} from '@app/screens/Home';
import {OfferDetailsScreen} from '@app/screens/OfferDetails';
import {render} from '@app/test/testUtils';
import {toCurrencyWithCode} from '@app/utils/currency';

const numOfOffers = 10;
const Stack = createStackNavigator();

function Component() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="OfferDetails" component={OfferDetailsScreen} />
    </Stack.Navigator>
  );
}

describe('Home component tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should display home', async () => {
    const {queryAllByTestId, queryByTestId, findByTestId, queryByText} = render(
      <Component />,
    );

    expect(queryByTestId(LOADING_SCREEN)).not.toBeNull();
    expect(await findByTestId(HOME)).not.toBeNull();
    expect(queryByTestId(LOADING_SCREEN)).toBeNull();
    expect(queryAllByTestId(OFFER_ITEM)).toHaveLength(numOfOffers);

    for (let i = 0; i < numOfOffers; i++) {
      expect(
        queryByText(`${toCurrencyWithCode(offers[i].price)}`),
      ).not.toBeNull();
      expect(queryByText(offers[i].product.name)).not.toBeNull();
      expect(
        queryByTestId(`${IMAGE}${offers[i].product.image}`),
      ).not.toBeNull();
    }
  });

  it('Should display the error screen if an exception is thrown', () => {
    jest.spyOn(viewer, 'useViewer').mockImplementation(() => {
      throw 'error';
    });
    const {queryByTestId} = render(<Component />);

    expect(queryByTestId(ERROR_SCREEN)).not.toBeNull();
  });

  it('Should navigate to the offer details screen', async () => {
    const {findByTestId, getByText} = render(<Component />);

    await findByTestId(HOME);

    fireEvent.press(getByText(offers[0].product.name));

    const offerDetails = within(await findByTestId(OFFER_DETAILS));

    expect(offerDetails.queryByText(offers[0].product.name)).not.toBeNull();
  });

  it('Should refetch on pull to refresh', async () => {
    const {findByTestId} = render(<Component />);

    const homeFlatList = await findByTestId(HOME);

    fireEvent.scroll(homeFlatList, {
      nativeEvent: {
        contentSize: {height: 600, width: 400},
        contentOffset: {y: -15000, x: 0},
        layoutMeasurement: {height: 100, width: 100},
      },
    });
    expect(await findByTestId(SHIMMER)).not.toBeNull();
  });

  it('Should enable the refresh control in online mode', async () => {
    jest.spyOn(onlineStatus, 'useOnlineStatus').mockImplementation(() => true);

    const {findByTestId} = render(<Component />);

    const homeFlatList = await findByTestId(HOME);

    expect(homeFlatList.props['refreshControl']).not.toBeUndefined();
  });

  it('Should not enable the refresh control in offline mode', async () => {
    jest.spyOn(onlineStatus, 'useOnlineStatus').mockImplementation(() => false);

    const {findByTestId} = render(<Component />);

    const homeFlatList = await findByTestId(HOME);

    expect(homeFlatList.props['refreshControl']).toBeUndefined();
  });
});
