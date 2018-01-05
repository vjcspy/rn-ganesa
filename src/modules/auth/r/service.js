import firebase from "react-native-firebase";
import {Subject} from "rxjs";

class AuthSerivce {
  userChangeObservable;
  
  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  
  onUserChange() {
    if (!this.userChangeObservable) {
      this.userChangeObservable = new Subject();
      firebase.auth().onUserChanged((user) => this.userChangeObservable.next(user));
    }
    return this.userChangeObservable.asObservable().share();
  }
  
  logout() {
    return firebase.auth().signOut();
  }
}

export const authService = new AuthSerivce();

