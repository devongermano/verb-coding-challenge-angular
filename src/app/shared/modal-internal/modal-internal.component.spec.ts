import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInternalComponent } from './modal-internal.component';

describe('ModalInternalComponent', () => {
  let component: ModalInternalComponent;
  let fixture: ComponentFixture<ModalInternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInternalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
