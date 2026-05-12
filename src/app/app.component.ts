import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalyticsService } from './core/analytics/analytics.service';
import { setAnalyticsService } from './shared/decorators/track-event.decorator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Digital Banking Portal';

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    setAnalyticsService(this.analyticsService);
  }
}
