import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowrolesComponent } from './showroles.component';

describe('ShowrolesComponent', () => {
  let component: ShowrolesComponent;
  let fixture: ComponentFixture<ShowrolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowrolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
