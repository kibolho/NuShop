import {initPersistor} from '@app/services/persistor';
import {queryClient} from '@app/services/queryClient';
import storage from '@app/services/storage';
import {StorageKeys} from '@app/services/storage/keys';

describe('initPersistor tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should call get the cache from the async storage', async () => {
    const spyGetItem = jest.spyOn(storage, 'get');
    initPersistor(queryClient, storage);
    expect(spyGetItem).toBeCalledWith(StorageKeys.REACT_QUERY_OFFLINE_CACHE);
  });
});
