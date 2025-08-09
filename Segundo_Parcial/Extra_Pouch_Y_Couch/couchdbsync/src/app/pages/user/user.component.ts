import { Component } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user: IUser = {
    _id: '',
    name: '',
    email: ''
  }

  users:IUser[] = []
    /* Inyectamos dependencias al constructor */
  constructor(private service: UserService ) {}

    ngOnInit() {
      this.sincronizar();
    }

    /*Metodo de consulta para listar elementos*/
    list(){
      this.service.getAllDocuments().then((data:any) => {
        this.users = data.rows.map((row:any) => row.doc)
    }).catch((err:any) => {
        console.log('Error al obtener los documentos:', err);
      }) 
  }


    /* Permite vaciar la tabla para insertar nuevos */
    new() {
      this.user = {
        _id: '',
        name: '',
        email: ''
      };
    }

    save() {
      this.service.addDocument(this.user).then((data:any) => {
        console.log(`Document created: ${data.id}`);
        this.list();
        this.new();
    }).catch((err:any) => {
        console.log(err);
      })
    }

    edit(user: IUser) {
      this.user = user;
    }

    delete(user: IUser) {
      this.service.deleteDocument(user).then((data:any) => {
        console.log(`Documento borrado: ${data.id}`);
        this.list();
      }).catch((err:any) => {
        console.log(err);
      })
    }
    
    sincronizar() {
      this.service.syncWithCouchDB('http://admin:admin@127.0.0.1:5984/customer');
    }

}


