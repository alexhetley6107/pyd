import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchPasswords = (passwordField: string, confirmField: string): ValidatorFn => {
  return (form: AbstractControl): ValidationErrors | null => {
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
): ValidationErrors | null => {
  const value = control.value || '';

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  const valid = hasUpperCase && hasLowerCase && hasNumber && hasSymbol;

  return valid ? null : { weakPassword: true };
};
