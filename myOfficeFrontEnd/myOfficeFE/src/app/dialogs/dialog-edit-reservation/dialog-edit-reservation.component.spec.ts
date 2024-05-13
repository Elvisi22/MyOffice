import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditReservationComponent } from './dialog-edit-reservation.component';

describe('DialogEditReservationComponent', () => {
  let component: DialogEditReservationComponent;
  let fixture: ComponentFixture<DialogEditReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
