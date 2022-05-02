import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../app/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private angularFirestore: AngularFirestore,
  ) {}

  getUserDoc(id: string) {
    return this.angularFirestore
    .collection('user-collection')
    .doc(id)
    .valueChanges()
  }

  getUserList() { 
    return this.angularFirestore
    .collection("user-collection")
    .snapshotChanges();
  }

  createUser(user: User) {
    return new Promise<any>((resolve, reject) =>{
      this.angularFirestore
        .collection("user-collection")
        .add(user)
        .then(response => { console.log(response) }, error => reject(error));
    });
  }

  deleteUser(user: User) {
    return this.angularFirestore
      .collection("user-collection")
      .doc(user.id)
      .delete();
  }

  updateUser(user: User, id : string) {
    return this.angularFirestore
      .collection("user-collection")
      .doc(id)
      .update({
        date: new Date(Date.now()),
        feeling: user.feeling,
        entry: user.entry
      });
  }
}