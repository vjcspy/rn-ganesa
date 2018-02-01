import {injectable} from "inversify";
import * as _ from "lodash";

@injectable()
export class RoutesService {
    isAuthorizePage(routeName): boolean {
        return _.indexOf(["login"], routeName) > -1;
    }
}
