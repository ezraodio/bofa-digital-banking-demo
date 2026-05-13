import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { UserProfile } from '../../shared/models/account.model';

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  tokenType: string;
  ssoSessionId: string;
}

export interface MfaChallenge {
  challengeId: string;
  method: 'SMS' | 'EMAIL' | 'TOTP';
  maskedDestination: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<AuthToken | null>(null);
  private userSubject = new BehaviorSubject<UserProfile | null>(null);
  private mfaRequiredSubject = new BehaviorSubject<boolean>(false);

  public token$ = this.tokenSubject.asObservable();
  public user$ = this.userSubject.asObservable();
  public mfaRequired$ = this.mfaRequiredSubject.asObservable();

  constructor() {
    this.bootstrapDemoSession();
  }

  get isAuthenticated(): boolean {
    const token = this.tokenSubject.value;
    return token !== null && token.expiresAt > Date.now();
  }

  get currentUser(): UserProfile | null {
    return this.userSubject.value;
  }

  get currentToken(): AuthToken | null {
    return this.tokenSubject.value;
  }

  login(username: string, password: string): Observable<AuthToken> {
    // Mock SSO authentication flow
    const mockToken: AuthToken = {
      accessToken: `sso_token_${Date.now()}`,
      refreshToken: `refresh_${Date.now()}`,
      expiresAt: Date.now() + 3600000,
      tokenType: 'Bearer',
      ssoSessionId: `sso_session_${Math.random().toString(36).substring(7)}`,
    };

    return of(mockToken).pipe(
      delay(800),
      tap((token) => {
        this.tokenSubject.next(token);
        this.mfaRequiredSubject.next(true); // Always require MFA
      })
    );
  }

  verifyMfa(challengeId: string, code: string): Observable<boolean> {
    if (code.length !== 6) {
      return throwError(() => new Error('Invalid MFA code'));
    }

    return of(true).pipe(
      delay(500),
      tap(() => {
        this.mfaRequiredSubject.next(false);
        this.loadUserProfile();
      })
    );
  }

  requestMfaChallenge(): Observable<MfaChallenge> {
    const challenge: MfaChallenge = {
      challengeId: `mfa_${Date.now()}`,
      method: 'SMS',
      maskedDestination: '***-***-1234',
    };
    return of(challenge).pipe(delay(300));
  }

  refreshToken(): Observable<AuthToken> {
    const currentToken = this.tokenSubject.value;
    if (!currentToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    const newToken: AuthToken = {
      ...currentToken,
      accessToken: `sso_token_${Date.now()}`,
      expiresAt: Date.now() + 3600000,
    };

    return of(newToken).pipe(
      delay(300),
      tap((token) => this.tokenSubject.next(token))
    );
  }

  logout(): void {
    this.tokenSubject.next(null);
    this.userSubject.next(null);
    this.mfaRequiredSubject.next(false);
    this.bootstrapDemoSession();
  }

  private bootstrapDemoSession(): void {
    this.tokenSubject.next({
      accessToken: 'demo_access_token',
      refreshToken: 'demo_refresh_token',
      expiresAt: Date.now() + 3600000,
      tokenType: 'Bearer',
      ssoSessionId: 'demo_sso_session',
    });
    this.mfaRequiredSubject.next(false);
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    const mockUser: UserProfile = {
      id: 'usr_001',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '***-***-1234',
      lastLogin: new Date(),
      mfaEnabled: true,
      preferredLanguage: 'en-US',
      notificationPreferences: {
        email: true,
        sms: true,
        push: true,
        fraudAlerts: true,
        balanceAlerts: true,
        transactionAlerts: false,
      },
    };
    this.userSubject.next(mockUser);
  }
}
