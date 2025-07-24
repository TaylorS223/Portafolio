import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICatalogo } from '../models/catalogo.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private catalogos: ICatalogo[] = [
    { id: 1, nombre: 'Top Crimen', descripcion: 'Series más populares de crimen', seriesIds: [1] },
    { id: 2, nombre: 'Fantasia Épica', descripcion: 'Series de fantasía legendarias', seriesIds: [2] },
    { id: 3, nombre: 'Ciencia Ficción', descripcion: 'Series con elementos sobrenaturales', seriesIds: [3] }
  ];

  private catalogoSubject = new BehaviorSubject<ICatalogo[]>(this.catalogos);

  constructor() {}

  getCatalogos(): Observable<ICatalogo[]> {
    return this.catalogoSubject.asObservable();
  }

  addCatalogo(nuevo: ICatalogo): void {
    this.catalogos.push(nuevo);
    this.catalogoSubject.next([...this.catalogos]);
  }

  updateCatalogo(actualizado: ICatalogo): void {
    const index = this.catalogos.findIndex(c => c.id === actualizado.id);
    if (index !== -1) {
      this.catalogos[index] = actualizado;
      this.catalogoSubject.next([...this.catalogos]);
    }
  }

  deleteCatalogo(id: number): void {
    this.catalogos = this.catalogos.filter(c => c.id !== id);
    this.catalogoSubject.next([...this.catalogos]);
  }
}
