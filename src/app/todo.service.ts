import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from './task';

@Injectable()
export class TodoService {

  private tasksUrl = 'api/tasks';  // URL to web api
  
  private task$: BehaviorSubject<Task[]>;

  private dataStore: {
    tasks: Task[]
  };

  constructor(private http: HttpClient) {
    this.task$ = <BehaviorSubject<Task[]>>new BehaviorSubject([]);
    const emptyTaskArray:Task[] = new Array<Task>();
    this.task$ = new BehaviorSubject<Task[]>(emptyTaskArray);
    this.dataStore = { tasks: [] };
  }

  private static httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTasks(): Observable<Task[]> {
    return this.task$.asObservable();
  }

  getTodos() {
    this.http.get<Task[]>(this.tasksUrl).subscribe(data => {
      this.dataStore.tasks = data;
      let cloneData = this.dataStore.tasks.concat();
      this.task$.next(cloneData);
    }, error => console.log('Could not load tasks.'));
  }
  
}
