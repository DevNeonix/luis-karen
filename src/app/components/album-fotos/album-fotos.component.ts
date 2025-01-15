import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
declare let Swiper: any;
@Component({
  selector: 'app-album-fotos',
  imports: [CommonModule],
  templateUrl: './album-fotos.component.html',
  styleUrl: './album-fotos.component.css',
})
export class AlbumFotosComponent implements AfterViewInit{
  public async ngAfterViewInit() {
    setTimeout(() => {
      const swiper = new Swiper(".swiper", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: false,
          clickable: true
        },
        slidesPerView: 1.3,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
      });
    }, 1000);
  }
}
