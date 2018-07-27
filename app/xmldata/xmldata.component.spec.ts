import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XmldataComponent } from './xmldata.component';

describe('XmldataComponent', () => {
  let component: XmldataComponent;
  let fixture: ComponentFixture<XmldataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XmldataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
