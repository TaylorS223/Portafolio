import { ProductService } from '../services/productService'

async function mostrarProductos() {
  const productos = await ProductService.getAll()
  const contenedor = document.getElementById('listaProductos')

  if (contenedor) {
    contenedor.innerHTML = ''
    productos.forEach(p => {
      const div = document.createElement('div')
      div.innerHTML = `
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p>Precio: $${p.precio}</p>
        <img src="${p.imagen_url}" alt="${p.nombre}" width="100" />
        <hr />
      `
      contenedor.appendChild(div)
    })
  }
}

async function buscarPorNombre(nombre: string) {
  const resultados = await ProductService.searchByName(nombre)
  console.log('Resultados de búsqueda:', resultados)
}


mostrarProductos()
