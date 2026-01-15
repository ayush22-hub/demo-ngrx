import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoActions } from '../../store/todo/todo.actions';
import { selectTodoViewModel } from '../../store/todo/todo.selectors';

@Component({
  selector: 'app-todo-list',
  template: `
    <div class="todo-container">
      <!-- Loading State -->
      <div *ngIf="vm$ | async as vm">
        <div *ngIf="vm.loading" class="loading">
          Loading todos...
        </div>
        
        <!-- Error State -->
        <div *ngIf="vm.error" class="error">
          {{ vm.error }}
          <button (click)="clearError()">Dismiss</button>
        </div>
        
        <!-- Stats -->
        <div class="stats">
          Total: {{ vm.stats.total }} | 
          Completed: {{ vm.stats.completed }} | 
          Pending: {{ vm.stats.pending }}
        </div>
        
        <!-- Todo List -->
        <div *ngIf="vm.hasTodos" class="todo-list">
          <div *ngFor="let todo of vm.todos" class="todo-item">
            <input 
              type="checkbox" 
              [checked]="todo.completed"
              (change)="toggleTodo(todo.id)"
            >
            
            <span [class.completed]="todo.completed">
              {{ todo.title }}
            </span>
            
            <small *ngIf="todo.description">{{ todo.description }}</small>
            
            <button (click)="deleteTodo(todo.id)">Delete</button>
          </div>
        </div>
        
        <!-- Empty State -->
        <div *ngIf="!vm.hasTodos && !vm.loading" class="empty">
          No todos yet. Add one above!
        </div>
      </div>
    </div>
  `
})
export class TodoListComponent implements OnInit {
  private store = inject(Store);
  
  readonly vm$: Observable<any> = this.store.select(selectTodoViewModel);

  ngOnInit() {
    // Load todos when component initializes
    this.store.dispatch(TodoActions.loadTodos());
  }

  toggleTodo(id: string) {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  deleteTodo(id: string) {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }

  clearError() {
    this.store.dispatch(TodoActions.clearError());
  }
}