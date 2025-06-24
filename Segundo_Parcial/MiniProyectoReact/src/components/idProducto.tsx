// === Componente creado por David Vilañez ===
// === Encargado de la entidad IdProducto ===

import type { Icatalogo } from "./catalogo";
import Catalogo from "./catalogo";
import { useEffect } from 'react';

interface Props {
  ListaProducto: Icatalogo[];
}

const IDProducto = ({ ListaProducto }: Props) => {
  useEffect(() => {
    console.log('Productos cargados:', ListaProducto);
  }, [ListaProducto]);

  return (
    <div className="Producto">
      <h1>Productos</h1>
      {ListaProducto.map((catalogo) => (
        <Catalogo
          key={catalogo.id}
          nombre={catalogo.nombre}
          url={catalogo.url}
          descripcion={catalogo.descripcion}
        />
      ))}
    </div>
  );
};

export default IDProducto;
