import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import { PlatformService } from '../../platform.service';

register();

@Component({
  selector: 'app-album-fotos',
  imports: [CommonModule],
  templateUrl: './album-fotos.component.html',
  styleUrl: './album-fotos.component.css',
})
export class AlbumFotosComponent implements AfterViewInit {
  private platformService = inject(PlatformService);

  public async ngAfterViewInit() {
    if (this.platformService.isBrowser()) {
      setTimeout(() => {
        const swiper = new Swiper('.swiper', {
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: false,
            clickable: true,
          },
          slidesPerView: 'auto',
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      }, 1000);
    }
  }
}
