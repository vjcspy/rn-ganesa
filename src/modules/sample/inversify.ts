import {Container, injectable, inject} from "inversify";
import "reflect-metadata";

@injectable()
class Katana {
    public hit() {
        return "cut!";
    }
}

@injectable()
class Shuriken {
    public throw() {
        return "hit!";
    }
}

@injectable()
export class Ninja implements Ninja {
    constructor(public katana: Katana, protected shuriken: Shuriken) {
    }
    
    public fight() { return this.katana.hit(); };
    
    public sneak() { return this.shuriken.throw(); };
    
}

export const container = new Container();
container.bind<Ninja>(Ninja).toSelf();
container.bind<Katana>(Katana).toSelf();
container.bind<Shuriken>(Shuriken).toSelf();

