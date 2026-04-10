import { AbstractControl, FormGroup } from '@angular/forms';
import { Nullable } from '../types';

export const ERROR_MESSAGES: Record<string, (error: any, field?: string) => string> = {
  required: (_, field = 'This field') => `${field} is required.`,
  minlength: (error) => `Minimum ${error.requiredLength} characters required.`,
  maxlength: (error) => `Maximum ${error.requiredLength} characters allowed.`,
  email: () => `Invalid email address.`,
  pattern: () => `Invalid format.`,
  passwordsMismatch: () => `Passwords do not match.`,
  weakPassword: () => `Password must contain uppercase, lowercase, number, and symbol.`,
};

export function getError(
  control: Nullable<AbstractControl>,
  fieldName = 'This field',
  formGroup?: FormGroup,
  formLevelErrorKey?: string
): Nullable<string> {
  if (!control || !control.touched) return null;

  // First check field-level errors
  if (control.errors) {
    for (const key of Object.keys(control.errors)) {
      const generator = ERROR_MESSAGES[key];
      if (generator) {
        return generator(control.errors[key], fieldName);
      }
    }
  }

  // Then check form-level error (like password mismatch)
  if (formGroup?.errors && formGroup.errors[formLevelErrorKey || '']) {
    const generator = ERROR_MESSAGES[formLevelErrorKey || ''];
    return generator ? generator(null, fieldName) : 'Invalid input.';
  }

  return null;
}
