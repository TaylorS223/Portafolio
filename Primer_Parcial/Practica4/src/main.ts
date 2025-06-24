import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1 class="text-xl font-bold mb-4">Registro de Producto</h1>
  <div id="formulario"></div>
  <div id="errores" class="text-red-500 mt-2"></div>
  <div id="lista" class="mt-4"></div>
  <div id="usuarios" class="mt-6"></div>
  <div id="intercambios" class="mt-6"></div>
`;

interface Producto {
  id: number
  nombre: string
  descripcion: string
  disponible: boolean
}

interface Usuario {
  id: number
  nombre: string
  correo: string
}

interface Intercambio {
  id: number
  productoId: number
  usuarioId: number
}

const productos: Producto[] = [
  { id: 1, nombre: 'Libro', descripcion: 'Libro de JS', disponible: true },
  { id: 2, nombre: 'Teclado', descripcion: 'Teclado mecánico', disponible: true }
]

const usuarios: Usuario[] = [
  { id: 1, nombre: 'Juan', correo: 'juan@mail.com' },
  { id: 2, nombre: 'Ana', correo: 'ana@mail.com' }
]

const intercambios: Intercambio[] = []

const formDiv = document.getElementById('formulario')!
const listaDiv = document.getElementById('lista')!

const form = document.createElement('form')
form.innerHTML = `
  <h2 class="text-lg font-semibold">Registrar Producto</h2>
  <input type="text" name="nombre" placeholder="Nombre" required class="block mt-2 p-2 border" />
  <div class="text-red-500 text-sm" id="err-nombre"></div>
  <input type="text" name="descripcion" placeholder="Descripción" required class="block mt-2 p-2 border" />
  <div class="text-red-500 text-sm" id="err-desc"></div>
  <button type="submit" class="mt-4 bg-blue-500 text-white px-4 py-2">Agregar</button>
`
formDiv.appendChild(form)

form.addEventListener('submit', e => {
  e.preventDefault()
  const nombre = (form.elements.namedItem('nombre') as HTMLInputElement).value.trim()
  const descripcion = (form.elements.namedItem('descripcion') as HTMLInputElement).value.trim()
  let valido = true

  const errNombre = document.getElementById('err-nombre')!
  const errDesc = document.getElementById('err-desc')!
  errNombre.textContent = ''
  errDesc.textContent = ''

  if (nombre.length < 3) {
    errNombre.textContent = 'El nombre debe tener al menos 3 caracteres.'
    valido = false
  }

  if (descripcion.length < 5) {
    errDesc.textContent = 'La descripción debe tener al menos 5 caracteres.'
    valido = false
  }

  if (!valido) return

  const nuevo: Producto = {
    id: productos.length + 1,
    nombre,
    descripcion,
    disponible: true
  }
  productos.push(nuevo)
  renderLista()
  form.reset()
})

function renderLista() {
  listaDiv.innerHTML = '<h2 class="text-lg font-semibold mb-2">Lista de Productos</h2>'
  productos.forEach(prod => {
    const card = document.createElement('div')
    card.className = 'card bg-white shadow'
    card.innerHTML = `
      <strong>${prod.nombre}</strong><br />
      ${prod.descripcion}<br />
      <button data-id="${prod.id}" class="edit bg-yellow-400 px-2 py-1 mt-1">Editar</button>
      <button data-id="${prod.id}" class="delete bg-red-400 px-2 py-1 mt-1 ml-2">Eliminar</button>
      <button data-id="${prod.id}" class="intercambiar bg-green-400 px-2 py-1 mt-1 ml-2">Intercambiar</button>
    `
    listaDiv.appendChild(card)
  })

  document.querySelectorAll('.edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt((btn as HTMLElement).getAttribute('data-id')!)
      const prod = productos.find(p => p.id === id)
      if (prod) {
        const nuevoNombre = prompt('Nuevo nombre', prod.nombre)
        const nuevaDesc = prompt('Nueva descripción', prod.descripcion)
        if (nuevoNombre && nuevaDesc) {
          prod.nombre = nuevoNombre
          prod.descripcion = nuevaDesc
          renderLista()
        }
      }
    })
  })

  document.querySelectorAll('.delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt((btn as HTMLElement).getAttribute('data-id')!)
      const i = productos.findIndex(p => p.id === id)
      if (i !== -1) {
        productos.splice(i, 1)
        renderLista()
      }
    })
  })

  document.querySelectorAll('.intercambiar').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt((btn as HTMLElement).getAttribute('data-id')!)
      const producto = productos.find(p => p.id === id)
      if (!producto) return
      const usuario = prompt('ID del usuario que intercambia (1 o 2)')
      const usuarioId = parseInt(usuario || '')
      const existe = usuarios.some(u => u.id === usuarioId)
      if (!existe) return alert('Usuario inválido')

      const nuevo: Intercambio = {
        id: intercambios.length + 1,
        productoId: producto.id,
        usuarioId
      }
      intercambios.push(nuevo)
      producto.disponible = false
      renderLista()
      renderIntercambios()
    })
  })
}

function renderUsuarios() {
  const div = document.getElementById('usuarios')!
  div.innerHTML = '<h2 class="text-lg font-semibold mb-2">Usuarios</h2>'
  usuarios.forEach(u => {
    const card = document.createElement('div')
    card.className = 'p-2 border rounded-md mb-1 bg-gray-50'
    card.innerHTML = `
      <strong>${u.nombre}</strong><br />
      <small>${u.correo}</small>
    `
    div.appendChild(card)
  })
}

function renderIntercambios() {
  const div = document.getElementById('intercambios')!
  div.innerHTML = '<h2 class="text-lg font-semibold mb-2">Intercambios Realizados</h2>'
  intercambios.forEach(i => {
    const prod = productos.find(p => p.id === i.productoId)
    const user = usuarios.find(u => u.id === i.usuarioId)
    const card = document.createElement('div')
    card.className = 'p-2 border rounded-md mb-1 bg-green-50'
    card.innerHTML = `
      <strong>${user?.nombre}</strong> intercambió <em>${prod?.nombre}</em>
    `
    div.appendChild(card)
  })
}

renderLista()
renderUsuarios()
renderIntercambios()
