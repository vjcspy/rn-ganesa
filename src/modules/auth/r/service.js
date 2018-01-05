import firebase from "react-native-firebase";
import {Subject} from "rxjs";

class AuthSerivce {
  userChangeObservable;
  
  async login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  
  onUserChange() {
    if (!this.userChangeObservable) {
      this.userChangeObservable = new Subject();
      firebase.auth().onUserChanged((user) => this.userChangeObservable.next(user));
    }
    return this.userChangeObservable.asObservable();
  }
}

export const authService = new AuthSerivce();

