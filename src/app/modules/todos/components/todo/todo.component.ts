import { TodosService } from 'src/app/modules/todos/services/todos.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [],
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo') todoProps: TodoInterface = {} as TodoInterface;
  @Input('isEditing') isEditingProps: boolean = false;
  @Output('setEditingId') setEditingEvent: EventEmitter<string | null> =
    new EventEmitter();
  editingText: string = '';
  @ViewChild('textInput') textInput!: ElementRef;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isEditingProps.currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode(): void {
    this.setEditingEvent.emit(this.todoProps.id);
  }

  removeTodo(): void {
    this.todosService.removeTodo(this.todoProps.id);
  }

  toggleTodo(): void {
    this.todosService.toggleTodo(this.todoProps.id);
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.editingText = target.value;
  }

  changeTodo(): void {
    this.todosService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingEvent.emit(null);
  }
}
