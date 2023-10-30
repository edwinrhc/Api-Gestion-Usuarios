import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleados } from 'src/app/empleados';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  empleados:Empleados[];

  constructor(private empleadoService:EmpleadoService, private router:Router) { }

  ngOnInit(): void {
   this.obtenerEmpleados();
  }

  private obtenerEmpleados(){
    this.empleadoService.obtenerListaDeEmpleados().subscribe(dato => {
     this.empleados = dato;
    });
  }

  actualizarEmpleado(id:number){
    this.router.navigate(['actualizar-empleado',id])
  }

  // eliminarEmpleado(id:number){
  //   this.empleadoService.eliminarEmpleado(id).subscribe(dato => {
  //     console.log(dato);
  //     this.obtenerEmpleados();
  //   })
  // }

  eliminarEmpleado(id:number){
   Swal.fire({
    title: '¿Estás seguro?',
    text:'¡No podrás deshacer esta acción!',
    icon:'warning',
    showCancelButton:true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminalo'
   }).then((result) => {
    if(result.isConfirmed){
      this.empleadoService.eliminarEmpleado(id).subscribe(()=> {
        this.obtenerEmpleados();
        Swal.fire('¡Eliminado!','El registro ha sido eliminado con éxito','success');
      }, error => {
        console.error('Error al eliminar el registro', error);
        Swal.fire('Error', 'Ha ocurrido un problema al eliminar el registro.','error');
      });
    }
   });
  }
}
