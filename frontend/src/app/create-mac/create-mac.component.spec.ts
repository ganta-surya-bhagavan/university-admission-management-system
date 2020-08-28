import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMacComponent } from './create-mac.component';

describe('CreateMacComponent', () => {
  let component: CreateMacComponent;
  let fixture: ComponentFixture<CreateMacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
