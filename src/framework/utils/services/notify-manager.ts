import {injectable} from "inversify";
import {app} from "../../general/app";

@injectable()
export class NotifyManager {
    public success(mess: string, title: string = null, options: Object = null): void {
    }

    public warning(mess: string, title: string = null, options: Object = null): void {
    }

    public info(mess: string, title: string = null, options: Object = null): void {
    }

    public error(mess: string, title: string = null, options: Object = null): void {
    }
}

app().register(NotifyManager);