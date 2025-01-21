import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { PlatformService } from '../../platform.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css'],
})
export class CountdownComponent implements OnInit, OnDestroy {
  public dateEvent = new Date(2025, 1, 15, 20, 0, 0); // Fecha objetivo
  public remainingDays: number = 0;
  public remainingHours: number = 0;
  public remainingMinutes: number = 0;
  public remainingSeconds: number = 0;

  private countdownSubscription: Subscription | null = null;

  private platformService = inject(PlatformService);

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  private startCountdown(): void {
    this.updateCountdown();

    if (this.platformService.isBrowser()) {
      this.countdownSubscription = interval(1000).subscribe(() => {
        this.updateCountdown();
      });
    }
  }

  private updateCountdown(): void {
    const now = new Date().getTime();
    const target = this.dateEvent.getTime();
    const difference = target - now;

    if (difference > 0) {
      this.remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      this.remainingHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.remainingMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      this.remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);
    } else {
      this.remainingDays = 0;
      this.remainingHours = 0;
      this.remainingMinutes = 0;
      this.remainingSeconds = 0;
    }
  }
}
