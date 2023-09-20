import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/Empleado';
import { Jornada } from 'src/app/models/Jornada';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { JornadaService } from 'src/app/services/jornada.service';

@Component({
  selector: 'app-read-jornada',
  templateUrl: './read-jornada.component.html',
  styleUrls: ['./read-jornada.component.css']
})
export class ReadJornadaComponent implements OnInit{
  
  constructor(private jornadaService: JornadaService, private empleadoService:EmpleadoService){
    this.mostrarTodasJornadas = false;
    this.mostrarJornadaSelect = false;
    this.empleadoIdSeleccionado= 0
  }

 //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  empleados:Empleado[]=[];

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(data=>{
      this.empleados=data;})
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//SELECCIONAR ID DEL EMPLEADO/ SELECCIONAR TODOS
seleccionarEmpleado(event: any) {
  this.empleadoIdSeleccionado = event.target.value;  
  this.mostrarTodasJornadas = false;
  this.mostrarJornadaSelect = true;
  console.log("Empleado seleccionado:", this.empleadoIdSeleccionado); 
}

seleccionarTodos(event:any){
  this.empleadoIdSeleccionado= 0;
  this.mostrarTodasJornadas = true;
  this.mostrarJornadaSelect = false;
  console.log("Empleado seleccionado:", this.empleadoIdSeleccionado);    
}

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //FETCH ALL JORNADAS
  datos: any;
  mensajeVacio: boolean = false;
  jornadas:Jornada[]=[];
  jornadas1:Jornada[]=[];
  mostrarJornadaSelect=false;
  mostrarTodasJornadas=false;
  btnListarComment=false;
  empleadoIdSeleccionado: Number= 0;
  fechaJornada= (<HTMLInputElement>document.getElementById('fechaJornada'))?.value;

  jornada: Jornada={
    nroDocumento:0,
    nombreCompleto: '',
    fecha: '',
    concepto: '',
    hsTrabajadas: 0
  }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //READ
  read(){
    this.jornadas=[];

    if (this.empleadoIdSeleccionado==0 && !this.mostrarJornadaSelect) {
      this.empleadoIdSeleccionado=0;
      this.readAllJornadas();
      this.jornada={
        nroDocumento:0,
        nombreCompleto: '',
        fecha: '',
        concepto: '',
        hsTrabajadas: 0
      }
    } else if(this.empleadoIdSeleccionado !== 0 && this.fechaJornada){
      this.readJornada(this.empleadoIdSeleccionado, this.fechaJornada);
    }else if (this.empleadoIdSeleccionado==null) {
      this.readJornada(undefined,this.fechaJornada);
    }
    else{
      this.btnListarComment=true;
    }
  }


  readAllJornadas(){
    this.jornadaService.getJornadas().subscribe((response: any) => {
      if (response && response.length > 0) {
        this.jornadas = response;
        console.log(this.jornadas);        
        this.mensajeVacio = false;
      } else {
        this.datos = [];
        this.mensajeVacio = true;
      }
    },
    error=>{
      console.log("Error al traer jornadas: "+ error.error.message);
      alert("Error al traer jornadas: "+ error.error.message);
    })
  }

  
  readJornada(nroDocumento?: Number, fecha?: string): void {    
    console.log('Parámetros recibidos: nroDocumento =', nroDocumento, 'fecha =', fecha);
  
    this.jornadaService.getJornada(nroDocumento, fecha).subscribe(
      (response: any) => {
        console.log('Respuesta de la API:', response);
  
        if (response && response.length > 0) {
          this.jornadas1 = response;
          this.mensajeVacio = false;
        } else {
          this.jornadas1 = [];
          this.mensajeVacio = true;
        }
      },
      (error) => {
        console.log("Error al traer jornadas: " + error.error.message);
        alert("Error al traer jornadas: " + error.error.message);
      }
    );
  }
}
