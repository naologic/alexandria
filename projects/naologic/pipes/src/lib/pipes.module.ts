import {ModuleWithProviders, NgModule} from '@angular/core';
// import {OrderByPipe} from './orderBy.pipe';

import { NgAggregatePipesModule } from './aggregate/index';
import { NgArrayPipesModule } from './array/index';
import { NgBooleanPipesModule } from './boolean/index';
import { NgMathPipesModule } from './math/index';
import { NgStringPipesModule } from './string/index';
import { NgObjectPipesModule } from './object/index';

@NgModule({
  imports: [
    NgObjectPipesModule,
    NgStringPipesModule,
    NgArrayPipesModule,
    NgAggregatePipesModule,
    NgBooleanPipesModule,
    NgMathPipesModule,
  ],
  providers: [],
  declarations: [
    // OrderByPipe,
  ],
  exports: [
    // OrderByPipe,
    NgArrayPipesModule,
    NgAggregatePipesModule,
    NgBooleanPipesModule,
    NgMathPipesModule,
    NgStringPipesModule,
    NgObjectPipesModule
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
