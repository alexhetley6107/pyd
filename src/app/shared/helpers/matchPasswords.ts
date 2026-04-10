import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Nullable } from '../types';

export const matchPasswords = (passwordField: string, confirmField: string): ValidatorFn => {
  return (form: AbstractControl): Nullable<ValidationErrors> => {
    const group = form as FormGroup;
    const password = group.get(passwordField)?.value;
    const confirm = group.get(confirmField)?.value;

    if (password !== confirm) {
      return { passwordsMismatch: true };
    }

    return null;
  };
};

export const passwordStrengthValidator: ValidatorFn = (
  control: AbstractControl
): Nullable<ValidationErrors> => {
  const value = control.value || '';

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  const valid = hasUpperCase && hasLowerCase && hasNumber && hasSymbol;

  return valid ? null : { weakPassword: true };
};
