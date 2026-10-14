import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tareas } from './servicios/tareas';
import { Tarea } from './modelos/tarea';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private servicio = inject(Tareas);

  tareas = signal<Tarea[]>([]);
  titulo = '';
  descripcion = '';

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.servicio.listar().subscribe((datos) => this.tareas.set(datos));
  }

  agregar(): void {
    if (!this.titulo.trim()) return;
    const nueva: Tarea = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      completada: false,
    };
    this.servicio.crear(nueva).subscribe(() => {
      this.titulo = '';
      this.descripcion = '';
      this.cargar();
    });
  }

  alternar(tarea: Tarea): void {
    this.servicio
      .actualizar(tarea.id!, { completada: !tarea.completada })
      .subscribe(() => this.cargar());
  }

  eliminar(tarea: Tarea): void {
    this.servicio.eliminar(tarea.id!).subscribe(() => this.cargar());
  }
}