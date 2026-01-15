import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, delay } from 'rxjs/operators';
import { TodoActions } from './todo.actions';
import { TodoService } from '../../services/todo.service';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private todoService = inject(TodoService);

  // Simulate API call to load todos
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      exhaustMap(() =>
        // Simulate API call with delay
        of([
          { id: '1', title: 'Learn NgRx', completed: true, createdAt: new Date() },
          { id: '2', title: 'Build Todo App', completed: false, createdAt: new Date() }
        ]).pipe(
          delay(1000), // Simulate network delay
          map(todos => TodoActions.loadTodosSuccess({ todos })),
          catchError(error => of(TodoActions.loadTodosFailure({ 
            error: 'Failed to load todos' 
          })))
        )
      )
    )
  );

  // Simulate API call to add todo
  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      exhaustMap(({ title, description }) => {
        const newTodo = {
          id: Math.random().toString(36).substring(2, 9),
          title,
          description,
          completed: false,
          createdAt: new Date()
        };
        
        // Simulate API call
        return of(newTodo).pipe(
          delay(500),
          map(todo => TodoActions.addTodoSuccess({ todo })),
          catchError(error => of(TodoActions.addTodoFailure({ 
            error: 'Failed to add todo' 
          })))
        );
      })
    )
  );
}