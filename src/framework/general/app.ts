import {Container} from "inversify";
import {Map} from "immutable";
import {Error} from "./error";
import "reflect-metadata";

class App {
    static $instace;
    
    protected container;
    protected classNameBinding = Map();
    
    static getInstance() {
        if (!App.$instace) {
            App.$instace = new App();
        }
        
        return App.$instace;
    }
    
    protected getContainer(): Container {
        if (typeof this.container === "undefined") {
            this.container = new Container();
        }
        
        return this.container;
    }
    
    resolve<T>(name: any): T {
        return this.getContainer().resolve(name);
    }
    
    register(name: any): void {
        if (!!this.classNameBinding.get(name.name)) {
            throw new Error("This class has been register");
        }
        this.getContainer().bind(name).toSelf();
    }
}

export const app = (): App => App.getInstance();
