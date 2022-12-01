import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupModalsComponent } from './popup-modals.component';

describe('PopupModalsComponent', () => {
  let component: PopupModalsComponent;
  let fixture: ComponentFixture<PopupModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupModalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
