// src/componentes/ProductoForm.tsx
// Código creado por Taylor Steven Alava Gresely
import { useState, useEffect } from 'react';
import type { Producto, ProductoRequest } from '../entidades/Producto';

interface Props {
  initialData?: Producto;
  onSubmit: (data: Omit<ProductoRequest, 'usuario_id'>, file?: File) => void;
}

function ProductoForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<Omit<ProductoRequest, 'usuario_id'>>({
    titulo: '',
    descripcion: '',
    precio: 0
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      const { titulo, descripcion, precio } = initialData;
      setForm({ titulo, descripcion, precio });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'precio' ? (value === '' ? 0 : parseFloat(value)) : value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form, file ?? undefined);
    setForm({
      titulo: '',
      descripcion: '',
      precio: 0
    });
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <input
        name="titulo"
        value={form.titulo}
        onChange={handleChange}
        placeholder="Título"
        required
      />
      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        required
      />
      <input
        name="precio"
        type="number"
        value={form.precio}
        onChange={handleChange}
        placeholder="Precio"
        required
        min={1}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required={!initialData}
      />
      <button type="submit">
        {initialData ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}

export default ProductoForm;
