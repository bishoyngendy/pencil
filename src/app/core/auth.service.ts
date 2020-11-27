import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.default.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }
}
