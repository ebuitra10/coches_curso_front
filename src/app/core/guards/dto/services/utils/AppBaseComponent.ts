import { FeatureRoutingModule } from './../../../../../feature/feature-routing.module';
import { FormArray, FormGroup } from "@angular/forms";

/**
 * Componente padre con validaciones generales
 */
export class AppBaseComponent {

    /**
     * Valida si tocaron un input
     * @param form 
     * @param field 
     */
    public isTouchedField = (form: FormGroup, field: string): boolean => {
        return form?.get(field).touched === true && form?.get(field).invalid;
    }


    /**
     * retorna todos los errores o vallidaciones presentes en el FormGroup
     * @param form Form a evaluar
     */

    public getAllErrorsForm(form: FormGroup | FormArray): { [key: string]: any; } | null {
        let hasError = false;
        const result = Object.keys(form.controls).reduce((acc:{[p:string]:any}, key:string) => {
            const control = form.get(key);
            const errors = (control instanceof FormGroup || control instanceof FormArray)
                ? this.getAllErrorsForm(control)
                : control.errors;
            if(errors){
                acc[key] = errors;
                hasError = true;
            }

            return acc;
        }, {} as {[key: string]: any; });
        return hasError ? result : null;
    }
    
}