import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface AnalyticsEvent {
  eventName: string;
  category: string;
  properties: Record<string, unknown>;
  timestamp: number;
  sessionId: string;
  platform?: string;
  appVersion?: string;
  userId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private eventQueue: AnalyticsEvent[] = [];
  private flushInterval: any;
  private sessionId: string;
  private readonly BATCH_SIZE = 10;
  private readonly FLUSH_INTERVAL = 5000;

  constructor(private router: Router) {
    this.sessionId = this.getSessionId();
    this.setupPageTracking();
    this.flushInterval = setInterval(() => this.flush(), this.FLUSH_INTERVAL);
  }

  track(event: Partial<AnalyticsEvent>): void {
    this.eventQueue.push({
      eventName: event.eventName || '',
      category: event.category || '',
      properties: event.properties || {},
      timestamp: Date.now(),
      platform: 'web',
      appVersion: '2.14.0',
      sessionId: this.sessionId,
    });
    if (this.eventQueue.length >= this.BATCH_SIZE) {
      this.flush();
    }
  }

  trackEvent(
    eventName: string,
    category: string,
    properties: Record<string, unknown> = {}
  ): void {
    this.track({
      eventName,
      category,
      properties: {
        ...properties,
        screenResolution: `${window.innerWidth}x${window.innerHeight}`,
      },
    });
  }

  trackPageView(path: string, title: string): void {
    this.trackEvent('page_view', 'navigation', {
      path,
      title,
      referrer: document.referrer,
    });
  }

  trackUserAction(action: string, element: string, value?: unknown): void {
    this.trackEvent('user_action', 'interaction', {
      action,
      element,
      value,
    });
  }

  trackError(error: Error, context: string): void {
    this.trackEvent('error', 'system', {
      errorMessage: error.message,
      errorStack: error.stack,
      context,
    });
  }

  trackTransaction(
    transactionId: string,
    amount: number,
    type: string
  ): void {
    this.trackEvent('transaction', 'financial', {
      transactionId,
      amount,
      type,
      currency: 'USD',
    });
  }

  private setupPageTracking(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navEnd = event as NavigationEnd;
        this.trackPageView(navEnd.urlAfterRedirects, document.title);
      });
  }

  private flush(): void {
    if (this.eventQueue.length === 0) return;
    const batch = [...this.eventQueue];
    this.eventQueue = [];
    console.log('Analytics flush:', batch.length, 'events');
  }

  private getSessionId(): string {
    return sessionStorage.getItem('analytics_session_id') || `analytics_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }
}
