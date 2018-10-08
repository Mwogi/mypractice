import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { User } from '../../publicClasses';
import {Router} from '@angular/router';
import{environment} from '../../../environments/environment';

const jwt = require('jsonwebtoken');
const API_URL = environment.apiUrl;

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{ 
  constructor(private http: HttpClient,
    private _router: Router
  ) { }

  userName:string; 
  password:string; 
  userPas:string;
  userId:number;
  userRoles = [];
  loginData = [];
  userModel = new User("","",1);

  ngOnInit() {
  }

  loginUser(){
    this.userPas = this.userModel.password;
    this.userName = this.userModel.userName;

    //Encrypt password to sha1
    var crypto = require('crypto');
    var shasum = crypto.createHash('sha1');
    shasum.update(this.userPas);
    //console.log(shasum.digest('hex'));

    this.userPas = shasum.digest('hex');

    this.http.get(API_URL + 'users/findOne?_where=((userName,eq,'+this.userName+')~and(password,eq,'+this.userPas+'))')
    .subscribe(
      (data:any[])=>{
        this.loginData = data;
        console.log(data);
        if(data.length){
          let payload = {subject: this.loginData[0].userId};
          let token = jwt.sign(payload, 'secretKey')
          localStorage.setItem('token',token); 
          this._router.navigate(['/dashboard'])
        }
        else{
          console.log('Invalid user credentials'); 
        }
                
      }  
      
    ) 
    
  }
}
