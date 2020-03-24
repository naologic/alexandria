import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NaoFormBuilder, NaoMaskModule, IConfig } from '@naologic/forms';
import { AppComponent } from './app.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      NaoMaskModule.forRoot(options)
    ],
  providers: [NaoFormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
