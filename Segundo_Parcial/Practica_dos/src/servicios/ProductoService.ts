// Código creado por Taylor Steven Alava Gresely
import { supabase } from '../SupabaseConfig';
import type { Producto, ProductoRequest } from '../entidades/Producto';

const supabaseUrl = 'https://lsokmokhxmslvlrlwfem.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzb2ttb2toeG1zbHZscmx3ZmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0ODkzNzMsImV4cCI6MjA2NzA2NTM3M30.Vv-5aW3TmFqOYFRx-88qQ3WW8orEngA-au1tlf19iG0';
const API_BASE_URL = `${supabaseUrl}/rest/v1/producto`;
const API_IMAGEN_URL = `${supabaseUrl}/rest/v1/imagenproducto`;

async function getHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error("No hay sesión activa, por favor inicia sesión.");
  }

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session.access_token}`,
    'apikey': supabaseKey
  };
}

export const ProductoService = {
  async getAllProductos(): Promise<Producto[]> {
    const headers = await getHeaders();
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      console.error(await response.text());
      throw new Error('Error al obtener los productos');
    }

    return await response.json();
  },

  async createProducto(producto: ProductoRequest): Promise<Producto> {
    const headers = await getHeaders();
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        ...headers,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(producto)
    });

    if (!response.ok) {
      console.error(await response.text());
      throw new Error('Error al crear el producto');
    }

    const createdProductos = await response.json();
    return createdProductos[0];
  },

  async updateProducto(id: string, producto: ProductoRequest): Promise<Producto> {
    const headers = await getHeaders();
    const response = await fetch(`${API_BASE_URL}?producto_id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        ...headers,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(producto)
    });

    if (!response.ok) {
      console.error(await response.text());
      throw new Error('Error al actualizar el producto');
    }

    const updatedProductos = await response.json();
    return updatedProductos[0];
  },

  async deleteProducto(id: string): Promise<void> {
    const headers = await getHeaders();
    const response = await fetch(`${API_BASE_URL}?producto_id=eq.${id}`, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) {
      console.error(await response.text());
      throw new Error('Error al eliminar el producto');
    }
  },

  async getImagenesProducto(productoId: string): Promise<{ url: string }[]> {
    const headers = await getHeaders();
    const response = await fetch(`${API_IMAGEN_URL}?obtener_id=eq.${productoId}`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      console.error(await response.text());
      throw new Error('Error al obtener imágenes del producto');
    }

    return await response.json();
  }
};
