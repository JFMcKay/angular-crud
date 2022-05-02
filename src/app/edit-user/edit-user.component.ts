import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {
  
  public editForm: FormGroup;
  userRef: any

  constructor(
    public userService: UserService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      feeling: [''],
      entry: ['']
    })
  }

  ngOnInit(): void {
    let id = this.act.snapshot.paramMap.get('id');

    this.userService.getUserDoc(id).subscribe(res => {
      this.userRef = res;
      this.editForm = this.formBuilder.group({
        date: [this.userRef.date],
        feeling: [this.userRef.feeling],
        entry: [this.userRef.entry]
      })      
    })
  }

  onSubmit() {
    let id = this.act.snapshot.paramMap.get('id');
    this.userService.updateUser(this.editForm.value, id);
    this.router.navigate(['list-users']);
  };

}