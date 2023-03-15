import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsJobdetailsComponent } from './ls-jobdetails.component';

describe('LsJobdetailsComponent', () => {
  let component: LsJobdetailsComponent;
  let fixture: ComponentFixture<LsJobdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsJobdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LsJobdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
