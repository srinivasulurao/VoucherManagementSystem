import { FormControl, AbstractControl } from '@angular/forms';

export function emailValidate(control: FormControl){
    return (c: FormControl) => {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    
        return EMAIL_REGEXP.test(c.value) ? null : {
          validateEmail: {
            valid: false
          }
        };
      };
}