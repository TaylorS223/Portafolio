import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import type { IUsuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: IUsuario[] = [
    { id: 1, nombre: 'Juan Pérez', correo: 'juan@example.com', fechaRegistro: '2025-07-23' },
    { id: 2, nombre: 'María Gómez', correo: 'maria@example.com', fechaRegistro: '2025-07-20' },
    { id: 3, nombre: 'Pedro Ruiz', correo: 'pedro@example.com', fechaRegistro: '2025-07-19' }
  ];

  private usuariosSubject = new BehaviorSubject<IUsuario[]>(this.usuarios);

  constructor() {}

  getUsuarios(): Observable<IUsuario[]> {
    return this.usuariosSubject.asObservable();
  }

  addUsuario(usuario: IUsuario): void {
    usuario.id = Date.now(); // Generar id único
    this.usuarios.push(usuario);
    this.usuariosSubject.next([...this.usuarios]);
  }

  updateUsuario(usuario: IUsuario): void {
    const index = this.usuarios.findIndex(u => u.id === usuario.id);
    if (index !== -1) {
      this.usuarios[index] = usuario;
      this.usuariosSubject.next([...this.usuarios]);
    }
  }

  deleteUsuario(id: number): void {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
    this.usuariosSubject.next([...this.usuarios]);
  }
}
