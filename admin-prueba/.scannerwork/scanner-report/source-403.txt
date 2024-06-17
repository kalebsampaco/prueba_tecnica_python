// @ts-nocheck
import { CommonModule } from '@angular/common';
import { Component,  HostListener, VERSION, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-light',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-light.component.html',
  styleUrl: './nav-light.component.scss'
})
export class NavLightComponent {
  manu:boolean = true;
  @Output() menuClick = new EventEmitter<string>();
  toggleManu(){
      this.manu = !this.manu
  }

    name = 'Angular ' + VERSION.major;
    sections: NodeListOf<HTMLElement>;
    navLi: NodeListOf<HTMLElement>;

    ngOnInit() {
      this.sections = document.querySelectorAll('section');
      this.navLi = document.querySelectorAll('nav .container .navigation ul li');
    }

    current: any = '';
    scrolled: boolean = false;

    @HostListener('window:scroll', ['$event'])
    onscroll() {
      this.sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        this.scrolled = window.scrollY > 50;
        if (scrollY >= sectionTop - 60) {
          this.current = section.getAttribute('id');
        }
      });

      this.navLi.forEach((li) => {
        if (li.classList.contains(this.current)) {
          li.classList.add('active');
        } else{
          li.classList.remove('active');
        }
      });
    }

    onMenuClick(target: string): void {
        this.menuClick.emit(target);
    }

}
