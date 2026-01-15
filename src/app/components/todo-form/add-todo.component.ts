import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TodoActions } from '../../store/todo/todo.actions';
import { selectLoading } from '../../store/todo/todo.selectors';

@Component({
  selector: 'app-todo-form',
  template: `
    <form [formGroup]="todoForm" (ngSubmit)="onSubmit()">
      <input 
        type="text" 
        formControlName="title" 
        placeholder="Add a new todo..."
        [disabled]="loading$ | async"
      >
      
      <textarea 
        formControlName="description" 
        placeholder="Description (optional)"
        [disabled]="loading$ | async"
      ></textarea>
      
      <button type="submit" [disabled]="todoForm.invalid || (loading$ | async)">
        {{ (loading$ | async) ? 'Adding...' : 'Add Todo' }}
      </button>
      
      <div *ngIf="todoForm.get('title')?.invalid && todoForm.get('title')?.touched">
        Title is required
      </div>
    </form>
  `
})
export class TodoFormComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  
  readonly loading$ = this.store.select(selectLoading);
  
  todoForm = this.fb.group({
    title: ['', Validators.required],
    description: ['']
  });

  onSubmit() {
    if (this.todoForm.valid) {
      const { title, description } = this.todoForm.value;
      
      // Dispatch action - effects will handle API call
      this.store.dispatch(TodoActions.addTodo({ 
        title: title!, 
        description: description 
      }));
      
      this.todoForm.reset();
    }
  }
}