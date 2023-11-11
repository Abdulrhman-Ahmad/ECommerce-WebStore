import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClaimsService } from 'src/app/Services/claims.service';
import { CurrentuserService } from 'src/app/Services/currentuser.service';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  fg !:FormGroup

  constructor(
    private fb:FormBuilder,
    private register : RegisterService,
    public data:CurrentuserService,
    private claim:ClaimsService){}

  ngOnInit(): void {

    

    this.fg = this.fb.group({
      fullname:[this.data.CurrentUser.GivenName,[Validators.required, Validators.minLength(4)]],
      username:[this.data.CurrentUser.Name,[Validators.required, Validators.minLength(4)]],
      email:   [this.data.CurrentUser.StreetAddress,[Validators.required, Validators.email]],
      address: [this.data.CurrentUser.MobilePhone,[Validators.required, Validators.minLength(8)]],
      phone:   [this.data.CurrentUser.Email,[Validators.required, Validators.minLength(11)]]
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

  // ---------------- [ address ]
  get addressRequired():boolean|void{return this.fg.get('address')?.hasError('required');}
  get addressValid(): boolean|void  {return this.fg.get('address')?.valid;}
  get addressTouched():boolean|void {return this.fg.get('address')?.touched;}

  // ---------------- [ phone ]
  get phoneRequired():boolean|void{return this.fg.get('phone')?.hasError('required');}
  get phoneValid(): boolean|void  {return this.fg.get('phone')?.valid;}
  get phoneTouched():boolean|void {return this.fg.get('phone')?.touched;}

}
