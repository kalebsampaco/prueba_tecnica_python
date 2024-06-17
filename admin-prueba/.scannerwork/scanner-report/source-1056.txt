import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildsComponent } from './childs.component';

describe('ChildsComponent', () => {
  let component: ChildsComponent;
  let fixture: ComponentFixture<ChildsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
