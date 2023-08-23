import { AuthLoginDtoRequestDto } from "./../../../../core/guards/dto/authLoginRequestDto";
import { AuthService } from "./../../../../core/guards/dto/services/auth.service";
import { AuthLoginDtoRequestDto as authLoginDto } from '../../../../core/guards/dto/authLoginRequestDto';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppBaseComponent } from 'src/app/core/guards/dto/services/utils/AppBaseComponent';
import { lastValueFrom } from "rxjs";
import { TokenService } from "src/app/core/guards/dto/services/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AppBaseComponent{



  /**
   * formulario reactivo de login
   */
  public loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authservice: AuthService, private tokenService: TokenService){
    super();
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required,],
      }
    )

     
  }

  public async signIn(): Promise<void>{

    let dtoLogin: AuthLoginDtoRequestDto;

    if (this.loginForm.valid){
      alert("Esta todo correcto")
      let email = this.loginForm.get('email').value;
      let password = this.loginForm.get('password').value;

      dtoLogin = {
        "email" : email,
        password
      }

      await lastValueFrom(this.authservice.signIn(dtoLogin));

      console.log(this.tokenService.getToken());;

      this.router.navigateByUrl("/portafolio");

    }else{
      alert("Hay errores en el formulario");
      console.log(this.getAllErrorsForm(this.loginForm));
      this.loginForm.markAllAsTouched();
    }
    
  }
  

  public signUp(): void{
    this.router.navigateByUrl("/autenticacion/registro"); //navegacion mediante la clase router
  }

  /**
   * retorna mensaje de erorr de un campo del formulario
   * @param field
   * @returns 
   */

  public getErrorForm(field: string): string{

    let message;
    if(this.isTouchedField(this.loginForm, field)){
      if(this.loginForm.get(field).hasError('required')){
        message = 'El campo es requerido';
      } else if(this.loginForm.get(field).hasError('email')){
        message = 'Requiere formato de email'
      }
    }

    return message;
  }

}
