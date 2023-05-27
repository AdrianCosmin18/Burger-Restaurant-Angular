import * as AuthActions from "./auth.actions";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {User} from "../interfaces/user";
import * as AuthAction from "./auth.actions";
import {AuthorityModel} from "../models/authority-model";
import {Roles} from "../constants/constants";
import {RefreshService} from "../services/refresh.service";


@Injectable()
export class AuthEffects{

  constructor(
    private action$: Actions,
    private authService: AuthService,
  ) {
  }


  authLogin$ = createEffect(() => {
    return  this.action$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        let user: User = {
          email: authData.payload.email,
          password: authData.payload.password,
          phone: '',
          firstName: '',
          lastName: ''
        };
        return this.authService.login(user)
          .pipe(
            map(response => {//aici returneaza la noi un AuthResponse, trebuie facut if-ul cu roluri
              let arrAuth: Array<AuthorityModel> = response.body?.authorities as Array<AuthorityModel>;
              let role = '';
              if(arrAuth?.some(elem => elem.authority === Roles.ROLE_USER)){
                role = Roles.ROLE_USER;
              }
              this.authService.saveRole(role);
              this.authService.saveEmail(response.body!.email);
              this.authService.saveToken(response.body!.token);
              this.authService.saveFirstName(response.body!.firstName);
              this.authService.saveLoggedIn(true);

              return new AuthAction.AuthenticationSuccess({
                email: response.body!.email,
                firstName: response.body!.firstName,
                token: response.body!.token,
                role: role
              })
            }),
            catchError(err => {
              return handleError(err);
            })
          )
      })
    );
  });
}










const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthAction.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthAction.AuthenticateFail(errorMessage));
};
