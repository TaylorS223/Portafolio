// src/componentes/ProductoList.tsx
// Código creado por taylor steven alava gresely
import type { Producto } from '../entidades/Producto';

interface Imagen {
  url: string;
}

interface ProductoConImagen extends Producto {
  imagenes?: Imagen[];
}

interface Props {
  productos: ProductoConImagen[];
  onEdit: (producto: Producto) => void;
  onDelete: (id: string) => void;
}

function ProductoList({ productos, onEdit, onDelete }: Props) {
  return (
    <ul>
      {productos.map((p) => (
        <li key={p.producto_id}>
          <strong>{p.titulo}</strong> - ${p.precio}
          <p>{p.descripcion}</p>
          {p.imagenes && p.imagenes.length > 0 && (
            <img
              src={p.imagenes[0].url}
              alt={`Imagen de ${p.titulo}`}
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
          )}
          <button onClick={() => onEdit(p)}>Editar</button>
          <button onClick={() => onDelete(p.producto_id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}

export default ProductoList;
