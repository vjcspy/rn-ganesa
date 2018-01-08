import {authModuleBoot} from "./auth/module";
import {posModuleBoot} from "./pos/module";

export function boot() {
  authModuleBoot();
  posModuleBoot();
}
