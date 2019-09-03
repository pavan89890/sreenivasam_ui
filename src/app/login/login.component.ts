import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form;
  isValidUser:boolean=true;
  constructor(private fb: FormBuilder,
    private myRoute: Router,
    private auth: AuthService,private firestore:AngularFirestore) {
      this.form = fb.group({
        email: ['', [Validators.required,Validators.email]],
        password: ['', Validators.required]
      });
     }

  ngOnInit() {
    $("body").removeClass('sidebar-mini');
    $("body").removeClass('skin-green');
    $("body").css("background-color","#ecf0f5");
  }

  login(){
    var dbUser:any=null;

    this.firestore.collection("users").ref
    .where("email","==",this.form.value.email)
    .where("password","==",this.form.value.password)
    .get().then(x=>{
      if(x.docs.length){
         dbUser=x.docs[0].data();
         dbUser.id=x.docs[0].id;
      }
      if(this.form.valid && dbUser){
        this.dashboard(dbUser);      
      }else{
        this.isValidUser=false;
      }
  });

  }

  dashboard(dbUser){
    if(dbUser){
      this.auth.sendToken(dbUser);
      this.myRoute.navigate(["/dashboard"]);
    }
  }
}
