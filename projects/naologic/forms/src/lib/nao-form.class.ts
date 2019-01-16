import {NgForm} from '@angular/forms';

export class NaoForm extends NgForm {
  constructor(
    validators: any[],
    asyncValidators: any[]
  ) {
    super(validators, asyncValidators);
  }

}
