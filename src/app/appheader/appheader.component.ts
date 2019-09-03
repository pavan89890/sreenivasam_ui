import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
declare var $:any;

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

  constructor(private router:Router) { }

  currentUser:User=null;

  ngOnInit() {
    $("body").addClass('skin-green sidebar-mini');
    $("body").css("background-color","black");
    this.currentUser=JSON.parse(localStorage.getItem("currentUser"));
  }

  signOut(){
    localStorage.removeItem("currentUser");
    this.router.navigateByUrl("/login");
  }

}
