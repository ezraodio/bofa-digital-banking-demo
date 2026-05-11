import { AnalyticsService } from '../../core/analytics/analytics.service';

let analyticsServiceInstance: AnalyticsService | null = null;

export function setAnalyticsService(service: AnalyticsService): void {
  analyticsServiceInstance = service;
}

export function TrackEvent(eventName: string, category: string) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      if (analyticsServiceInstance) {
        analyticsServiceInstance.trackEvent(eventName, category, {
          method: propertyKey,
          args: args.length,
        });
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
