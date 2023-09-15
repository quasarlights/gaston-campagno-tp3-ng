import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelEmpleadoComponent } from './components/panel-empleado/panel-empleado.component';
import { CardsComponent } from './components/cards/cards.component';

const routes: Routes = [
  { path: '', component: CardsComponent },
  { path: 'empleado', component: PanelEmpleadoComponent },
  //{ path: 'jornada', component: OtroComponente }, // Aquí debes reemplazar OtroComponente con el componente real que quieres mostrar.

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
