import {AsyncStorage} from "react-native";

export class Storage {
  
  getItem(key: string, callback?: (error: ?Error, result: ?string) => void): Promise<any> {
    return AsyncStorage.getItem(key, callback);
  }
  
  setItem(key: string, value: string, callback?: (error: ?Error) => void): Promise<any> {
    return AsyncStorage.setItem(key, value, callback);
  }
  
  removeItem(key: string, callback?: (error: ?Error) => void) {
    return AsyncStorage.removeItem(key, callback);
  }
}
