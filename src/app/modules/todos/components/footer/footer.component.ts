import { FilterEnum } from './../../types/filter.enum';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodosService } from 'src/app/modules/todos/services/todos.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [],
})
export class FooterComponent {
  noTodosClass$!: Observable<boolean>;
  activeCount$!: Observable<number>;
  itemsLeftText$!: Observable<string>;
  filterEnum = FilterEnum;
  filter$!: Observable<FilterEnum>;

  constructor(private todosService: TodosService) {
    this.activeCount$ = this.todosService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );

    this.filter$ = this.todosService.filter$;

    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
    );

    this.noTodosClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
  }

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();

    this.todosService.changeFilter(filterName);
  }
}
