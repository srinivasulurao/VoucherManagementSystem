import { FormControl, AbstractControl } from '@angular/forms';

//We can't add asynchronous code here, because this code gets executed after the every time we type.

export function emailValidate(control: FormControl){
     //return (c: FormControl) => {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        return EMAIL_REGEXP.test(control.value) ? null : {emailValidate: {valid: false}};
     //};
}
