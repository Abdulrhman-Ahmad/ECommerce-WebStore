  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { BehaviorSubject } from 'rxjs';
  import { Igeneral } from 'src/app/Interfaces/igeneral';
import { Iuser } from 'src/app/Interfaces/user/iuser';
  import { ClaimsService } from 'src/app/Services/claims.service';
  import { CurrentuserService } from 'src/app/Services/currentuser.service';
  import { GeneralService } from 'src/app/Services/general.service';
  import { RegisterService } from 'src/app/Services/register.service';

  @Component({
    selector: 'app-general-information',
    templateUrl: './general-information.component.html',
    styleUrls: ['./general-information.component.css']
  })
  export class GeneralInformationComponent implements OnInit {

    fg !:FormGroup
    edit :Igeneral ={
      fullName: '',
      email: '',
      userName: '',
      phoneNumber: '',
      address: ''
    }
    constructor(
      private fb:FormBuilder,
      public data:CurrentuserService,
      private deleteuser:GeneralService,
      private claim:ClaimsService ,
      private edituser: GeneralService,
      private router: Router
      ){}

    ngOnInit(): void {

      let token = localStorage.getItem('token')
      if (token) {
        let claims = JSON.parse(window.atob(token.split('.')[1]));
        this.data.CurrentUser.GivenName     = claims[this.claim.claimTypes.GivenName]
        this.data.CurrentUser.Name          = claims[this.claim.claimTypes.Name]
        this.data.CurrentUser.StreetAddress = claims[this.claim.claimTypes.StreetAddress]
        this.data.CurrentUser.MobilePhone   = claims[this.claim.claimTypes.MobilePhone]
        this.data.CurrentUser.Email         = claims[this.claim.claimTypes.Email]
        this.data.CurrentUser.Role          = claims[this.claim.claimTypes.Role]
        }

      this.fg = this.fb.group({
        fullname:[this.data.CurrentUser.GivenName,[Validators.required, Validators.minLength(4)]],
        username:[this.data.CurrentUser.Name,[Validators.required, Validators.minLength(4)]],
        email:   [this.data.CurrentUser.Email,[Validators.required, Validators.email]],
        address: [this.data.CurrentUser.StreetAddress,[Validators.required, Validators.minLength(8)]],
        phone:   [this.data.CurrentUser.MobilePhone,[Validators.required, Validators.pattern(/^\d{11}$/)]]
      })


    }

    OnSubmit(e :Event){
      e.preventDefault();

      if (this.fg.valid)
      {
        this.edit.fullName=this.fg.get('fullname')?.value
        this.edit.userName=this.fg.get('username')?.value
        this.edit.address=this.fg.get('address')?.value
        this.edit.phoneNumber=this.fg.get('phone')?.value
        this.edit.email=this.fg.get('email')?.value
        this.edituser.Edituserdata(this.edit).subscribe({
          next: () => console.log('Changing Password ...'),
          error: (e) => console.log('Failed To Change Password! : ',e),
          complete: () => {
            console.log('Successfully Change Password!');
            localStorage.removeItem('token');
            this.router.navigate(['login']);
          }
        });
      }
      else
      {

      }
    }

  isDeleted: boolean = false;
  isError: boolean = false;




  deleteUser(): void {
    // Use the browser's prompt to get the password
    const password = prompt('Enter your password:');

    if (password !== null) {
      this.deleteuser.Deleteuserdata(password).subscribe({
        next: () => {
          this.isDeleted = true;
          this.isError = false;
        },
        error: (error) => {
          this.isDeleted = false;
          this.isError = true;
          console.error('Unable to delete account:', error);
        },
        complete: () => {
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        }
      });
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
