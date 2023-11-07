import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl:'./register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder){}

  fg !:FormGroup

  ngOnInit(): void {
  this.fg = this.fb.group({
    fullname:['',[Validators.required]],
    username:['',[Validators.required]],
    email:   ['',[Validators.required]],
    password:['',[Validators.required]],
    confirm: ['',[Validators.required]]
  })
  }

  OnSubmit(e :Event){
    e.preventDefault();
    if (this.fg.valid)
    {

    }
    else
    {

    }
  }




  // ---------------- [ email ]
  get emailRequired():boolean|void{return this.fg.get('email')?.hasError('required');}
  get emailValid(): boolean|void { return this.fg.get('email')?.valid;}
  get emailTouched():boolean|void{ return this.fg.get('email')?.touched;}

  // ---------------- [ password ]
  get passRequired():boolean|void{return this.fg.get('password')?.hasError('required');}
  get passValid(): boolean|void  {return this.fg.get('password')?.valid;}
  get passTouched():boolean|void {return this.fg.get('password')?.touched;}

}
