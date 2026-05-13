import { AnalyticsService } from '../services/analytics.service';

let analyticsServiceInstance: AnalyticsService | null = null;

export function setAnalyticsService(service: AnalyticsService): void {
  analyticsServiceInstance = service;
}

export function TrackEvent(eventName: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(`[TrackEvent] ${eventName}`, { method: propertyKey, args });
      if (analyticsServiceInstance) {
        analyticsServiceInstance.trackEvent(eventName, 'decorator', {
          method: propertyKey,
          args: args.length,
        });
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
