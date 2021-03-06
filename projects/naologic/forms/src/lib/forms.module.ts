import {ModuleWithProviders, NgModule} from '@angular/core';
import {NaoForm} from './nao-form.class';
import {CurrencyPipe} from '@angular/common';

@NgModule({
  imports: [
  ],
  declarations: [NaoForm],
  providers: [],
  exports: []
})
export class NaoFormsModule {
  static forRoot(options?): ModuleWithProviders {
    return {
      ngModule: NaoFormsModule
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: NaoFormsModule
    };
  }
}
