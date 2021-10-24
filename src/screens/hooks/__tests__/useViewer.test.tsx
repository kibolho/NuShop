import {renderHook} from '@testing-library/react-hooks';
import {useViewer} from '../useViewer';
import {createWrapper} from '@app/test/testUtils';

describe('useViewer hook tests', () => {
  it('Should fetch', async () => {
    const wrapper = createWrapper();
    const {result, waitForNextUpdate} = renderHook(() => useViewer(), {
      wrapper,
    });

    await waitForNextUpdate();
    expect(result.current.isFetched).toBeTruthy();
  });
});
