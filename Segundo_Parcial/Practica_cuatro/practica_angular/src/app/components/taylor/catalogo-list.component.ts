import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoService } from '../../service/catalogo.service';
import { ICatalogo } from '../../models/catalogo.interface';

@Component({
  selector: 'app-catalogo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo-list.component.html'
  , styleUrls: ['./catalogo.component.css']
})
export class CatalogoListComponent implements OnInit {
  catalogos: ICatalogo[] = [];

  constructor(private catalogoService: CatalogoService) {}

  ngOnInit(): void {
    this.catalogoService.getCatalogos().subscribe(data => this.catalogos = data);
  }

  eliminar(id: number) {
    this.catalogoService.deleteCatalogo(id);
    this.catalogos = this.catalogos.filter(c => c.id !== id); // actualización local
  }
}
