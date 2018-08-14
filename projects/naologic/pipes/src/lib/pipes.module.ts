import {ModuleWithProviders, NgModule} from '@angular/core';
import {OrderPipe} from './orderBy.pipe';

@NgModule({
  imports: [
  ],
  providers: [OrderPipe],
  declarations: [
    OrderPipe
  ],
  exports: [
    OrderPipe
  ]
})
export class NaoPipesModule {
  static forRoot(options?): ModuleWithProviders {
    return {
      ngModule: NaoPipesModule
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: NaoPipesModule
    };
  }
}
