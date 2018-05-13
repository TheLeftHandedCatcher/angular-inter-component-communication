import { Component, OnInit } from '@angular/core';

import { TodoService } from '../todo.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  getTasks() {
    this.todoService.getTasks();
  }

  ngOnInit() {
  }

}
