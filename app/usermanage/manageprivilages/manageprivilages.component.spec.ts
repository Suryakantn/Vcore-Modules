import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageprivilagesComponent } from './manageprivilages.component';

describe('ManageprivilagesComponent', () => {
  let component: ManageprivilagesComponent;
  let fixture: ComponentFixture<ManageprivilagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageprivilagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageprivilagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
