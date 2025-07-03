
// src/componentes/FormularioSubida.tsx
import { useState } from 'react';
import { ProductoService } from '../servicios/ProductoService';
import { subirImagenProducto } from '../servicios/subidaImagenService';
import { supabase } from '../SupabaseConfig';

export default function FormularioSubida() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState<string>('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo || !descripcion || precio <= 0) {
      setMensaje('Por favor completa todos los campos correctamente');
      return;
    }

    if (!file) {
      setMensaje('Por favor selecciona una imagen');
      return;
    }

    setCargando(true);
    setMensaje('');

    try {
      // Obtener usuario actual de Supabase
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        setMensaje('No hay sesión activa, por favor inicia sesión');
        setCargando(false);
        return;
      }

      const usuario_id = session.user.id;

      // Crear producto con usuario_id
      const producto = await ProductoService.createProducto({
        titulo,
        descripcion,
        precio,
        usuario_id,
      });

      // Subir imagen vinculada al producto
      const url = await subirImagenProducto(file, producto.producto_id);

      if (url) {
        setMensaje('Producto e imagen subidos correctamente');
        setTitulo('');
        setDescripcion('');
        setPrecio(0);
        setFile(null);
      } else {
        setMensaje('Producto creado, pero fallo la subida de imagen');
      }
    } catch (error) {
      setMensaje('Error: ' + (error as Error).message);
    }

    setCargando(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={e => setPrecio(Number(e.target.value))}
        required
        min={1}
      />
      <input
        type="file"
        accept="image/*"
        onChange={e => e.target.files && setFile(e.target.files[0])}
        required
      />
      <button type="submit" disabled={cargando}>
        {cargando ? 'Subiendo...' : 'Crear Producto'}
      </button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}
