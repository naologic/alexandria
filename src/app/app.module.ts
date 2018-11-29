import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NaoFormsModule, NaoFormBuilder } from '@naologic/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NaoFormsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [NaoFormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
