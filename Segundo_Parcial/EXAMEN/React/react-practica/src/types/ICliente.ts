
//Interfaz ICliente tipo Login
export interface ICliente{
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
}

export type Cliente_id = Omit <ICliente, 'id'>;