import { createReducer, on } from '@ngrx/store';
import { TodoActions } from './todo.actions';
import { initialTodoState, TodoState } from './todo.state';

export const todoReducer = createReducer(
  initialTodoState,
  
  // Load Todos
  on(TodoActions.loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
    lastUpdated: new Date()
  })),
  
  on(TodoActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Add Todo
  on(TodoActions.addTodo, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  
  
  on(TodoActions.addTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
    loading: false,
    lastUpdated: new Date()
  })),
  
  on(TodoActions.addTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Toggle Todo
  on(TodoActions.toggleTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ),
    lastUpdated: new Date()
  })),
  
  // Delete Todo
  on(TodoActions.deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id),
    lastUpdated: new Date()
  })),
  
  // UI Actions
  on(TodoActions.clearError, (state) => ({
    ...state,
    error: null
  }))
);

export const TODO_FEATURE_KEY = 'todo';