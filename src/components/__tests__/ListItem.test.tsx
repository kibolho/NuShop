import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {OfferItem} from '@app/components/OfferItem';
import {offers} from '@app/test/data/offers';
import {IMAGE, OFFER_ITEM} from '@app/test/testIDs';
import {toCurrencyWithCode} from '@app/utils/currency';

const offer = offers[0];

describe('OfferItem component tests', () => {
  it('Should display a list item with the title', () => {
    const mockOnPress = jest.fn();
    const {queryByText, queryByTestId} = render(
      <OfferItem item={offer} onPress={mockOnPress} />,
    );

    expect(queryByText(`${toCurrencyWithCode(offer.price)}`)).not.toBeNull();
    expect(queryByText(offer.product.name)).not.toBeNull();
    expect(queryByTestId(`${IMAGE}${offer.product.image}`)).not.toBeNull();
  });

  it('Should not render a list item if the provided item is null', () => {
    const item = null;
    const mockOnPress = jest.fn();

    const {queryByTestId} = render(
      <OfferItem item={item} onPress={mockOnPress} />,
    );

    expect(queryByTestId(OFFER_ITEM)).toBeNull();
  });

  it('Should call the onPress function with press the list item button', () => {
    const mockOnPress = jest.fn();
    const {getByTestId} = render(
      <OfferItem item={offer} onPress={mockOnPress} />,
    );

    fireEvent.press(getByTestId(OFFER_ITEM));
    expect(mockOnPress.mock.calls.length).toBe(1);
  });
});
