import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Todo {
  static _id: any;
  static desc: any;
  constructor(public _id: number, public desc: string) {}
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
      .get<any>('http://mazen-back-tools-project.apps.eu45.prod.nextcle.com/todos')
      .subscribe((todos) => {
        this.todos = todos;
      });
  }
  addTodo(todo: HTMLInputElement) {
    if (todo.value.length == 0) {
      alert('please enter a valid input');
      return;
    } else {
      this.httpClient
        .post<any>('http://mazen-back-tools-project.apps.eu45.prod.nextcle.com/addTodo', {
          desc: todo.value,
        })
        .subscribe(() => {});
    }
  }
  updateTodo(id: Number, newText: HTMLInputElement) {
    this.httpClient
      .put<any>(`http://mazen-back-tools-project.apps.eu45.prod.nextcle.com/updateTodo/${id}`, {
        newText: newText.value,
        id: id,
      })
      .subscribe((todo) => {
        this.getTodo();
      });
  }
  deleteTodo(id: number) {
    this.httpClient
      .delete<any>(`http://mazen-back-tools-project.apps.eu45.prod.nextcle.com/deleteTodo/${id}`)
      .subscribe((todo) => {
        this.getTodo();
      });
  }
}
