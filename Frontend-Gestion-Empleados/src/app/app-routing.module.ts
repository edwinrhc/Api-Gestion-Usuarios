import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmpleadosComponent } from './empleados/lista-empleados/lista-empleados.component';
import { RegistrarEmpleadosComponent } from './empleados/registrar-empleados/registrar-empleados.component';
import { ActualizarEmpleadosComponent } from './empleados/actualizar-empleados/actualizar-empleados.component';

const routes: Routes = [
  {path : 'empleados', component:ListaEmpleadosComponent},
  {path : 'registrar-empleados', component:RegistrarEmpleadosComponent},
  { path: 'actualizar-empleado/:id', component: ActualizarEmpleadosComponent },
  {path :'',redirectTo:'empleados',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
