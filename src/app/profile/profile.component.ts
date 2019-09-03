import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  url:string="users";
  currentUser:User;

  constructor(private auth: AuthService,private apiService:ApiService) {
      this.currentUser=JSON.parse(auth.getToken());
  }

  
  ngOnInit() {
  }

  updateProfile(user:User){
    
      var mobileNo=user.mobile+'';
      var flatNo=user.flatNo+'';
      if(mobileNo.length!=10){
        alert("Please Enter 10 Digited Mobile Number");
        return false;
      }

      if(flatNo.length!=3){
        alert("Please Enter 3 Digited Flat Number");
        return false;
      }

      console.log(user);
      var userId=user.id;
      if(user.id){
        this.apiService.updateObject(user.id,user,this.url);
      }else{
        this.apiService.addObject(user,this.url);
      }
     this.getProfile(user,userId);
    }
  
  getProfile(user:User,userId:string):void{
    this.apiService.getObject("users",userId).subscribe(x=>{
      this.currentUser=x;
    });
    this.currentUser.id=userId;
    this.auth.sendToken(this.currentUser);
    alert("Profile updated");
    window.location.reload();
  }

}
