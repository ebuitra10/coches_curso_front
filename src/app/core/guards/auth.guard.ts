import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from "rxjs";
import { TokenService } from "./dto/services/token.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(!this.tokenService.getToken()){
        alert("No tienes permisos");
        this.router.navigateByUrl("/autenticacion/inicio-sesion");
        return false;
      }

      return true;
  }


}

