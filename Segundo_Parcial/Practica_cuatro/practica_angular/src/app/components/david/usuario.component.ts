import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { UsuarioService } from "../../service/usuario.service";
import { IUsuario } from "../../models/usuario.interface";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario.component.html'
  , styleUrls: ['./usuario.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: IUsuario[] = [];
  usuarioForm!: FormGroup;
  editando: boolean = false;
  idEditando: number | null = null;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: [''],
      correo: [''],
      fechaRegistro: ['']
    });

    this.usuarioService.getUsuarios().subscribe(data => this.usuarios = data);
  }

  guardar(): void {
    const usuario: IUsuario = this.usuarioForm.value;
    if (this.editando && this.idEditando !== null) {
      usuario.id = this.idEditando;
      this.usuarioService.updateUsuario(usuario);
    } else {
      this.usuarioService.addUsuario(usuario);
    }

    this.resetFormulario();
  }

  editar(usuario: IUsuario): void {
    this.usuarioForm.setValue({
      nombre: usuario.nombre,
      correo: usuario.correo,
      fechaRegistro: usuario.fechaRegistro
    });
    this.editando = true;
    this.idEditando = usuario.id;
  }

  eliminar(id: number): void {
    this.usuarioService.deleteUsuario(id);
    this.resetFormulario();
  }

  resetFormulario(): void {
    this.usuarioForm.reset();
    this.editando = false;
    this.idEditando = null;
  }
}