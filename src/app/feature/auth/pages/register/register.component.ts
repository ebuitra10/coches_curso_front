import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ErrorsForm } from 'src/app/core/enums/ErrorsForm';
import { RegisterRequestDto } from 'src/app/core/guards/dto/registerRequestDto';
import { AuthService } from 'src/app/core/guards/dto/services/auth.service';
import { TokenService } from 'src/app/core/guards/dto/services/token.service';
import { AppBaseComponent } from 'src/app/core/guards/dto/services/utils/AppBaseComponent';
import { CustomValidators } from 'src/app/core/guards/dto/services/utils/customValidators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends AppBaseComponent{

  public registerForm: FormGroup;

  public passwordGenerated: string;

  public registered: boolean;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService){
    super();
    this.registered = false;
    this.registerForm = this.fb.group({
      cardId:['',[Validators.required]],
      fullName:['',[Validators.required]],
      email:['',[Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
      "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")]],
      numberCellphone:['', [Validators.required, Validators.pattern("^[0-9]*$") ] ]
    })
  }


  public async register(): Promise<void>{

    let dtoRegister: RegisterRequestDto = this.registerForm.value;

    if(this.registerForm.valid){
     
     await lastValueFrom(this.authService.register(dtoRegister)).then(resp => {
        this.passwordGenerated = resp.password;
      })

      this.registered = true;

    }else{
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hay errores en el formulario, por favor revisalo!',
      })
      console.log(this.getAllErrorsForm(this.registerForm));
      this.registerForm.markAllAsTouched();
    }

    
  }

  public getErrorForm(field: string): string{

    let message;

    const required: Array<string> = ["cardId", "fullName", "email", "numberCellphone"]
    const onlyNumber: Array<string> = ["numberCellphone"]
    const formatEmail : Array<string> = ["email"]

    if(this.isTouchedField(this.registerForm, field)){

      if(required.includes(field) && this.registerForm.get(field).hasError('required')){
        message = ErrorsForm.REQUIRED;
      } else if(onlyNumber.includes(field) && this.registerForm.get(field).hasError('pattern')){
        message = ErrorsForm.ONLY_NUMBER;
      } else if(formatEmail.includes(field) && this.registerForm.get(field).hasError('pattern')){
        message = ErrorsForm.EMAIL_FORMAT;
      }
    }

    return message;
  }

  public signIn(): void{
    this.router.navigateByUrl("/autenticacion/inicio-sesion"); //navegacion mediante la clase router
  }
}
