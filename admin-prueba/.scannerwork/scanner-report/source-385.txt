import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconsModule } from '../../icons/icons.module';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {
  blogData = [
    {
      image:'assets/images/blog/01.jpg',
      title:'Design your apps in your own way',
      desc:'This is required when, for example, the final text is not yet available.',
      date:'13th March 2023'
    },
    {
      image:'assets/images/blog/02.jpg',
      title:'How apps is changing the IT world',
      desc:'This is required when, for example, the final text is not yet available.',
      date:'5th May 2023'
    },
    {
      image:'assets/images/blog/03.jpg',
      title:'Smartest Applications for Business',
      desc:'This is required when, for example, the final text is not yet available.',
      date:'19th June 2023'
    }
  ]
}
