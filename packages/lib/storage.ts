/**
 * Cross-platform storage abstraction layer
 * Uses AsyncStorage for React Native and localStorage for web
 * 
 * Note: Dette er AI produsert kode. Som følge av at local storage ikke er en thing på mobile,
 * noe jeg selvfølgelig ikke tenkte på da det ble satt opp på webappen (For sent å snu).
 * Rett og slett hvis man bruker mobile, bruk AsyncStorage for token handling osv. Hvis ikke, local storage.
 */

interface StorageInterface {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

class CrossPlatformStorage implements StorageInterface {
  private asyncStorage: any = null;
  private isWeb: boolean;

  constructor() {
    this.isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
    
    if (!this.isWeb) {
      try {
        // @ts-ignore - AsyncStorage is installed in mobile project
        this.asyncStorage = require('@react-native-async-storage/async-storage').default;
      } catch (error) {
        // Silently fail - we'll try dynamic import as fallback
      }
    }
  }

  async getItem(key: string): Promise<string | null> {
    if (this.isWeb) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error('Error getting item from localStorage:', error);
        return null;
      }
    }
    if (this.isWeb) return null;

    try {
      if (!this.asyncStorage) {
        // @ts-ignore - AsyncStorage is installed in mobile project
        const importPath = '@react-native-async-storage/async-storage';
        this.asyncStorage = (await eval(`import('${importPath}')`)).default;
      }
      return await this.asyncStorage.getItem(key);
    } catch (error) {
      console.error('Error getting item from AsyncStorage:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    if (this.isWeb) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error('Error setting item in localStorage:', error);
      }
      return;
    }

    if (this.isWeb) return;

    try {
      if (!this.asyncStorage) {
        // @ts-ignore - AsyncStorage is installed in mobile project
        const importPath = '@react-native-async-storage/async-storage';
        this.asyncStorage = (await eval(`import('${importPath}')`)).default;
      }
      await this.asyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting item in AsyncStorage:', error);
    }
  }

  async removeItem(key: string): Promise<void> {
    if (this.isWeb) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing item from localStorage:', error);
      }
      return;
    }

    if (this.isWeb) return;

    try {
      if (!this.asyncStorage) {
        // @ts-ignore - AsyncStorage is installed in mobile project
        const importPath = '@react-native-async-storage/async-storage';
        this.asyncStorage = (await eval(`import('${importPath}')`)).default;
      }
      await this.asyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from AsyncStorage:', error);
    }
  }
}

class SecureStorageImpl implements StorageInterface {
  private secureStore: any = null;
  private isWeb: boolean;
  private webFallback: CrossPlatformStorage;

  constructor() {
    this.isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
    this.webFallback = new CrossPlatformStorage();
    
    if (!this.isWeb) {
      try {
        // @ts-ignore - SecureStore is installed in mobile project
        this.secureStore = require('expo-secure-store');
      } catch (error) {
        // Silently fail - we'll try dynamic import as fallback
      }
    }
  }

  async getItem(key: string): Promise<string | null> {
    if (this.isWeb) {
      return this.webFallback.getItem(key);
    }

    try {
      if (!this.secureStore) {
        // @ts-ignore - SecureStore is installed in mobile project
        const importPath = 'expo-secure-store';
        this.secureStore = await eval(`import('${importPath}')`);
      }
      return await this.secureStore.getItemAsync(key);
    } catch (error) {
      console.error('Error getting item from SecureStore:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    if (this.isWeb) {
      return this.webFallback.setItem(key, value);
    }

    try {
      if (!this.secureStore) {
        // @ts-ignore - SecureStore is installed in mobile project
        const importPath = 'expo-secure-store';
        this.secureStore = await eval(`import('${importPath}')`);
      }
      await this.secureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error setting item in SecureStore:', error);
    }
  }

  async removeItem(key: string): Promise<void> {
    if (this.isWeb) {
      return this.webFallback.removeItem(key);
    }

    try {
      if (!this.secureStore) {
        // @ts-ignore - SecureStore is installed in mobile project
        const importPath = 'expo-secure-store';
        this.secureStore = await eval(`import('${importPath}')`);
      }
      await this.secureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing item from SecureStore:', error);
    }
  }
}

export const storage: StorageInterface = new CrossPlatformStorage();
export const secureStorage: StorageInterface = new SecureStorageImpl();
