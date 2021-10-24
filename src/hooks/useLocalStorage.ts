import Storage, {IStorage} from '../services/storage';
import {useCallback, useEffect, useState} from 'react';

import React from 'react';
import {StorageKeys} from '../../lib/storage/keys';

const getKeyValue = async (
  storage: IStorage,
  key: any,
  initialValue: any,
  setValue: (arg: any) => any,
): Promise<void> => {
  try {
    const item = await storage.get(key);
    setValue(item ?? initialValue);
  } catch (error) {
    return initialValue;
  }
};

const useFetch = (storage: IStorage, key: any, initialValue: any): any => {
  const [value, setValue] = useState();

  useEffect(() => {
    getKeyValue(storage, key, initialValue, setValue);
  }, []);

  return value;
};

function useLocalStorage<T = any>(
  key: StorageKeys,
  initialValue: T,
  storage: IStorage = Storage,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const fetchValue = useFetch(storage, key, initialValue);
  const [storedValue, setStoredValue] = useState<T>(fetchValue);

  useEffect(() => {
    setStoredValue(fetchValue);
  }, [fetchValue]);

  const setValue = useCallback(
    value => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        storage.set(key, valueToStore);
      } catch (error) {
        console.log(error);
      }
    },
    [key, storage, storedValue],
  );

  return [storedValue || initialValue, setValue];
}

export default useLocalStorage;
