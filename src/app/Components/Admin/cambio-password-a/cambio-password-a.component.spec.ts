import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioPasswordAComponent } from './cambio-password-a.component';

describe('CambioPasswordAComponent', () => {
  let component: CambioPasswordAComponent;
  let fixture: ComponentFixture<CambioPasswordAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambioPasswordAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioPasswordAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
