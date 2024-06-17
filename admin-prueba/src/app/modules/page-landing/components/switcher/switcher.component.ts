import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { IconsModule } from '../../icons/icons.module';

@Component({
  selector: 'app-switcher',
  standalone: true,
  imports: [CommonModule,IconsModule],
  templateUrl: './switcher.component.html',
  styleUrl: './switcher.component.scss'
})
export class SwitcherComponent {
  htmlTag:any = ''
  switcherRtl:any = ''

  change(event:any) {
    this.htmlTag = document.getElementsByTagName("html")[0]  as any
    if (this.htmlTag.className.includes("dark")) {
      this.htmlTag.className = 'light'
      } else {
          this.htmlTag.className = 'dark'
      }
    }

    changeLayout(e:any){
      e.preventDefault();
        this.switcherRtl = document.getElementById("switchRtl")
        if (this.switcherRtl.innerText === "LTR") {
          document.documentElement.dir = "ltr"
        }
        else {
          document.documentElement.dir = "rtl"
        }
    }
    scrolled: boolean = false;
    @HostListener("window:scroll", [])
    onWindowScroll() {
        this.scrolled = window.scrollY > 50;
    }
    topFunction(){
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    }
}
