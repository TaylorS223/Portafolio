import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb-browser';
import find from 'pouchdb-find';
PouchDB.plugin(find);

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private _db:any;
  constructor(){
    this._db = new PouchDB('customer');
  }

  /* Metodos */
  /* Agregar objeto a base local*/
  addDocument(doc:any){
    return this._db.post(doc);
  }
  /* Obtener objeto */
  getDocument(id:string){
    return this._db.get(id);
  }
  /* Obtener todos los objetos de la base local*/
  getAllDocuments(){
    return this._db.allDocs({include_docs: true});
  }
  /* Actualizar objeto */
  updateDocument(doc:any){
    return this._db.put(doc);
  }
  /* Eliminar objeto */
  deleteDocument(doc:any){
    return this._db.remove(doc);
  }

  /* Sincronizar base de datos local con la remota */
  syncWithCouchDB(remoteDbURL:string){
    const remoteDb = new PouchDB(remoteDbURL);
    this._db.sync(remoteDb, {
      live: true, /*sincronizacion continua*/
      retry: true /*reintentos automaticos */

      /* Mensajes para saber que esta ocurriendo */
    }).on('change', (change:any) => {
      console.log('Change detected:');
    }).on('paused', (info:any) => {
      console.log('Replication paused:');
    }).on('active', (info:any) => {
      console.log('Replication resumed:');
    }).on('error', (err:any) => {
      console.error('Sync error:');
    });
  }
}
