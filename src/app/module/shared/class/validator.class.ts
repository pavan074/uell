import { AbstractControl, ValidatorFn } from '@angular/forms';

export class ValidatorClass {

    static isNumberCheck(): ValidatorFn {
      return  (c: AbstractControl): {[key: string]: boolean} | null => {
        if (c.value !== undefined && (isNaN(c.value))) {
          return { 'value': true };
        }
  
        return null;
      };
    }

}