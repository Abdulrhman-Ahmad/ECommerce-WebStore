import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClaimsService } from 'src/app/Services/claims.service';
import { CurrentuserService } from 'src/app/Services/currentuser.service';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  fg !:FormGroup

  constructor(
    private fb:FormBuilder,
    private register : RegisterService,
    public data:CurrentuserService,
    private claim:ClaimsService){}

  ngOnInit(): void {

    let token = localStorage.getItem('token')
    if (token) {
      let claims = JSON.parse(window.atob(token.split('.')[1]));

      this.data.CurrentUser.StreetAddress = claims[this.claim.claimTypes.StreetAddress]
      this.data.CurrentUser.MobilePhone   = claims[this.claim.claimTypes.MobilePhone]

      }

    this.fg = this.fb.group({

      address: [this.data.CurrentUser.StreetAddress,[Validators.required, Validators.minLength(8)]],
      phone:   [this.data.CurrentUser.MobilePhone,[Validators.required, Validators.minLength(11)]]
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


  // ---------------- [ address ]
  get addressRequired():boolean|void{return this.fg.get('address')?.hasError('required');}
  get addressValid(): boolean|void  {return this.fg.get('address')?.valid;}
  get addressTouched():boolean|void {return this.fg.get('address')?.touched;}

  // ---------------- [ phone ]
  get phoneRequired():boolean|void{return this.fg.get('phone')?.hasError('required');}
  get phoneValid(): boolean|void  {return this.fg.get('phone')?.valid;}
  get phoneTouched():boolean|void {return this.fg.get('phone')?.touched;}

}
