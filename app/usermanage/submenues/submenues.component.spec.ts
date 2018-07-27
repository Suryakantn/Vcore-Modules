import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuesComponent } from './submenues.component';

describe('SubmenuesComponent', () => {
  let component: SubmenuesComponent;
  let fixture: ComponentFixture<SubmenuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmenuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
