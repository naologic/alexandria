import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TestValidators} from './test-validators';

enum DaysOfWeek {
  SUN = '1', MON = 'Monday', TUE = 'Tue', WED = 'Wed', THU = 'Thu', FRI = 'Fri', SAT = 'Sat'
}
enum DaysOfWeek2 {
  SUN, MON, TUE, WED, THU, FRI, SAT
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  private db = ['small', 1, '3', 2, {a: 'a'}];
  private obj = {small: 3,  large: 4};
  private obj2 = {
    small: {
      b: {
        c: '1'
      }
    }
  };


  public userForm: FormGroup;

  constructor() {
    this.userForm = new FormGroup({
      name: new FormControl('1', TestValidators.inObject(this.obj2, 'small.b.c')),
      email: new FormControl('small', TestValidators.inArray(this.db)),
      name2: new FormControl(1, TestValidators.inEnumKey(DaysOfWeek2)),
      size: new FormControl('small', TestValidators.inObjectKey(this.obj)),
    });
  }

  ngOnInit() {}

  get name() {
    return this.userForm.get('name') as FormControl;
  }

  get name2() {
    return this.userForm.get('name2') as FormControl;
  }

  get email() {
    return this.userForm.get('email') as FormControl;
  }

  get size() {
    return this.userForm.get('size') as FormControl;
  }
}
