import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

const token = localStorage.getItem('token');



  if (state.url === "/login" || state.url === "/register")
  {
    if (token != null)
      return false;
    else
      return true
  }

  if (state.url === "/profile" || state.url === "/Address" || state.url === "/orders" || state.url === "/cart" || state.url === "/favorite")
  {
    if (token != null)
      return true
    else
      return false
  }

  return true
};
