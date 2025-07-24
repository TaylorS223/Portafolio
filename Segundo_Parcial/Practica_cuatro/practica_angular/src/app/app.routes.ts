import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/david/usuario.component';
import { SeriesComponent } from './components/jordan/series.component';
import { CatalogoListComponent } from './components/taylor/catalogo-list.component';

export const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'series', component: SeriesComponent },
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoListComponent }
];
