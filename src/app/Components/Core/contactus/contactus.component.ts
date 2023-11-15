// we have to provide the feature of showing the location of the the store
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IRegister } from 'src/app/Interfaces/iregister';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  fg !:FormGroup
  IsMatchedPass = new BehaviorSubject<boolean>(false)

  user: IRegister = {
    fullName: "",
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: ""
  };


  constructor(private fb:FormBuilder, private register : RegisterService, private router:Router){}


  ngOnInit(): void {
  this.fg = this.fb.group({
    fullname:['',[Validators.required, Validators.minLength(4)]],
    email:   ['',[Validators.required, Validators.email]],
    phone:   ['',[Validators.required, Validators.pattern(/^\d{11}$/)]],
    address :['',[Validators.required, Validators.minLength(20)]]
  })
  }

  OnSubmit(e :Event){
    e.preventDefault();

    if (this.fg.valid )
    {
      this.IsMatchedPass.next(false)

      this.user.fullName = this.fg.get('fullname')?.value;
      this.user.email = this.fg.get('email')?.value;
      this.user.phoneNumber = this.fg.get('phone')?.value;
      this.user.address = this.fg.get('address')?.value;
    }
    else
    {
      this.IsMatchedPass.next(true)
    }
  }


  // ---------------- [ fullname ]
  get fullnameRequired():boolean|void{return this.fg.get('fullname')?.hasError('required');}
  get fullnameValid(): boolean|void { return this.fg.get('fullname')?.valid;}
  get fullnameTouched():boolean|void{ return this.fg.get('fullname')?.touched;}

  // ---------------- [ email ]
  get emailRequired():boolean|void{return this.fg.get('email')?.hasError('required');}
  get emailValid(): boolean|void { return this.fg.get('email')?.valid;}
  get emailTouched():boolean|void{ return this.fg.get('email')?.touched;}

  // ---------------- [ phone ]
  get phoneRequired():boolean|void{return this.fg.get('phone')?.hasError('required');}
  get phoneValid(): boolean|void  {return this.fg.get('phone')?.valid;}
  get phoneTouched():boolean|void {return this.fg.get('phone')?.touched;}

    // ---------------- [ Message ]
    get addressRequired():boolean|void{return this.fg.get('address')?.hasError('required');}
    get addressValid(): boolean|void  {return this.fg.get('address')?.valid;}
    get addressTouched():boolean|void {return this.fg.get('address')?.touched;}


}
