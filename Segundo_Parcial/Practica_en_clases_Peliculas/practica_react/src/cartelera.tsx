import type { IPelicula } from "./pelicula";
import Pelicula from "./pelicula";

interface Icartelera {
    listaPeliculas: IPelicula[];}

const Cartelera = ( {listaPeliculas} : Icartelera) => {
    return (
        <div className="cartelera"> 
            <h1> Cartelera </h1>
            {listaPeliculas.map((pelicula) => (
                <Pelicula key={pelicula.id} nombre={pelicula.nombre} url={pelicula.url} />
            ))}
        </div>
    );
}

export default Cartelera;