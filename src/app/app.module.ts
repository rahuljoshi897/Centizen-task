import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UserDataService } from "./services/user-data.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { DisplayComponent } from './components/display/display.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	ReactiveFormsModule,
  
  ],
  providers: [UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
