import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {}

  // In a real app, these would make actual HTTP calls
  getTodos(): Observable<any[]> {
    return this.http.get<any[]>('/api/todos');
  }

  addTodo(todo: any): Observable<any> {
    return this.http.post<any>('/api/todos', todo);
  }
}