import {ObjectManager as OM} from "../ObjectManager/ObjectManager";

export class ObjectManager extends OM {
    static $_instance;
    
    static getInstance(): ObjectManager {
        if (!(ObjectManager.$_instance instanceof ObjectManager)) {
            ObjectManager.$_instance = new ObjectManager();
        }
        return ObjectManager.$_instance;
    }
    
    static resolve<T>(className: any, ...args: any[]): T {
        const instace = ObjectManager.getInstance();
        
        return instace.i(className, ...args);
    }
}
