import {AsyncStorage} from "react-native";

export class Storage {
    
    getItem(key: string, callback?: (error: any, result: any) => void): Promise<any> {
        return AsyncStorage.getItem(key, callback);
    }
    
    setItem(key: string, value: string, callback?: (error: any) => void): Promise<any> {
        return AsyncStorage.setItem(key, value, callback);
    }
    
    removeItem(key: string, callback?: (error: any) => void) {
        return AsyncStorage.removeItem(key, callback);
    }
}
