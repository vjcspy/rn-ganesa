import {Map} from "immutable";
import * as _ from "lodash";
import {replaceModuleEffects} from "../redux/effects";
import {app} from "../general/app";
import {Error} from "../general/error";

export class EffectsModule {
    static $effects    = Map({});
    static $subscriber = Map();
    
    static run(className: any) {
        const instance: any = app().resolve(className);
        let target          = Object.getPrototypeOf(instance);
        const keys: any     = EffectsModule.$effects.get(target);
        let observables     = _.map(keys, (key: string) => {
            return action$ => {
                if (!EffectsModule.$subscriber.get(target)) {
                    if (!instance.hasOwnProperty("actions$")) {
                        throw new Error("check_effects_it_must_have_actions$_property");
                    }
                    action$.subscribe(instance.actions$);
                    EffectsModule.$subscriber = EffectsModule.$subscriber.set(target, true);
                }
                return instance[key];
            };
        });
        replaceModuleEffects(observables);
    }
}

export function Effect() {
    return function (target, propertyName) {
        let effects = <any>EffectsModule.$effects.get(target);
        if (!effects) {
            effects = [];
        }
        effects.push(propertyName);
        EffectsModule.$effects = EffectsModule.$effects.set(target, effects);
    };
}
