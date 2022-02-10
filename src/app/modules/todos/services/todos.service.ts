import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoInterface } from 'src/app/modules/todos/types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  constructor() {}

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
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

  toggleAll(isCompleted: boolean): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });

    this.todos$.next(updatedTodos);
  }

  changeFilter(filterName: FilterEnum): void {
    this.filter$.next(filterName);
  }
}
