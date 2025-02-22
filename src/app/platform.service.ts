import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Record<string, unknown>,
  ) {}
  public isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
  public isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

}
