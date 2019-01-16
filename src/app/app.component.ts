import {Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { NaoValidators, NaoFormGroup, NaoFormBuilder, NaoFormControl, NaoFormArray } from '@naologic/forms';
import { mapValues } from 'lodash';

enum DaysOfWeek {
  SUN = '1', MON = 'Monday', TUE = 'Tue', WED = 'Wed', THU = 'Thu', FRI = 'Fri', SAT = 'Sat'
}
enum DaysOfWeek2 {
  SUN, MON, TUE, WED, THU, FRI, SAT
}

interface LoginLog {
  id: string;
  timestamp: number;
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
  touchedValues: String[];
  public testForm: NaoFormGroup;
  public naoFormGroup: NaoFormGroup;
  public formArray: NaoFormArray;



  constructor( private fb: NaoFormBuilder) {
    this.userForm = new NaoFormGroup({
      name: new NaoFormControl('1', { validators: [ NaoValidators.minLength(5), NaoValidators.inObject(this.obj2, 'small.b.c') ]} ),
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
    }, {validators: NaoValidators.solveOne(['name_grp', '==', 'animals[0].type'], ['weight', '==', 'animals[0].weight'], ['weight', '==', 'animals[1].weight'])});


    this.mixedGroup = new NaoFormGroup({
      userForm: this.userForm,
      groupForm: this.groupForm
    });

    this.testForm = new NaoFormGroup({
      name: new NaoFormControl(),
      loginLog: new NaoFormArray([
        new NaoFormGroup({
          id: new NaoFormControl('1'),
          timestamp: new NaoFormControl('872634782348', NaoValidators.minLength(5))
        }),
        new NaoFormGroup({
          id: new NaoFormControl('2'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('3'),
          timestamp: new NaoFormControl(872634782348)
        })
      ])
   });
   this.naoFormGroup = new NaoFormGroup({
    firstName: new NaoFormControl('John', Validators.minLength(7)),
    lastName: new NaoFormControl('Doe'),
    // -->  'ssn' Form control with invalid value
    ssn: new NaoFormControl('000 00 0000', NaoValidators.isSSN()),
  });


  }

  ngOnInit() {
 this.groupForm.valueChanges.subscribe(console.log);
 this.send();
 this.checkErrors();
  }
  checkErrors() {
    const firstNameControl = this.naoFormGroup.getAsNaoFormControl('firstName');
    console.log('control hasErrors: ', firstNameControl.hasErrors());
   console.log('naoFomGroup hasErrors: ', this.naoFormGroup.hasErrors());
  }
  nameChanged() {
    console.log('has errors :', this.mixedGroup.hasErrors());
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
  markAllDirty() {
    this.mixedGroup.markAllAsDirty();
  }
  markAllUntouched() {
    this.mixedGroup.markAllAsUntouched();
  }
  markAllPristine() {
    this.mixedGroup.markAllAsPristine();
  }
  deleteAnimal(index) {
    this.animals.removeAt(index);
  }
}


