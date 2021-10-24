import React from 'react';
import {DarkTheme, DefaultTheme} from '@app/styles/themes';

import {MainStack} from '@app/navigation/MainStack';
import {HOME} from '@app/test/testIDs';
import {render} from '@app/test/testUtils';

it('Should display home screen in light mode', async () => {
  const {findByTestId} = render(<MainStack />, undefined, 'light');

  const offerList = await findByTestId(HOME);
  expect(offerList).not.toBeNull();
  expect(offerList).toHaveStyle({
    backgroundColor: DefaultTheme.colors.background,
  });
});

it('Should display home screen in dark mode', async () => {
  const {findByTestId} = render(<MainStack />, undefined, 'dark');

  const offerList = await findByTestId(HOME);
  expect(offerList).not.toBeNull();
  expect(offerList).toHaveStyle({
    backgroundColor: DarkTheme.colors.background,
  });
});
