import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Empleados } from 'src/app/empleados';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import swal from 'sweetalert2'; // Importar SweetAlert

@Component({
  selector: 'app-registrar-empleados',
  templateUrl: './registrar-empleados.component.html',
  styleUrls: ['./registrar-empleados.component.css']
})
export class RegistrarEmpleadosComponent implements OnInit {

  empleado : Empleados = new Empleados();

  empleadoForm: FormGroup;


  constructor(
    private empleadoServicio:EmpleadoService,
    private router:Router,
    private formBuilder:FormBuilder
  ) {
    this.empleadoForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
    });
   }

  ngOnInit(): void {
  }
  
  guardarEmpleado() {
    this.empleadoServicio.registrarEmpleado(this.empleado).subscribe(
      (respuesta) => {
        console.log(respuesta); // Imprime la respuesta en la consola para depuración
        swal.fire('Empleado registrado', `El empleado ${this.empleado.nombre} ha sido registrado con éxito`, 'success');
        this.IrListaEmpleado();
      },
      (error) => {
        console.error(error); // Muestra el error en la consola para depuración
        if (error.error && error.error === 'El correo ya está en uso') {
         swal.fire('Error', 'El correo ingresado ya está en uso. Por favor, utiliza otro correo.', 'error');
        } else {
          swal.fire('Error', 'Ha ocurrido un problema al registrar el empleado', 'error');
        }
      }
    );
  }
  
  

  // Ir Lista
  IrListaEmpleado(){
    this.router.navigate(['/empleados']);
  }

  onSubmit(){

   this.guardarEmpleado();


  }

}
