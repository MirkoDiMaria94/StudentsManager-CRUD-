import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsCreateComponent } from './components/students-create/students-create.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentsEditComponent } from './components/students-edit/students-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-students' },
  { path: 'create-students', component: StudentsCreateComponent },
  { path: 'edit-students/:id', component: StudentsEditComponent },
  { path: 'students-list', component: StudentsListComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }