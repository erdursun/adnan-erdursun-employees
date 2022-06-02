import { UtilityService } from './utility.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DragableFileComponent } from './dragable-file/dragable-file.component';

@NgModule({
  declarations: [
    AppComponent,
    DragableFileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    UtilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
