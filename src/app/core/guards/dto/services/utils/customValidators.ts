import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Clase para manejar validadores personalizados
 */

export class CustomValidators{

    static EmailValidator(email: string): ValidatorFn{

        return(control: AbstractControl): ValidationErrors | null => {

            const emailCtrl: string = control.get(email).value;

            if(emailCtrl.match("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
            "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")){
                return {emailValidate: true}
            }

            return null;
        }
    }

    static MatchValidator(source: string, target: string): ValidatorFn{
        return(control: AbstractControl): ValidationErrors | null => {
            const sourceCtrl = control.get(source);
            const targetCtrl = control.get(target);

            return sourceCtrl && targetCtrl && sourceCtrl.value != targetCtrl.value ? {mismatch: true} : null
        }

    }




}