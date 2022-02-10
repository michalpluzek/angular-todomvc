import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoModel } from 'src/app/modules/todos/models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<TodoModel[]>([]);

  constructor() {}

  addTodo(text: string): void {
    const newTodo: TodoModel = {
      id: this.generateId(),
      text,
      isCompleted: false,
    };
    const updatedTodos = [...this.todos$.getValue(), newTodo];

    this.todos$.next(updatedTodos);
  }

  generateId() {
    return Math.random().toString(16);
  }
}
