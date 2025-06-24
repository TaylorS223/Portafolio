interface IPelicula {
    id: string;
    nombre: string;
    descripcion: string;
    url: string;
}

interface IPeliculaProps {
    nombre: string;
    url: string;
}

// desestructuracion del componente
const Pelicula = ( {nombre, url} : IPeliculaProps) => {
    return (
        //solo debe haber un elemento padre
        //se puede usar un fragment <> </> para no agregar un div extra

        <div className="pelicula">
            <h1 style={{backgroundColor: 'lightblue'}}> {nombre} </h1>
            <img style={{width: '450'}}  src={url} alt={nombre} />
        </div>

    );
}

export default Pelicula;
export type { IPelicula};