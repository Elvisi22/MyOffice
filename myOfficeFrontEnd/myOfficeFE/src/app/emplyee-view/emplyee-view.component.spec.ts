import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplyeeViewComponent } from './emplyee-view.component';

describe('EmplyeeViewComponent', () => {
  let component: EmplyeeViewComponent;
  let fixture: ComponentFixture<EmplyeeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmplyeeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmplyeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
