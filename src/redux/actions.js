export class Actions {
  static actionInstances = {};
         dispatch;
  
  init(instanceName: string, dispatch: any, i: any) {
    if (!Actions.actionInstances.hasOwnProperty(instanceName)) {
      Actions.actionInstances[instanceName] = i;
    }
    if (dispatch) {
      Actions.actionInstances[instanceName].dispatch = dispatch;
    }
    return Actions.actionInstances[instanceName];
  }
}
