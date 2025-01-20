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

  createCalendar() {
      const title = "Boda de Luis y Karen";
      const description = "Únete a la celebración de la boda de Luis y Karen.";
      const location = "Santa María Catedral - Chiclayo";
      const startDate = "20250215T200000"; // 15 de febrero de 2025 a las 8 PM
      const endDate = "20250215T230000"; // Finaliza a las 10 PM

      // Crear contenido del archivo .ics
      const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${title}\nDESCRIPTION:${description}\nLOCATION:${location}\nDTSTART:${startDate}\nDTEND:${endDate}\nEND:VEVENT\nEND:VCALENDAR`;

      // Crear archivo Blob para descargar
      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);

      // Crear enlace para descargar el archivo
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Boda_de_Luis_y_Karen.ics';

      // Simular clic para iniciar la descarga
      link.click();

      // Liberar URL
      URL.revokeObjectURL(url);
  }
}
