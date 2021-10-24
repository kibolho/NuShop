import {QueryClient} from 'react-query';
import {createAsyncStoragePersistor} from 'react-query/createAsyncStoragePersistor-experimental';
import {persistQueryClient} from 'react-query/persistQueryClient-experimental';
import Storage, {IStorage} from '../storage';
import {APP_VERSION} from '@app/config/constants';

const persistor = (storage: IStorage) =>
  createAsyncStoragePersistor({
    storage: {
      getItem: storage.get,
      removeItem: storage.del,
      setItem: storage.set,
    },
  });

export function initPersistor(
  queryClient: QueryClient,
  storage: IStorage = Storage,
) {
  persistQueryClient({
    queryClient,
    persistor: persistor(storage),
    buster: APP_VERSION,
  });
}
