import {Offer} from '@app/graphql/generated';

function generateOffers() {
  let offers: Offer[] = [];
  for (let i = 1; i <= 30; i++) {
    offers.push({
      id: `${i}`,
      price: i * 100,
      product: {
        id: `product ${i}`,
        name: `name ${i}`,
        description: `description ${i}`,
        image: `image ${i}`,
      },
    });
  }
  return offers;
}

export const offers = generateOffers();
