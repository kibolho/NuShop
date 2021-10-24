import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IStorage {
  set(
    key: string,
    value: string | Date | boolean | Record<string, unknown>,
  ): Promise<any>;
  get(key: string): Promise<any>;
  get(key: string): Promise<any>;
  del(key: string): Promise<any>;
}

class Storage implements IStorage {
  async set(
    key: string,
    value: string | Date | boolean | Record<string, unknown>,
  ): Promise<any> {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  async get(key: string): Promise<any> {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  async del(key: string): Promise<any> {
    return await AsyncStorage.removeItem(key);
  }
}

export default new Storage();
