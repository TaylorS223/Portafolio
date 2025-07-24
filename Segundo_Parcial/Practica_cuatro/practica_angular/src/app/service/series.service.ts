import type { ISeries } from '../models/series.interface';
import { BehaviorSubject, Observable } from 'rxjs'; // Importar Observable
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private series: ISeries[] = [
    { id: 1, title: 'Breaking Bad', description: 'A high school chemistry teacher turned methamphetamine manufacturer.', genre: 'Crime', seasons: 5, episodes: 62 },
    { id: 2, title: 'Game of Thrones', description: 'Noble families vie for control of the Iron Throne in the Seven Kingdoms.', genre: 'Fantasy', seasons: 8, episodes: 73 },
    { id: 3, title: 'Stranger Things', description: 'A group of kids uncover supernatural mysteries in their small town.', genre: 'Sci-Fi', seasons: 3, episodes: 25 }
  ];

  private seriesSubject = new BehaviorSubject<ISeries[]>(this.series);

  constructor() {}

  // Este método debería devolver un Observable para que los componentes puedan suscribirse a los cambios
  getSeries(): Observable<ISeries[]> {
    return this.seriesSubject.asObservable();
  }

  deleteSeries(id: number): void {
    this.series = this.series.filter(series => series.id !== id);
    this.seriesSubject.next([...this.series]); 
  }

  updateSeries(updatedSeries: ISeries): void {
    const index = this.series.findIndex(series => series.id === updatedSeries.id);
    if (index !== -1) {
      this.series[index] = updatedSeries;
      this.seriesSubject.next([...this.series]);
    }
  }

  addSeries(newSeries: ISeries): void {
    this.series.push(newSeries);
    this.seriesSubject.next([...this.series]); 
  }
}