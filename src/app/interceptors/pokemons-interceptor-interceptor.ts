import { HttpInterceptorFn } from '@angular/common/http';

export const pokemonsInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
