import {Platform, NativeModules} from "react-native";

export function getStatusBarHeight() {
    const {StatusBarManager} = NativeModules;
    
    let STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
    
    StatusBarManager.getHeight((statusBarHeight) => {
        STATUSBAR_HEIGHT = statusBarHeight;
    });
    
    return STATUSBAR_HEIGHT;
}
