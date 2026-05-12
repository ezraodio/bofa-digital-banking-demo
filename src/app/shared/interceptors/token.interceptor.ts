import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService, AuthToken } from '../../core/auth/auth.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<AuthToken | null>(null);

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const token = authService.currentToken;

  let request = req;
  if (token) {
    request = addToken(request, token.accessToken);
    request = addSsoHeaders(request, token.ssoSessionId);
  }

  return next(request).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(request, next, authService);
      }
      return throwError(() => error);
    })
  );
};

function addToken(
  request: HttpRequest<unknown>,
  token: string
): HttpRequest<unknown> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function addSsoHeaders(
  request: HttpRequest<unknown>,
  ssoSessionId: string
): HttpRequest<unknown> {
  return request.clone({
    setHeaders: {
      'X-SSO-Session-Id': ssoSessionId,
      'X-Request-Id': generateRequestId(),
      'X-Client-Version': '18.2.0',
    },
  });
}

function handle401Error(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<unknown>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((token) => {
        isRefreshing = false;
        refreshTokenSubject.next(token);
        return next(addToken(request, token.accessToken));
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.logout();
        return throwError(() => err);
      })
    );
  }

  return refreshTokenSubject.pipe(
    filter((token) => token !== null),
    take(1),
    switchMap((token) => {
      return next(addToken(request, token!.accessToken));
    })
  );
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}
