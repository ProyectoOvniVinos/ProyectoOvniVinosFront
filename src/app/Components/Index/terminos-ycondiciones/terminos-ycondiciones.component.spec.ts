import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminosYcondicionesComponent } from './terminos-ycondiciones.component';

describe('TerminosYcondicionesComponent', () => {
  let component: TerminosYcondicionesComponent;
  let fixture: ComponentFixture<TerminosYcondicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminosYcondicionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminosYcondicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
