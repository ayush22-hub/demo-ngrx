import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.state';
import { TODO_FEATURE_KEY } from './todo.reducer';

// Feature selector
export const selectTodoState = createFeatureSelector<TodoState>(TODO_FEATURE_KEY);

// Basic selectors
export const selectAllTodos = createSelector(
  selectTodoState,
  (state) => state.todos
);

export const selectLoading = createSelector(
  selectTodoState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectTodoState,
  (state) => state.error
);

export const selectLastUpdated = createSelector(
  selectTodoState,
  (state) => state.lastUpdated
);

// Computed selectors
export const selectCompletedTodos = createSelector(
  selectAllTodos,
  (todos) => todos.filter(todo => todo.completed)
);

export const selectPendingTodos = createSelector(
  selectAllTodos,
  (todos) => todos.filter(todo => !todo.completed)
);

export const selectTodoCount = createSelector(
  selectAllTodos,
  (todos) => todos.length
);

export const selectCompletedCount = createSelector(
  selectCompletedTodos,
  (todos) => todos.length
);

export const selectPendingCount = createSelector(
  selectPendingTodos,
  (todos) => todos.length
);

// View model selector (combines multiple selectors)
export const selectTodoViewModel = createSelector(
  selectAllTodos,
  selectLoading,
  selectError,
  selectTodoCount,
  selectCompletedCount,
  (todos, loading, error, total, completed) => ({
    todos,
    loading,
    error,
    stats: {
      total,
      completed,
      pending: total - completed
    },
    hasTodos: total > 0,
    allCompleted: total > 0 && total === completed
  })
);