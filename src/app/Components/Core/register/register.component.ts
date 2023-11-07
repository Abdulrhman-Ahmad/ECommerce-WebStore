import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl:'./register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  fg !:FormGroup
  IsMatchedPass = new BehaviorSubject<boolean>(false)
  constructor(private fb:FormBuilder){}


  ngOnInit(): void {
  this.fg = this.fb.group({
    fullname:['',[Validators.required, Validators.minLength(4)]],
    username:['',[Validators.required, Validators.minLength(4)]],
    email:   ['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(8)]],
    confirm: ['',[Validators.required, Validators.minLength(8)]]
  })
  }

  OnSubmit(e :Event){
    e.preventDefault();

    if (this.fg.valid && this.IsMatched)
    {
      this.IsMatchedPass.next(false)
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

  // ---------------- [ username ]
  get usernameRequired():boolean|void{return this.fg.get('username')?.hasError('required');}
  get usernameValid(): boolean|void { return this.fg.get('username')?.valid;}
  get usernameTouched():boolean|void{ return this.fg.get('username')?.touched;}

  // ---------------- [ email ]
  get emailRequired():boolean|void{return this.fg.get('email')?.hasError('required');}
  get emailValid(): boolean|void { return this.fg.get('email')?.valid;}
  get emailTouched():boolean|void{ return this.fg.get('email')?.touched;}

  // ---------------- [ password ]
  get passRequired():boolean|void{return this.fg.get('password')?.hasError('required');}
  get passValid(): boolean|void  {return this.fg.get('password')?.valid;}
  get passTouched():boolean|void {return this.fg.get('password')?.touched;}
  get IsMatched():boolean|void   {return this.fg.get('password')?.value === this.fg.get('confirm')?.value}

  // ---------------- [ confirm ]
  get confirmRequired():boolean|void{return this.fg.get('confirm')?.hasError('required');}
  get confirmValid(): boolean|void  {return this.fg.get('confirm')?.valid;}
  get confirmTouched():boolean|void {return this.fg.get('confirm')?.touched;}


}
