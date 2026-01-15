import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from './todo.state';

export const TodoActions = createActionGroup({
  source: 'Todo',
  events: {
    // Load todos
    'Load Todos': emptyProps(),
    'Load Todos Success': props<{ todos: Todo[] }>(),
    'Load Todos Failure': props<{ error: string }>(),

    // Add todo
    'Add Todo': props<{ title: string; description?: string }>(),
    'Add Todo Success': props<{ todo: Todo }>(),
    'Add Todo Failure': props<{ error: string }>(),

    // Update todo
    'Update Todo': props<{ id: string; changes: Partial<Todo> }>(),
    'Update Todo Success': props<{ todo: Todo }>(),
    'Update Todo Failure': props<{ error: string }>(),

    // Delete todo
    'Delete Todo': props<{ id: string }>(),
    'Delete Todo Success': props<{ id: string }>(),
    'Delete Todo Failure': props<{ error: string }>(),

    // Toggle todo
    'Toggle Todo': props<{ id: string }>(),
    
    // Select todo
    'Select Todo': props<{ id: string }>(),
    
    // UI actions
    'Clear Error': emptyProps(),
    'Set Loading': props<{ loading: boolean }>()
  }
});