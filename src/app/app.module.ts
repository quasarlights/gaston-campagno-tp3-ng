import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadoListComponent } from './components/empleado-list/empleado-list.component';
import { EmpleadoService } from './services/empleado.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardsComponent } from './components/cards/cards.component';
import { PanelEmpleadoComponent } from './components/panel-empleado/panel-empleado.component';
import { DeleteEmpleadoComponent } from './components/delete-empleado/delete-empleado.component';
import { ReadEmpleadoComponent } from './components/read-empleado/read-empleado.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { UpdateEmpleadoComponent } from './components/update-empleado/update-empleado.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EmpleadoListComponent,
    NavbarComponent,
    CardsComponent,
    PanelEmpleadoComponent,
    DeleteEmpleadoComponent,
    ReadEmpleadoComponent,
    CreateEmpleadoComponent,
    UpdateEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FormsModule 
  ],
  providers: [EmpleadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
