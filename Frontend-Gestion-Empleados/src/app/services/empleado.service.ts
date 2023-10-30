import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleados } from '../empleados';
import { Observable } from 'rxjs/internal/Observable';
import { of,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  // Está URL obtiene el listado de todos los empleados en le backend
  private baseURL = "http://localhost:8092/api/v1/empleados";

  constructor(private httpClient: HttpClient) { }


// Este metodo nos sirve para obtener  la lista de empleados
  obtenerListaDeEmpleados(): Observable<Empleados[]> {
    return this.httpClient.get<Empleados[]>(`${this.baseURL}`);
  }

  // Metodo sirve para guardar un empleado
  registrarEmpleado(empleado:Empleados): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,empleado);
  }

actualizarEmpleado(id: number, empleado: Empleados): Observable<Object> {
  // Verifica que los campos no sean nulos y cumplan con las restricciones
  if (!empleado.nombre || !empleado.apellido || !empleado.email) {
    return throwError('Campos requeridos no pueden ser nulos');
  }

  return this.httpClient.put(`${this.baseURL}/${id}`, empleado);
}

  obtenerEmpleadoPorId(id:number): Observable<Empleados>{
  return this.httpClient.get<Empleados>(`${this.baseURL}/${id}`);
 }

  eliminarEmpleado(id:number): Observable<Object>
  {
    return this.httpClient.delete(`${this.baseURL}/${id}`)
  }


}
