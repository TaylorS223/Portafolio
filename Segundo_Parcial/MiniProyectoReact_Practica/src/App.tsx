import './App.css'
import { useEffect, useState } from 'react';
import type { Icatalogo } from './components/catalogo'
import IDProducto from './components/idProducto';
import Informacion from './components/informacion';
import type { Iinformacion } from './components/informacion';

const informacion: Iinformacion[] = [{
  nombre: 'Juan Perez',
  correro: 'jordanlema@gmail.com',
  telefono: '123-456-7890'
}]

function App() {
  const [catalogo, setCatalogo] = useState<Icatalogo[]>([]);

  useEffect(() => {
    const data: Icatalogo[] = [
      {
        id: 1,
        nombre: 'Producto 1',
        precio: 100,
        descripcion: 'Descripción del producto 1',
        url: 'https://example.com/producto1.jpg'
      },
      {
        id: 2,
        nombre: 'Producto 2',
        precio: 200,
        descripcion: 'Descripción del producto 2',
        url: 'https://example.com/producto2.jpg'
      },
      {
        id: 3,
        nombre: 'Producto 3',
        precio: 300,
        descripcion: 'Descripción del producto 3',
        url: 'https://example.com/producto3.jpg'
      },
      {
        id: 4,
        nombre: 'Producto 4',
        precio: 300,
        descripcion: 'Descripción del producto 4',
        url: 'https://example.com/producto4.jpg'
      },
      {
        id: 5,
        nombre: 'Producto 5',
        precio: 300,
        descripcion: 'Descripción del producto 5',
        url: 'https://example.com/producto5.jpg'
      },
      {
        id: 6,
        nombre: 'Producto 6',
        precio: 300,
        descripcion: 'Descripción del producto 6',
        url: 'https://example.com/producto6.jpg'
      }
    ];

    setTimeout(() => setCatalogo(data), 1000); // Simulación de carga asincrónica
  }, []);

  return (
    <>
      <IDProducto ListaProducto={catalogo} />
      <Informacion 
        nombre={informacion[0].nombre} 
        correro={informacion[0].correro} 
        telefono={informacion[0].telefono}
      />
    </>
  );
}

export default App;
