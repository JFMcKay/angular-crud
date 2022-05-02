import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { DatePipe } from '@angular/common';
// to use the reverse function for ngfor in html to show latest journal entry
import 'lodash';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})

export class ListUserComponent implements OnInit {
  Users: User[];

  constructor(
    private userService: UserService
    ) { }

  ngOnInit() {
    this.userService.getUserList().subscribe(res => {
      this.Users = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as User;
      })
    });    
  }

  removeUser = (user: User) => this.userService.deleteUser(user);
}