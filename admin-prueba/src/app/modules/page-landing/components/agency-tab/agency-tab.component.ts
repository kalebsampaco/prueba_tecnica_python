import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-agency-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agency-tab.component.html',
  styleUrl: './agency-tab.component.scss'
})
export class AgencyTabComponent {
    activeIndex:number = 1
      tabClick(index:number){
        this.activeIndex = index
      }
}
