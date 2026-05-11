import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface AnalyticsEvent {
  eventName: string;
  category: string;
  properties: Record<string, unknown>;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private sessionId: string;
  private eventQueue: AnalyticsEvent[] = [];
  private readonly BATCH_SIZE = 10;
  private readonly FLUSH_INTERVAL = 5000;

  constructor(private router: Router) {
    this.sessionId = this.generateSessionId();
    this.setupPageTracking();
    this.startFlushInterval();
  }

  trackEvent(
    eventName: string,
    category: string,
    properties: Record<string, unknown> = {}
  ): void {
    const event: AnalyticsEvent = {
      eventName,
      category,
      properties: {
        ...properties,
        platform: 'web',
        appVersion: '14.2.0',
        screenResolution: `${window.innerWidth}x${window.innerHeight}`,
      },
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };

    this.eventQueue.push(event);

    if (this.eventQueue.length >= this.BATCH_SIZE) {
      this.flush();
    }
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

    const batch = this.eventQueue.splice(0, this.BATCH_SIZE);
    // In production, this would POST to the analytics endpoint
    console.log('[Analytics SDK] Flushing batch:', batch.length, 'events');
  }

  private startFlushInterval(): void {
    setInterval(() => this.flush(), this.FLUSH_INTERVAL);
  }

  private generateSessionId(): string {
    return `analytics_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;
  }
}
