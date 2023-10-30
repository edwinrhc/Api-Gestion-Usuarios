import { EmpleadoService } from 'src/app/services/empleado.service';
import { Component, OnInit } from '@angular/core';
import { Empleados } from 'src/app/empleados';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-actualizar-empleados',
  templateUrl: './actualizar-empleados.component.html',
  styleUrls: ['./actualizar-empleados.component.css']
})
export class ActualizarEmpleadosComponent implements OnInit {

  empleadoForm: FormGroup;
  id: number;
  empleado:Empleados = new Empleados()


  constructor(
    private empleadoService:EmpleadoService,
    private router:Router,
    private route:ActivatedRoute,
    private formBuilder: FormBuilder) {

    this.empleadoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      apellido: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}$/)]],
    });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.empleadoService.obtenerEmpleadoPorId(this.id).subscribe(dato => {
      this.empleadoForm.patchValue({
        nombre: dato.nombre,
        apellido: dato.apellido,
        email: dato.email
      });
    }, error => console.log(error));
  }


  irAlaListaDeEmpleados(){
    this.router.navigate(['/empleados']);
    swal.fire('Empleado actualizado',`El empleado ${this.empleado.nombre} ha sido actualizado con exito`,`success`);
  }

  onSubmit() {
   this.actualizarRegistro();
  }

  actualizarRegistro(){
    if (this.empleadoForm.valid) {
      this.empleadoService.actualizarEmpleado(this.id, this.empleadoForm.value).subscribe(
        (dato) => {
          swal.fire('Empleado actualizado', `El empleado ha sido actualizado con éxito`, 'success');
          this.router.navigate(['/empleados']);
        },
        (error) => {
          console.log(error);
          if (error.error && error.error === 'El correo ya está en uso por otro empleado') {
            swal.fire('Error', 'El correo ingresado ya está en uso. Por favor, utiliza otro correo.', 'error');
          } else {
            swal.fire('Error', 'Ha ocurrido un problema al actualizar el empleado', 'error');
          }
        }
      );
    }
  }

  nuevoEmpleado() {
    this.empleadoForm.reset();
    swal.fire('Nuevo Empleado', 'Se ha limpiado el formulario para un nuevo empleado', 'info');
  }

}
