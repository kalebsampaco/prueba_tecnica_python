import { Component,  CUSTOM_ELEMENTS_SCHEMA,  ElementRef, OnInit, ViewChild  } from '@angular/core';
// import { register } from 'swiper/element/bundle';

// import { SwiperContainer } from 'swiper/element';
// import { SwiperOptions } from 'swiper/types';

// import 'swiper/swiper-bundle.css';
// import { Pagination, Autoplay } from 'swiper/modules'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexSevenComponent implements OnInit {

    activeindex:number = 1
    constructor() {
    }

    ngOnInit() {
        // register();
    }
  formTab(index:number) {
   this.activeindex = index
  }

  scrollToElement(target: string): void {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

//   @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
//   @ViewChild('swiperThumbs') swiperThumbs!: ElementRef<SwiperContainer>;




  index = 0;

//   swiperConfig: SwiperOptions = {
//     spaceBetween: 10,
//     navigation: true,
//     autoplay: {
//       delay: 3000,
//       },
//     loop: true,
//     speed:1000,

//   }

//   swiperThumbsConfig: SwiperOptions = {
//     spaceBetween: 10,
//     slidesPerView: 4,
//     freeMode: true,
//     watchSlidesProgress: true,
//     autoplay: {
//       delay: 3000,
//       }
//   }
  slideChange(swiper: any) {
    this.index = swiper.detail[0].activeIndex;

  }
}
