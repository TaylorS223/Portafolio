// === Componente creado por Taylor Alava ===
// === Encargado de la entidad Icatalogo ===


interface Icatalogo{
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    url: string;
}

interface IcatalogoProps {
    nombre: string;
    descripcion: string;
    url: string;
}

const catalogo = ( {nombre, descripcion, url} : IcatalogoProps) => {
    return (
        <div className="catalogo">
            <h1> {nombre} </h1>
            <img src={url} alt={nombre} />
            <p>{descripcion}</p>
        </div>
    );
}

export default catalogo;
export type { Icatalogo };