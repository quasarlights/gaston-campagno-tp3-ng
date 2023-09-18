import { Component } from '@angular/core';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../shared/validators/email-validator';
@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent {

  //VALIDACION DNI
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
  }

  //VALIDACIONES NOMBRE Y APELLIDO
  mostrarMensajeNombre: boolean = false; 
  mostrarMensajeApellido: boolean = false; 

  soloLetras(event: any): void {
    const input = event.target;
    const value = input.value;
    const letters = /^[A-Za-z ]*$/;

    if (!value.match(letters)) {
      input.value = value.replace(/[^A-Za-z ]/g, ''); // Eliminar caracteres no válidos
      this.mostrarMensajeNombre = input.id === 'name'; // Mostrar el mensaje de error según el campo
      this.mostrarMensajeApellido = input.id === 'surname';
    } else {
      this.mostrarMensajeNombre = false; // Ocultar el mensaje de error si la entrada es válida
      this.mostrarMensajeApellido = false;
    }
  }

  //VALIDACION EMAIL

 // Crea un FormGroup para el formulario
 formulario: FormGroup;
 constructor(private fb: FormBuilder, private empleadoService: EmpleadoService) {
   // Define el formulario y aplica validadores
   this.formulario = this.fb.group({
     email: ['', [Validators.required, Validators.email]]
   });
 }
  //ENVIAR REQUEST PARA CREAR EMPLEADO
  mensaje: string = '';
  crearEmpleado(): void {
    // Verifica si el campo de correo electrónico es válido
    const emailInput = <HTMLInputElement>document.getElementById('email');
    if (emailInput && emailInput.validity.valid) {
      // El correo electrónico es válido, puedes enviar la solicitud
      const nuevoEmpleado: Empleado = {
        id: 0, 
        nroDocumento: +(<HTMLInputElement>document.getElementById('nroDocumento')).value,
        nombre: (<HTMLInputElement>document.getElementById('name')).value,
        apellido: (<HTMLInputElement>document.getElementById('surname')).value,
        email: emailInput.value,
        fechaNacimiento: (<HTMLInputElement>document.getElementById('birthDay')).value,
        fechaIngreso: (<HTMLInputElement>document.getElementById('admissionDay')).value,
        fechaCreacion: ''
      };
  
      this.empleadoService.createEmpleado(nuevoEmpleado).subscribe(
        (empleadoCreado) => {
          this.mensaje = 'Empleado ' + empleadoCreado.nombre + ' ' + empleadoCreado.apellido + ' creado exitosamente';
          alert(this.mensaje);
        },
        (error) => {
          this.mensaje = 'Error al crear el empleado: ' + error.error.message;
          alert(this.mensaje);
        }
      );
    } else {
      // El correo electrónico no es válido, muestra un mensaje de error
      alert('Por favor, ingrese un correo electrónico válido.');
    }
  }
  
  /*
  crearEmpleado(): void {
    const nuevoEmpleado: Empleado = {
      id: 0, 
      nroDocumento: +(<HTMLInputElement>document.getElementById('nroDocumento')).value,
      nombre: (<HTMLInputElement>document.getElementById('name')).value,
      apellido: (<HTMLInputElement>document.getElementById('surname')).value,
      email: (<HTMLInputElement>document.getElementById('exampleInputEmail1')).value,
      fechaNacimiento: (<HTMLInputElement>document.getElementById('birthDay')).value,
      fechaIngreso: (<HTMLInputElement>document.getElementById('admissionDay')).value,
      fechaCreacion: ''
    };

    this.empleadoService.createEmpleado(nuevoEmpleado).subscribe(
      (empleadoCreado) => {
        this.mensaje = 'Empleado '+empleadoCreado.nombre+' '+empleadoCreado.apellido+' creado exitosamente';
        alert(this.mensaje);
      },
      (error) => {
        this.mensaje = 'Error al crear el empleado: ' + error.error.message;
        alert(this.mensaje);
      }
    );
  }*/

}
