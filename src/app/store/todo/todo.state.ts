export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  selectedTodoId: string | null;
}

export const initialTodoState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  selectedTodoId: null
};