import { Component } from '@angular/core';
import { TodosService } from 'src/app/modules/todos/services/todos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  text: string = '';

  constructor(private todosService: TodosService) {
    this.todosService.todos$.subscribe((todos) => console.log(todos));
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo(): void {
    this.todosService.addTodo(this.text);
    this.text = '';
  }
}
