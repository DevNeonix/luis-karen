import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownComponent } from '../countdown/countdown.component';
declare let lottie: any;
declare let Swiper: any;
@Component({
  selector: 'app-section-1',
  imports: [CommonModule, CountdownComponent],
  templateUrl: './section-1.component.html',
  styleUrl: './section-1.component.css',
})
export class Section1Component implements AfterViewInit {
  @ViewChild('heartAnimation') heartAnimation?: ElementRef;
  public async ngAfterViewInit() {
    if (await this.heartAnimation?.nativeElement) {
      lottie.loadAnimation({
        container: this.heartAnimation?.nativeElement,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'animations/heart.json',
      });

      const swiper = new Swiper(".mySwiper", {});
    }
  }
}
