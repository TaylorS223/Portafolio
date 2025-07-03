// Código creado por Taylor Steven Alava Gresely
import { useEffect, useState } from 'react';
import { ProductoService } from '../servicios/ProductoService';
import { subirImagenProducto } from '../servicios/subidaImagenService';
import type { Producto, ProductoRequest } from '../entidades/Producto';
import ProductoForm from '../componentes/ProductoForm';
import ProductoList from '../componentes/ProductoList';

interface Imagen {
  url: string;
}

interface ProductoConImagen extends Producto {
  imagenes?: Imagen[];
}

interface Props {
  clienteId: string;
}

function ProductosPage({ clienteId }: Props) {
  const [productos, setProductos] = useState<ProductoConImagen[]>([]);
  const [productoEditando, setProductoEditando] = useState<Producto | undefined>();

  useEffect(() => {
    cargarProductos();
  }, []);

  async function cargarProductos() {
    try {
      const data = await ProductoService.getAllProductos();
      const productosCliente = data.filter(p => p.usuario_id === clienteId);

      const productosConImagenes = await Promise.all(
        productosCliente.map(async (producto) => {
          const imagenes = await ProductoService.getImagenesProducto(producto.producto_id);
          return { ...producto, imagenes };
        })
      );

      setProductos(productosConImagenes);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  }

  async function handleCreateOrUpdate(data: Omit<ProductoRequest, 'usuario_id'>, file?: File) {
    if (productoEditando) {
      await ProductoService.updateProducto(productoEditando.producto_id, { ...data, usuario_id: clienteId });
      setProductoEditando(undefined);
    } else {
      const productoCreado = await ProductoService.createProducto({ ...data, usuario_id: clienteId });
      if (file) {
        await subirImagenProducto(file, productoCreado.producto_id);
      }
    }
    await cargarProductos();
  }

  async function handleDelete(id: string) {
    await ProductoService.deleteProducto(id);
    await cargarProductos();
  }

  function handleEdit(producto: Producto) {
    setProductoEditando(producto);
  }

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <ProductoForm
        initialData={productoEditando}
        onSubmit={handleCreateOrUpdate}
      />
      <ProductoList
        productos={productos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default ProductosPage;
