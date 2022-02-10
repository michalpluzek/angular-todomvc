import { Component, Input, OnInit } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [],
})
export class TodoComponent implements OnInit {
  @Input('todo') todoProps: TodoInterface = {} as TodoInterface;

  constructor() {}

  ngOnInit(): void {}
}
