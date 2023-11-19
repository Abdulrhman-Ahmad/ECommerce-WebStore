import { ClaimsService } from './../../../Services/claims.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Iaddressorder } from 'src/app/Interfaces/iaddressorder';
import { Icart } from 'src/app/Interfaces/icart';
import { AddressService } from 'src/app/Services/address.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  fg !: FormGroup
  products !: Icart[];
  cartLength: number = 0;
  cartPrice: number = 0;

  promotion: number = 0;
  discounts: number = 0;
  tax: number = 0;
  totalPrice: number = 0;

  fullname: string = '';
  phonenumber: string = '';
  address: string = '';
  phones: string[] = [];
  addresses: Iaddressorder[] = [];

  addAddress = new BehaviorSubject<boolean>(false);
  ChooseAddress = new BehaviorSubject<boolean>(false);
  AddPhone = new BehaviorSubject<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private cartapi: CartService,
    private claim: ClaimsService,
    private addressapi: AddressService,

  ) { }


  ngOnInit(): void {

    //#region Getting the Claims from the token (personal information)
    let token = localStorage.getItem('token')
    if (token) {
      let claims = JSON.parse(window.atob(token.split('.')[1]));
      this.fullname = claims[this.claim.claimTypes.GivenName]
      this.address = claims[this.claim.claimTypes.StreetAddress]
      this.phonenumber = claims[this.claim.claimTypes.MobilePhone]
    }
    //#endregion


    //#region Getting Cart Data
    this.cartapi.GetCart().subscribe({
      next: (d) => {
        this.products = d
        this.products.forEach(item => {

          this.cartLength += item.productQuantity
          this.cartPrice += (item.productPrice * item.productQuantity)
          this.discounts = + (item.productQuantity * item.discount)

        });
      },
      error: (e) => console.log('Unable to Get Cart : ', e),
      complete: () => {
        console.log('Got Cart Successfully!')

        // Calculating the Total price
        this.totalPrice = this.cartPrice + this.tax - (this.discounts + ((this.promotion / 100) * this.cartPrice))
      }
    });
    //#endregion


    //#region Form Group Initialization
    this.fg = this.fb.group({
      addAddress: ['', [Validators.required, Validators.minLength(8)]],
      AddPhone: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/)]],
      ChooseAddress: [''],  //[Validators.required, Validators.minLength(4)]
      //ChoosePhone: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/)]],
    })
    //#endregion


    //#region Get All user Addresses
    this.addressapi.GetAddresses().subscribe({
      next: (d) => {
        this.addresses.push(
          {
            id: 0,
            name: (this.address)
          },
          {
            id: d[0].id,
            name: d[0].street + ' - ' + d[0].city + ' - ' + d[0].country
          }
        )
      },
      error: (e) => console.log('Failed To Get User Addresses: ', e),
      complete: () => {
        console.log('Got Addresses Successfully!')
      }
    });
    //#endregion

  }

  phoneAdd( e: any):void{
    if (this.AddPhone.value)
    {
      this.AddPhone.next(false);
    }
    else
    {
      this.AddPhone.next(true);
    }
  }



  addressAdd( e: any):void{
    if (this.addAddress.value)
    {
      this.addAddress.next(false);
    }
    else
    {
      this.addAddress.next(true);
    }
  }


  AddressChoose( e: any):void{
    if (this.ChooseAddress.value)
    {
      this.ChooseAddress.next(false);
    }
    else
    {
      this.ChooseAddress.next(true);
    }
  }

  // ---------------- [ address ]
  get addressRequired(): boolean | void { return this.fg.get('addAddress')?.hasError('required'); }
  get addressValid(): boolean | void { return this.fg.get('addAddress')?.valid; }
  get addressTouched(): boolean | void { return this.fg.get('addAddress')?.touched; }

  // ---------------- [ phone ]
  get phoneRequired(): boolean | void { return this.fg.get('AddPhone')?.hasError('required'); }
  get phoneValid(): boolean | void { return this.fg.get('AddPhone')?.valid; }
  get phoneTouched(): boolean | void { return this.fg.get('AddPhone')?.touched; }






}
