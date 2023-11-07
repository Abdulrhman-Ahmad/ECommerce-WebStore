import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public log:LoginService){}


  logout()
  {
    localStorage.removeItem('token');
    this.log.IsLoggedIn.next(false)
  }

  ngOnInit(): void {
    if(localStorage.getItem('token'))
      this.log.IsLoggedIn.next(true);
    else
      this.log.IsLoggedIn.next(false);
  }


}
