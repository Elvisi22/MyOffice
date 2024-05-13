import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeletionComponent } from './dialog-deletion.component';

describe('DialogDeletionComponent', () => {
  let component: DialogDeletionComponent;
  let fixture: ComponentFixture<DialogDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeletionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
