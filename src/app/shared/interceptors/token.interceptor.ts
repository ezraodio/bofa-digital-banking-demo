import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService, AuthToken } from '../../core/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<AuthToken | null>(null);

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.currentToken;

    if (token) {
      request = this.addToken(request, token.accessToken);
      request = this.addSsoHeaders(request, token.ssoSessionId);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(
    request: HttpRequest<unknown>,
    token: string
  ): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private addSsoHeaders(
    request: HttpRequest<unknown>,
    ssoSessionId: string
  ): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        'X-SSO-Session-Id': ssoSessionId,
        'X-Request-Id': this.generateRequestId(),
        'X-Client-Version': '14.2.0',
      },
    });
  }

  private handle401Error(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
          return next.handle(this.addToken(request, token.accessToken));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => err);
        })
      );
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => {
        return next.handle(this.addToken(request, token!.accessToken));
      })
    );
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }
}
