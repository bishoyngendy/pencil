import { Injectable } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class UserService {
  constructor(
   public db: AngularFireDatabase,
   public afAuth: AngularFireAuth
 ) { }
  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = this.afAuth.onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  getUserData() {
    return new Promise<any>(async (resolve, reject) => {
        var user = await this.afAuth.currentUser;
        if (user) {
          this.db.database.ref(user.uid).once('value').then(res => {
              if (res.val() === null) {
              resolve({value: ''});
              } else {
                resolve(res.val());
              }
        }, err => reject(err))
        } else {
            reject("User not available")
        }
      })
  }

  updateCurrentUser(value: any) {
    return new Promise<any>(async (resolve, reject) => {
      var user = await this.afAuth.currentUser;
      if (user) {
        this.db.database.ref(user.uid).set({ value }).then(res => {
            resolve(res);
        }, err => reject(err))
      } else {
          reject("User not available")
      }
    })
  }
}
