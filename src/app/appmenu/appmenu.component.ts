import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {

  constructor() { }

  currentUser:User;
  ngOnInit() {
    this.currentUser=JSON.parse(localStorage.getItem("currentUser"));
  }

}
