import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import { Router } from "@angular/router";
import { publishFacade } from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class GuardService{

    public constructor(private tokenService: TokenService, private router: Router ){

    }

    public canActiveWithGuard(): boolean{
      if(this.tokenService.getToken()){
        this.router.navigateByUrl("/portafolio");
        return false;
      }

      return true;
    }

    public canActiveWithoutGuard(): boolean{
      if(!this.tokenService.getToken()){
        alert("No tienes permisos");
        this.router.navigateByUrl("/autenticacion/inicio-sesion");
        return false;
      }

      return true;
    }
}
