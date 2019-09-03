import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../model/user';
import { ApiService } from '../services/api.service';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form;
  url:string="users";
  
  constructor(private fb: FormBuilder,
    private myRoute: Router,
    private auth: AuthService,private apiService:ApiService) {
      this.form = fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required,Validators.email]],
        password: ['', [Validators.required]],
        mobile: ['', [Validators.required]],
        flatNo: ['', [Validators.required]]
      });
     }

  ngOnInit() {
    $("body").removeClass('skin-green sidebar-mini');
    $("body").css("background-color","#ecf0f5");
  }

  register(){
    if(this.form.valid){
      var mobileNo=this.form.value['mobile']+'';
      var flatNo=this.form.value['flatNo']+'';
      if(mobileNo.length!=10){
        alert("Please Enter 10 Digited Mobile Number");
        return false;
      }

      if(flatNo.length!=3){
        alert("Please Enter 3 Digited Flat Number");
        return false;
      }

      var user=new User();
      user=this.form.value;

      if(user.id){
        this.apiService.updateObject(user.id,user,this.url);
      }else{
        this.apiService.addObject(user,this.url);
      }
      user=new User();
      alert("Your registration is successful.Please Login to continue")
      this.myRoute.navigate(["/login"]);
    }
  }

}
