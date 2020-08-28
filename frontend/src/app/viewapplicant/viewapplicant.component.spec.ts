import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewapplicantComponent } from './viewapplicant.component';

describe('ViewapplicantComponent', () => {
  let component: ViewapplicantComponent;
  let fixture: ComponentFixture<ViewapplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewapplicantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewapplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
