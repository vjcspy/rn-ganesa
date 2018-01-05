import firebase from "react-native-firebase";

class AuthSerivce {
  async login(email, password) {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  }
}

export const authService = new AuthSerivce();

