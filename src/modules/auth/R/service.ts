import firebase from "react-native-firebase";
import {Subject} from "rxjs";
import {injectable} from "inversify";

@injectable()
export class AuthService {
    userChangeObservable: Subject<any>;
    
    getFirebase(): any {
        return firebase;
    }
    
    login(email, password) {
        return this.getFirebase().auth().signInWithEmailAndPassword(email, password);
    }
    
    onUserChange() {
        if (!this.userChangeObservable) {
            this.userChangeObservable = new Subject();
            this.getFirebase().auth().onUserChanged((user) => this.userChangeObservable.next(user));
        }
        return this.userChangeObservable.asObservable().share();
    }
    
    logout() {
        return this.getFirebase().auth().signOut();
    }
}

