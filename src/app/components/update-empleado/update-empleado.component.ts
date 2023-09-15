import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-update-empleado',
  templateUrl: './update-empleado.component.html',
  styleUrls: ['./update-empleado.component.css']
})
export class UpdateEmpleadoComponent implements OnInit{
  empleados:Empleado[]=[];
  empleadoSeleccionado: Empleado= 
  {
    id: 0,
    nroDocumento: 0,
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    fechaIngreso: '',
    fechaCreacion: ''
  };
  empleadoIdSeleccionado: number= 0; // Almacena ID del empleado seleccionado


  constructor(private empleadoService: EmpleadoService){}

  ngOnInit(): void {
      this.empleadoService.getEmpleados().subscribe(data=>{
        this.empleados=data;})
  };

  // Carga la info del empleado cuando se selecciona un empleado
  cargarEmpleado() {
    if (this.empleadoIdSeleccionado) {
      this.empleadoService.getEmpleadoPorId(this.empleadoIdSeleccionado).subscribe(empleado => {
        this.empleadoSeleccionado = empleado;
      });
    }
  }

  actualizarEmpleado() {
    this.empleadoService.updateEmpleado(this.empleadoIdSeleccionado, this.empleadoSeleccionado)
      .subscribe(
        response => {
          console.log("Empleado actualizado con éxito:", response);
          alert("Acutualizacion exitosa: "+ response.apellido)
        },
        error => {
          console.error("Error actualizando el empleado:", error);
        
          alert(error.error.message)
        }
      );
  }
  

}
