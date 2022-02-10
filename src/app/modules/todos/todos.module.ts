import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from 'src/app/modules/todos/components/todos/todos.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/modules/todos/components/header/header.component';
import { MainComponent } from 'src/app/modules/todos/components/main/main.component';
import { TodoComponent } from 'src/app/modules/todos/components/todo/todo.component';

const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  },
];

@NgModule({
  declarations: [TodosComponent, HeaderComponent, MainComponent, TodoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TodosModule {}
