import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupmoduleComponent } from './groupmodule.component';

describe('GroupmoduleComponent', () => {
  let component: GroupmoduleComponent;
  let fixture: ComponentFixture<GroupmoduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupmoduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
