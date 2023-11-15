import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Ipassword } from 'src/app/Interfaces/ipassword';
import { PasswordService } from 'src/app/Services/password.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  fg!: FormGroup;
  IsMatchedPass = new BehaviorSubject<boolean>(false);
  user: Ipassword = { email: '', oldPassword: '', newPassword: '' };

  constructor(
    private fb: FormBuilder,
    private editpass: PasswordService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fg = this.fb.group({
      email:   ['',[Validators.required, Validators.email]],
      newpassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/)]],
      oldpassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],});
  }

  onSubmit(e: Event): void {
    e.preventDefault();

    this.http.post('https://localhost:7003/api/UserProfile/ChangePassword', this.user).subscribe({
      next: () => {
        if (this.fg.valid && this.IsMatched) {
          this.IsMatchedPass.next(false);
          this.user.email = this.fg.get('email')?.value;
          this.user.newPassword = this.fg.get('newpassword')?.value;
          this.user.oldPassword = this.fg.get('oldpassword')?.value;
          this.editpass.Editpassword(this.user).subscribe({
            next: () => this.router.navigate(['login']),
            error: () => console.log('Failed To Change Password!'),
            complete: () => console.log('Successfully Change Password!')
          });
        } else {
          this.IsMatchedPass.next(true);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error in HTTP post request:', error);
      }
    });
  }
// ---------------- [ email ]
get emailRequired():boolean|void{return this.fg.get('email')?.hasError('required');}
get emailValid(): boolean|void { return this.fg.get('email')?.valid;}
get emailTouched():boolean|void{ return this.fg.get('email')?.touched;}

  // ---------------- [ old password ]
  get oldpassRequired():boolean|void{return this.fg.get('password')?.hasError('required');}
  get oldpassValid(): boolean|void  {return this.fg.get('password')?.valid;}
  get oldpassTouched():boolean|void {return this.fg.get('password')?.touched;}

  // ---------------- [ new password ]
  get newpassRequired():boolean|void{return this.fg.get('password')?.hasError('required');}
  get newpassValid(): boolean|void  {return this.fg.get('password')?.valid;}
  get newpassTouched():boolean|void {return this.fg.get('password')?.touched;}
  get IsMatched(): boolean | void {return this.fg.get('newpassword')?.value === this.fg.get('confirmPassword')?.value;
  }

  // ---------------- [ confirm ]
  get confirmPasswordRequired():boolean|void{return this.fg.get('confirm')?.hasError('required');}
  get confirmPasswordValid(): boolean|void  {return this.fg.get('confirm')?.valid;}
  get confirmPasswordTouched():boolean|void {return this.fg.get('confirm')?.touched;}





}
