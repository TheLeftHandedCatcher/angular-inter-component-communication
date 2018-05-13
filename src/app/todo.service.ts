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

  getTodos(): Observable<Task[]> {
    return this.task$.asObservable();
  }

  /* getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl).pipe(
      tap(tasks => this.log(`fetched tasks`)),      
      catchError(this.handleError('getTasks', []))
    );
  } */

  getTasks() {
    this.http.get<Task[]>(this.tasksUrl).subscribe(data => {
      this.dataStore.tasks = data;
      let cloneData = this.dataStore.tasks.concat();
      this.task$.next(cloneData);
    }, error => console.log('Could not load tasks.'));
  }

  /* private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  } */

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('TodoService: ' + message);
  }
  
}
