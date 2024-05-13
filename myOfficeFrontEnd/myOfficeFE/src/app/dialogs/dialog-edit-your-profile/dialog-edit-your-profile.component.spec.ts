import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditYourProfileComponent } from './dialog-edit-your-profile.component';

describe('DialogEditYourProfileComponent', () => {
  let component: DialogEditYourProfileComponent;
  let fixture: ComponentFixture<DialogEditYourProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditYourProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditYourProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
