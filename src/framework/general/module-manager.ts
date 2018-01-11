import {Error} from "./error";
import {Map} from "immutable";
import {app} from "./app";
import * as _ from 'lodash';

export interface ModuleConfig {
    name: string,
    boot: () => void;
    services: any[]
}

export class ModuleManager {
    static $modules = Map();
    static booted   = false;
    
    static register(config: ModuleConfig) {
        const exited = ModuleManager.$modules.get(config.name);
        if (!exited) {
            ModuleManager.$modules = ModuleManager.$modules.set(config.name, config.boot);
            _.forEach(config.services, (s) => app().register(s));
        }
    }
    
    static boot(moduleConfigs: ModuleConfig[] = []) {
        _.forEach(moduleConfigs, (c) => ModuleManager.register(c));
        
        if (!ModuleManager.booted) {
            ModuleManager.$modules.forEach((f: any) => f());
        } else {
            throw new Error("wtf, duplicate boot module");
        }
    }
}
