import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrCustomdetailsComponent } from './tr-customdetails.component';

describe('TrCustomdetailsComponent', () => {
  let component: TrCustomdetailsComponent;
  let fixture: ComponentFixture<TrCustomdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrCustomdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrCustomdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
