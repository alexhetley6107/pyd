import { HttpParams } from '@angular/common/http';

export const getHttpParams = (queries: Record<string, unknown> = {}) => {
  let params = new HttpParams();

  Object.entries(queries).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params = params.set(key, String(value));
    }
  });

  return params;
};
