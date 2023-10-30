import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarEmpleadosComponent } from './actualizar-empleados.component';

describe('ActualizarEmpleadosComponent', () => {
  let component: ActualizarEmpleadosComponent;
  let fixture: ComponentFixture<ActualizarEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarEmpleadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
