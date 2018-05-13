import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { TodoService } from '../todo.service';
import { Task } from '../task';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  tasks$: Observable<Task[]> = new Observable<Task[]>();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.tasks$ = this.todoService.getTodos();
    
  }

}
