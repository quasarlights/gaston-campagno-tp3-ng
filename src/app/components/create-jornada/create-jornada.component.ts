import { Component, OnInit } from '@angular/core';
import { Concepto } from 'src/app/models/Concepto';
import { JornadaRequest } from 'src/app/models/JornadaRequest';
import { Empleado } from 'src/app/models/Empleado';
import { ConceptoService } from 'src/app/services/concepto.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { JornadaService } from 'src/app/services/jornada.service';

@Component({
  selector: 'app-create-jornada',
  templateUrl: './create-jornada.component.html',
  styleUrls: ['./create-jornada.component.css']
})
export class CreateJornadaComponent implements OnInit{
  
  constructor(private jornadaService: JornadaService,private conceptoService: ConceptoService,
              private empleadoService: EmpleadoService){}
  
  empleados: Empleado[]=[];
  conceptos: Concepto[]=[];
  
  ngOnInit(): void {
    this.conceptoService.getConceptos().subscribe(data=>{
      this.conceptos=data});
    this.empleadoService.getEmpleados()
      .subscribe(data=>{
        this.empleados= data;})
  }
  empleadoIdSeleccionado=0;
  conceptoIdSeleccionado=0;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//VALIDACION HORAS TRABAJADAS
mostrarMensaje: boolean = false; 

soloNumeros(event: any): void {
  const input = event.target;
  const value = input.value;
  const numbers = /^[0-9]*$/;

  if (!value.match(numbers)) {
    input.value = value.replace(/[^0-9]/g, ''); 
    this.mostrarMensaje = true;
  } else {
    this.mostrarMensaje = false; 
  }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//FETCH API CREAR
/*
crearJornada: void {
  const nuevaJornada: JornadaRequest = {
    // Propiedades del objeto aquí
    idEmpleado: this.empleadoIdSeleccionado,
    idConcepto: this.conceptoIdSeleccionado,
    fecha: (<HTMLInputElement>document.getElementById('fechaJornada')).value,
    horasTrabajadas: +(<HTMLInputElement>document.getElementById('horasTrabajadas')).value
    };
    this.empleadoService.create
  };

      /*
    this.jornadaService.createJornada(nuevaJornada).subscribe(
      (nuevaJornada) => {
        this.mensaje = 'Empleado ' + empleadoCreado.nombre + ' ' + empleadoCreado.apellido + ' creado exitosamente';
        alert(this.mensaje);
        this.router.navigate(['/']);
      },
      (error) => {
        this.mensaje = 'Error al crear el empleado: ' + error.error.message;
        alert(this.mensaje);
      }
    );
  } else {
    // El correo electrónico no es válido, muestra un mensaje de error
    alert('Por favor, ingrese un correo electrónico válido.');
  }*/
  } 

}





