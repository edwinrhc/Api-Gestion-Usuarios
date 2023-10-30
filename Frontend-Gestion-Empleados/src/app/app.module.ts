import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaEmpleadosComponent } from './empleados/lista-empleados/lista-empleados.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegistrarEmpleadosComponent } from './empleados/registrar-empleados/registrar-empleados.component';
import { FormsModule } from '@angular/forms';
import { ActualizarEmpleadosComponent } from './empleados/actualizar-empleados/actualizar-empleados.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ListaEmpleadosComponent,
    RegistrarEmpleadosComponent,
    ActualizarEmpleadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
