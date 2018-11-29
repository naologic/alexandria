import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { NaoValidators,NaoFormGroup, NaoFormBuilder } from '@naologic/forms';

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
  private obj = {'small': 3,  large: 4, medium: '4'};
  private obj2 = {
    small: {
      b: {
        c: '1'
      }
    }
  };
  public userForm: NaoFormGroup;
  public groupForm: NaoFormGroup;
  public mixedGroup: NaoFormGroup;


  constructor( private fb: NaoFormBuilder) {
    this.userForm = new NaoFormGroup({
      name: new FormControl('1', NaoValidators.inObject(this.obj2, 'small.b.c')),
      email: new FormControl(1, NaoValidators.inEnumKey(DaysOfWeek2)),
      name2: new FormControl('Monday', NaoValidators.inEnum(DaysOfWeek)),
      ssn: new FormControl('', NaoValidators.isSSN()),
      zip: new FormControl('65567', NaoValidators.isUSZip()),
      phone: new FormControl('123 445 6789', NaoValidators.isUSPhone()),
      size: new FormControl(null),
    });


    this.groupForm = this.fb.group({
      name_grp: 'tiger',
      weight: 80,
      animals: this.fb.array([
        this.fb.group({
          type: null,
          weight: null
        })
      ])
    }, {validator: NaoValidators.solveOne(['name_grp', '==', 'animals[0].type'], ['weight', '==', 'animals[0].weight'], ['weight', '==', 'animals[1].weight'])}) as NaoFormGroup;


    this.mixedGroup = new NaoFormGroup({
      userForm: this.userForm,
      groupForm: this.groupForm

    });

  }

  ngOnInit() {
    console.log(this.groupForm.controls.animals.value);


    this.groupForm.valueChanges.subscribe(console.log);
    this.send();
  }

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

  get ssn() {
    return this.userForm.get('ssn') as FormControl;
  }
  get zip() {
    return this.userForm.get('zip') as FormControl;
  }

  get phone() {
    return this.userForm.get('phone') as FormControl;
  }


  get name_grp() {
    return this.groupForm.get('name_grp') as FormControl;
  }
  get weight() {
    return this.groupForm.get('weight') as FormControl;
  }

  get animals() {
    return this.groupForm.get('animals') as FormArray;
  }

  send() {
    console.log(this.groupForm.value);
  }
  reset() {
    
    this.userForm.reset();
  }

  resetMixed() {
     this.userForm.reset();
     this.groupForm.reset();
  }

  addNewAnimal() {
    const animal = this.fb.group({
      type: '',
      weight: ''
    });
    this.animals.push(animal);
  }
  markAllDirty(){
    this.mixedGroup.markAllAsDirty();
  }
  markAllUntouched(){
    this.mixedGroup.markAllAsUntouched();
  }
  markAllPristine(){
    this.mixedGroup.markAllAsPristine();
  }
  deleteAnimal(index) {
    this.animals.removeAt(index);
  }

}
