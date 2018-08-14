import {ModuleWithProviders, NgModule} from '@angular/core';

@NgModule({
  imports: [],
  declarations: [],
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
