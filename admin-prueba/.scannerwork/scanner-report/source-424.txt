import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  private windowSize = new BehaviorSubject<{ width: number, height: number }>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  constructor() {
    this.updateWindowSize();
    window.addEventListener('resize', this.updateWindowSize.bind(this));
  }

  private updateWindowSize() {
    this.windowSize.next({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  getWindowSize() {
    return this.windowSize.asObservable();
  }
}
