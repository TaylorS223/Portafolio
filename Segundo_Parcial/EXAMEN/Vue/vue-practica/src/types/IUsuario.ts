export interface IUsuario{
    id: string;
    nombre: string;
    correo: string;

}

export type Usuario_id = Omit <IUsuario, 'id'>;