import { Injectable } from '@angular/core';
import * as Realm from "realm-web"
import { catchError, defer, from, map, mapTo, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogService } from '../../log/log.service';
import { RemoteDbService } from '../db/remote-db.service';
import { AppUser } from './app-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  constructor(private db:RemoteDbService, private logger:LogService) { 
    
  }

  getUser() : AppUser | null {
    const realmDbUser = this.db.app.currentUser;
    if (!realmDbUser)
      return null;
    // map realm prop to app's domain
    return {
      id: realmDbUser.id
    } 
  }

  isLoggedIn() : boolean {
    return this.db.app.currentUser?.isLoggedIn ?? false;
  }

  signIn(email:string, password:string){
    // create the provider-specific credentials payload
    const cred = Realm.Credentials.emailPassword(email, password);
    // do the login
    return this.performLogin(cred);
  }

  private performLogin(cred:Realm.Credentials){
    return from(defer(() => this.db.app.logIn(cred)))
      .pipe(
        mapTo(true),
        catchError(error => {
          this.logger.warn('Login error: ', error);
          return of(false)
        })
       
      )
  }
}
