import {offers} from './offers';
import {Customer} from '@app/graphql/generated';

function generateViewer() {
  let viewer: Customer = {
    id: 'cccc3f48-dd2c-43ba-b8de-8945e7ababab',
    name: 'Jerry Smith',
    balance: 1000000,
    offers,
  };
  return viewer;
}

export const viewer = generateViewer();
