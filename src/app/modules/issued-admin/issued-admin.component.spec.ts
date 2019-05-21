import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedAdminComponent } from './issued-admin.component';

describe('IssuedAdminComponent', () => {
  let component: IssuedAdminComponent;
  let fixture: ComponentFixture<IssuedAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuedAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuedAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
