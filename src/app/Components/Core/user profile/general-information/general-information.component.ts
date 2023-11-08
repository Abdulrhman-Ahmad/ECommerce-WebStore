import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent implements OnInit {
  EditInfrmation !:FormGroup
  IsMatchedPass = new BehaviorSubject<boolean>(false)
  constructor(private fb:FormBuilder){}


  ngOnInit(): void {
  this.EditInfrmation = this.fb.group({
    fullname:['',[Validators.required, Validators.minLength(4)]],
    username:['',[Validators.required, Validators.minLength(4)]],
    email:   ['',[Validators.required, Validators.email]]

  })
  }

  OnSubmit(e :Event){
    e.preventDefault();

    if (this.EditInfrmation.valid)
    {
      this.IsMatchedPass.next(false)
    }
    else
    {
      this.IsMatchedPass.next(true)
    }
  }



  // ---------------- [ fullname ]
  get fullnameRequired():boolean|void{return this.EditInfrmation.get('fullname')?.hasError('required');}
  get fullnameValid(): boolean|void { return this.EditInfrmation.get('fullname')?.valid;}
  get fullnameTouched():boolean|void{ return this.EditInfrmation.get('fullname')?.touched;}

  // ---------------- [ username ]
  get usernameRequired():boolean|void{return this.EditInfrmation.get('username')?.hasError('required');}
  get usernameValid(): boolean|void { return this.EditInfrmation.get('username')?.valid;}
  get usernameTouched():boolean|void{ return this.EditInfrmation.get('username')?.touched;}

  // ---------------- [ email ]
  get emailRequired():boolean|void{return this.EditInfrmation.get('email')?.hasError('required');}
  get emailValid(): boolean|void { return this.EditInfrmation.get('email')?.valid;}
  get emailTouched():boolean|void{ return this.EditInfrmation.get('email')?.touched;}


  /////////////////////////////////////////////////////////////////////////
  
}
