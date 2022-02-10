import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { TodosService } from 'src/app/modules/todos/services/todos.service';
import { TodoInterface } from 'src/app/modules/todos/types/todo.interface';
import { map } from 'rxjs/operators';
import { FilterEnum } from 'src/app/modules/todos/types/filter.enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  visibleTodos$!: Observable<TodoInterface[]>;
  noTodoClass$!: Observable<boolean>;

  constructor(private todosService: TodosService) {
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );

    this.visibleTodos$ = combineLatest(
      this.todosService.todos$,
      this.todosService.filter$
    ).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        } else {
          return todos;
        }
      })
    );
  }

  ngOnInit(): void {}
}
