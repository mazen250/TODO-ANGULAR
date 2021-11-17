import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Todo {
  constructor(public id: number, public desc: string) {}
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] | undefined;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getTodo();
  }
  getTodo() {
    this.httpClient
      .get<any>('http://localhost:5001/todos')
      .subscribe((todos) => {
        this.todos = todos;
      });
  }
}
