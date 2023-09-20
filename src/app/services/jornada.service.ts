import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jornada } from '../models/Jornada';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  constructor(private http:HttpClient) { }

  private apiUrl= 'http://localhost:8080/jornada';

  getJornada(): Observable<Jornada[]>{
    return this.http.get<Jornada[]>(this.apiUrl);
  }

  createJornada(jornada: Jornada): Observable<Jornada> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Jornada>(this.apiUrl, jornada, { headers });
  }
}
