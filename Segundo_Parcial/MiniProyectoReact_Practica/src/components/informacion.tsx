// === Componente creado por Jordan Lema ===
// === Encargado de la entidad Iinformacion ===


interface Iinformacion {
    nombre: string;
    correro: string;
    telefono: string;
}

interface IinformacionProps {
    nombre: string;
    correro: string;
    telefono: string;
}

const Informacion = ({ nombre, correro, telefono }: IinformacionProps) => {
    return (
        <div className="informacion">
            <h1>Información del Usuario</h1>
            <p><strong>Nombre:</strong> {nombre}</p>
            <p><strong>Correo:</strong> {correro}</p>
            <p><strong>Teléfono:</strong> {telefono}</p>
        </div>
    );
}
export default Informacion;
export type { Iinformacion, IinformacionProps };