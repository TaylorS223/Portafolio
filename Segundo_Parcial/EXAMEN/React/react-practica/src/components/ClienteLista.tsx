import type { ICliente} from "../types/ICliente";

/* Definir las Props */

export interface Props{
    clientes: ICliente[];
    onEdit: ( cliente: ICliente) => void;
    onDelete: ( id: string) => void;
}


export function ClienteLista( {clientes, onEdit, onDelete} : Props){
    return (
        <ul>
            {clientes.map(cliente =>(
                <li key={cliente.id}>
                    {cliente.nombre} - {cliente.apellido} - {cliente.correo} - {cliente.telefono}
                    <button onClick={() => onEdit(cliente) }>Editar</button>
                    <button onClick={() => onDelete(cliente.id)}> Eliminar</button>
                </li>
            ))}
        </ul>
    
    );
}

