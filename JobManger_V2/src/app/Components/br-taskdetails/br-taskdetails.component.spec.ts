import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrTaskdetailsComponent } from './br-taskdetails.component';

describe('BrTaskdetailsComponent', () => {
  let component: BrTaskdetailsComponent;
  let fixture: ComponentFixture<BrTaskdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrTaskdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrTaskdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
