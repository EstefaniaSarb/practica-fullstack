import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../modelos/tarea';

@Injectable({ providedIn: 'root' })
export class Tareas {
  private http = inject(HttpClient);
  private url = 'http://localhost:8000/api/tareas/';

  listar(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.url);
  }

  crear(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.url, tarea);
  }

  actualizar(id: string, cambios: Partial<Tarea>): Observable<Tarea> {
    return this.http.patch<Tarea>(`${this.url}${id}/`, cambios);
  }

  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}/`);
  }
}