import { ClaimsService } from './../../../Services/claims.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Icart } from 'src/app/Interfaces/icart';
import { IRegister } from 'src/app/Interfaces/iregister';
import { CartService } from 'src/app/Services/cart.service';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  fg !:FormGroup
  products !: Icart[];
  cartLength : number = 0;
  cartPrice : number = 0;

  promotion : number = 0;
  discounts : number = 0;
  tax : number = 0;

  fullname : string = '';
  phonenumber : string = '';
  address : string = '';

  constructor(private fb:FormBuilder, private router:Router, private cartapi:CartService, private claim:ClaimsService){}


  ngOnInit(): void {

    let token = localStorage.getItem('token')
    if (token) {
      let claims = JSON.parse(window.atob(token.split('.')[1]));
      this.fullname    = claims[this.claim.claimTypes.GivenName]
      this.address = claims[this.claim.claimTypes.StreetAddress]
      this.phonenumber  = claims[this.claim.claimTypes.MobilePhone]
      }

  this.cartapi.GetCart().subscribe({
    next: (d) => {
      this.products = d
      this.products.forEach(item => {
        this.cartLength +=  item.productQuantity
        this.cartPrice += (item.productPrice * item.productQuantity)
        this.discounts =+ (item.productQuantity * item.discount )
      });
    },
    error: (e) => console.log('Unable to Get Cart : ', e),
    complete: () => console.log('Got Cart Successfully!')
  });



  this.fg = this.fb.group({
    fullname:[this.fullname,[Validators.required, Validators.minLength(4)]],
    address: [this.address,[Validators.required, Validators.minLength(8)]],
    phone:   [this.phonenumber,[Validators.required, Validators.minLength(11)]]
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


  selectedPaymentOption: string = 'payment';

  onPaymentOptionChange(option: string) {
    this.selectedPaymentOption = option;
  }
    addcity:string = 'show';

    onAddCity(option: string) {
      this.addcity = option;
    }

}
