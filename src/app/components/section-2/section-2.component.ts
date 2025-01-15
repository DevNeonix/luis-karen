import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownComponent } from '../countdown/countdown.component';
import { AlbumFotosComponent } from '../album-fotos/album-fotos.component';

@Component({
  selector: 'app-section-2',
  imports: [CommonModule, CountdownComponent, AlbumFotosComponent],
  templateUrl: './section-2.component.html',
  styleUrl: './section-2.component.css',
})
export class Section2Component {}
