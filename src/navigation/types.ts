import {Offer} from '@app/graphql/generated';

export type MainStack = {
  Home: undefined;
  OfferDetails: {
    offer: Offer;
  };
};
