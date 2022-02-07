import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionsListPageComponent } from './components/sessions-list-page/sessions-list-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './sessions.routing';
import { SharedModule } from '../shared/shared.module';
import { AddExcerciseFormComponent } from './components/add-excercise-form/add-excercise-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SessionsListPageComponent,
    AddExcerciseFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SessionsModule { }
