import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeriesService } from '../../service/series.service'; 
import { ISeries } from '../../models/series.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-series',
  standalone: true, 
  templateUrl: './series.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit, OnDestroy {
  
  series: ISeries[] = [];
  serieSeleccionada: ISeries | null = null;
  nuevaSerie: Omit<ISeries, 'id'> & Partial<ISeries> = {
    title: '',
    description: '',
    genre: '',
    seasons: 0, 
    episodes: 0, 
    urlImagen: ''
  };
  modoEdicion = false;
  cargando = false;
  private subscription: Subscription = new Subscription();
  constructor(private seriesService: SeriesService) { }
  ngOnInit(): void {
    this.cargarSeries();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  cargarSeries(): void {
    this.cargando = true;
    
    this.subscription.add(
      this.seriesService.getSeries().subscribe({ 
        next: (series) => {
          this.series = series;
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al cargar series:', error);
          this.cargando = false;
          alert('Error al cargar las series. Por favor, intente de nuevo.');
        }
      })
    );
  }
  agregarSerie(): void {
    if (!this.nuevaSerie.title || !this.nuevaSerie.description) {
      alert('Por favor, complete al menos el título y la descripción de la serie.');
      return;
    }

    try {
      const serieParaAgregar: ISeries = {
        id: 0, 
        title: this.nuevaSerie.title,
        description: this.nuevaSerie.description,
        genre: this.nuevaSerie.genre || '', 
        seasons: this.nuevaSerie.seasons || 0,
        episodes: this.nuevaSerie.episodes || 0
      };

      this.seriesService.addSeries(serieParaAgregar);
      console.log('Serie agregada:', serieParaAgregar);
      this.limpiarFormulario();
      
      alert('Serie agregada exitosamente');
    } catch (error) {
      console.error('Error al agregar serie:', error);
      alert('Error al agregar la serie');
    }
  }

  editarSerie(serie: ISeries): void {
    this.serieSeleccionada = { ...serie }; 
    this.nuevaSerie = {
      title: serie.title,
      description: serie.description,
      genre: serie.genre,
      seasons: serie.seasons,
      episodes: serie.episodes
    };
    this.modoEdicion = true;
  }

  actualizarSerie(): void {
    if (!this.serieSeleccionada) {
      alert('No hay serie seleccionada para editar');
      return;
    }

    if (!this.nuevaSerie.title || !this.nuevaSerie.description) {
      alert('Por favor, complete al menos el título y la descripción de la serie.');
      return;
    }

    try {
      const serieActualizada: ISeries = {
        id: this.serieSeleccionada.id, 
        title: this.nuevaSerie.title,
        description: this.nuevaSerie.description,
        genre: this.nuevaSerie.genre || '',
        seasons: this.nuevaSerie.seasons || 0,
        episodes: this.nuevaSerie.episodes || 0
      };

      this.seriesService.updateSeries(serieActualizada); 
      
      console.log('Serie actualizada exitosamente');
      this.limpiarFormulario();
      alert('Serie actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar serie:', error);
      alert('Error al actualizar la serie');
    }
  }

  eliminarSerie(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta serie?')) {
      try {
        this.seriesService.deleteSeries(id);
        console.log('Serie eliminada exitosamente');
        alert('Serie eliminada exitosamente');
      } catch (error) {
        console.error('Error al eliminar serie:', error);
        alert('Error al eliminar la serie');
      }
    }
  }

  cancelarEdicion(): void {
    this.limpiarFormulario();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'https://via.placeholder.com/300x450/cccccc/666666?text=Sin+Imagen';
    }
  }
  private limpiarFormulario(): void {
    this.nuevaSerie = {
      title: '',
      description: '',
      genre: '',
      seasons: 0,
      episodes: 0
    };
    this.serieSeleccionada = null;
    this.modoEdicion = false;
  }
}