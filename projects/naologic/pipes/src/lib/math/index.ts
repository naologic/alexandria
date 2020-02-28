import { NgModule } from '@angular/core';

import { BytesPipe } from './bytes.pipe';
import { CeilPipe } from './ceil.pipe';
import { FloorPipe } from './floor.pipe';
import { RoundPipe } from './round.pipe';
import { DegreesPipe } from './degrees.pipe';
import { RadiansPipe } from './radians.pipe';
import { RandomPipe } from './random.pipe';
import { SqrtPipe } from './sqrt.pipe';
import { PowPipe } from './pow.pipe';
import { FormatBytesPipe } from './format-bytes.pipe';

export * from './bytes.pipe';
export * from './ceil.pipe';
export * from './floor.pipe';
export * from './round.pipe';
export * from './degrees.pipe';
export * from './radians.pipe';
export * from './random.pipe';
export * from './sqrt.pipe';
export * from './pow.pipe';
export * from './format-bytes.pipe';

@NgModule({
  declarations: [
    BytesPipe,
    CeilPipe,
    FloorPipe,
    RoundPipe,
    DegreesPipe,
    RadiansPipe,
    RandomPipe,
    SqrtPipe,
    PowPipe,
    FormatBytesPipe
  ],
  exports: [
    BytesPipe,
    CeilPipe,
    FloorPipe,
    RoundPipe,
    DegreesPipe,
    RadiansPipe,
    RandomPipe,
    SqrtPipe,
    PowPipe,
    FormatBytesPipe
  ]
})
export class NgMathPipesModule {}
