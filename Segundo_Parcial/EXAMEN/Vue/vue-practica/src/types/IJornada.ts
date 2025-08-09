export type Horario = "Mañana" | "Tarde" ;

export interface IJornada {
    id: string;
    horario: Horario;
}
export type Jornada_id = Omit<IJornada, 'id'>;