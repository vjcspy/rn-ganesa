import {Error} from "../../framework/general/error";

function log(name) {
    return function decorator(t, n, descriptor) {
        console.log(t);
        const original = descriptor.value;
        if (typeof original === 'function') {
            descriptor.value = function (...args) {
                // console.log(`Arguments for ${name}: ${args}`);
                try {
                    const result = original.apply(this, args);
                    // console.log(`Result from ${name}: ${result}`);
                    return result;
                } catch (e) {
                    // console.log(`Error from ${name}: ${e}`);
                    throw e;
                }
            }
        }
        return descriptor;
    };
}

function Effect() {
    return function decorator(t, n, descriptor) {
        const original = descriptor.value;
        if (typeof original === 'function') {
            if (!t.hasOwnProperty("$effects")) {
                t["$effects"] = [];
            }
            t["$effects"].push(original);
        } else {
            throw new Error("Effect must be a function");
        }
        
        return descriptor;
    }
}

export class DecoratorsSample {
    @Effect()
    sum(a, b) {
        return a + b;
    }
    
    test(){
        console.log(this["$effects"]);
    }
}
