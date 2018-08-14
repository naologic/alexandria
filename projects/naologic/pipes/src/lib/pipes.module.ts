import {ModuleWithProviders, NgModule} from '@angular/core';
import {OrderByPipe} from './orderBy.pipe';

@NgModule({
  imports: [
  ],
  providers: [OrderByPipe],
  declarations: [
    OrderByPipe
  ],
  exports: [
    OrderByPipe
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
