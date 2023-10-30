package com.ehuamanttupa.app.controllers;

import com.ehuamanttupa.app.exceptions.ResourceNotFoundException;
import com.ehuamanttupa.app.models.Empleado;
import com.ehuamanttupa.app.repository.EmpleadoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/")
@CrossOrigin(origins = "http://localhost:4200/")
public class EmpleadoControlador {

    @Autowired
    private EmpleadoRepositorio repositorio;

    //Sirve para listar los empleados
    @GetMapping("/empleados")
    public List<Empleado> listarTodosLosEmpleados(){
        return  repositorio.findAll();
    }

    @PostMapping("/empleados")
    public ResponseEntity<?> guardarEmpleado(@RequestBody Empleado empleado){
        // Verificar si el correo ya está en uso
    if(repositorio.existsByEmail(empleado.getEmail())){
        return ResponseEntity.badRequest().body("El correo ya está en uso");
    }
        Empleado empleadoGuardado = repositorio.save(empleado);
    return  ResponseEntity.ok(empleadoGuardado);
    }



    @GetMapping("/empleados/{id}")
    public ResponseEntity<Empleado> obtenerEmpleador(@PathVariable Long id){
        Empleado empleado = repositorio.findById(id)
                .orElseThrow( () -> new ResourceNotFoundException("No existe  el empleado con el ID :" + id));
        return  ResponseEntity.ok(empleado);
    }

//    @PutMapping("/empleados/{id}")
//    public ResponseEntity<?> actualizarEmpleado(@PathVariable Long id, @RequestBody Empleado detallesEmpleado){
//
//        Empleado empleado = repositorio.findById(id)
//                .orElseThrow( () -> new ResourceNotFoundException("No existe  el empleado con el ID :" + id +" "));
//
//       if(repositorio.existsByEmail(detallesEmpleado.getEmail())){
//           return ResponseEntity.badRequest().body("El correo ya está en uso");
//       }
//
//           empleado.setNombre(detallesEmpleado.getNombre());
//           empleado.setApellido(detallesEmpleado.getApellido());
//           empleado.setEmail(detallesEmpleado.getEmail());
//
//           Empleado empleadoActualizado = repositorio.save(empleado);
//           return  ResponseEntity.ok(empleadoActualizado);
//
//    }

    @PutMapping("/empleados/{id}")
    public ResponseEntity<?> actualizarEmpleado(@PathVariable Long id, @RequestBody Empleado detallesEmpleado) {
        Empleado empleado = repositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe el empleado con el ID: " + id));

        // Verificar si el correo existe para otro empleado
        if (repositorio.existsByEmailAndIdNot(detallesEmpleado.getEmail(), id)) {
            return ResponseEntity.badRequest().body("El correo ya está en uso por otro empleado");
        }

        empleado.setNombre(detallesEmpleado.getNombre());
        empleado.setApellido(detallesEmpleado.getApellido());
        empleado.setEmail(detallesEmpleado.getEmail());

        Empleado empleadoActualizado = repositorio.save(empleado);
        return ResponseEntity.ok(empleadoActualizado);
    }


    @DeleteMapping("/empleados/{id}")
    public ResponseEntity<?> eliminarEmpleado(@PathVariable Long id){
        Empleado empleado = repositorio.findById(id)
                .orElseThrow( () -> new ResourceNotFoundException(("No existe el empleado con el ID")+ id));
        repositorio.delete(empleado);
        return ResponseEntity.ok().build();
    }


}
