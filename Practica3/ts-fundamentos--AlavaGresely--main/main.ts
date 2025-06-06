// main.ts

// Variables de tipo basico
const nombre: string = 'David Alejandro'; // tipo string
const apellido: string = 'Vilañez Palma'; // tipo string
let stock_dispo: number = 100; // tipo number
const nombre_producto: string = 'Camiseta de futbol'; // tipo string
let precio: number = 1000; // tipo number
let descuento: boolean = true; // tipo boolean

// Interface
interface Cliente {
  nombre: string;
  apellido: string;
}

interface Producto {
  nombre_producto: string;
  precio: number;
  stock_dispo: number;
  descuento: boolean;
}

interface Pedido {
  cliente: Cliente;
  producto: Producto;
  cantidad: number;
}

// Clases
class ClienteTienda implements Cliente {
  constructor(public nombre: string, public apellido: string) {}

  obtenerNombreCompleto(): string {
    return `${this.nombre} ${this.apellido}`;
  }
}

class ProductoTienda implements Producto {
  constructor(
    public nombre_producto: string,
    public precio: number,
    public stock_dispo: number,
    public descuento: boolean
  ) {}

  aplicarDescuento(): number {
    return this.descuento ? this.precio * 0.9 : this.precio;
  }

  verificarStock(cantidad: number): boolean {
    return this.stock_dispo >= cantidad;
  }
}

class PedidoTienda implements Pedido {
  constructor(
    public cliente: ClienteTienda,
    public producto: ProductoTienda,
    public cantidad: number
  ) {
    if (!producto.verificarStock(cantidad)) {
      throw new Error('Stock insuficiente');
    }
    this.producto.stock_dispo -= cantidad;
  }

  calcularTotal(): number {
    return this.producto.aplicarDescuento() * this.cantidad;
  }
}

// Arreglos tipados
const clientes: ClienteTienda[] = [
  new ClienteTienda("Ana", "Gómez"),
  new ClienteTienda("Luis", "Martínez"),
  new ClienteTienda("María", "Fernández"),
  new ClienteTienda("Carlos", "Pérez"),
  new ClienteTienda("Laura", "Sánchez"),
  new ClienteTienda("Javier", "López"),
  new ClienteTienda("Juan", "Manuel"),
  new ClienteTienda("Sofía", "Ramírez"),
  new ClienteTienda("Isabel", "Torres"),
  new ClienteTienda("Cristal", "Avila")
];

const productos: ProductoTienda[] = [
  new ProductoTienda("Camiseta de futbol", 1000, 50, true),
  new ProductoTienda("Pantalón de mezclilla", 500, 20, false),
  new ProductoTienda("Zapatos deportivos", 1500, 30, true),
  new ProductoTienda("Chaqueta de cuero", 2000, 15, false),
  new ProductoTienda("Gorra de béisbol", 300, 25, true),
  new ProductoTienda("Bufanda de lana", 200, 40, false),
  new ProductoTienda("Guantes de cuero", 400, 10, true),
  new ProductoTienda("Cinturón de cuero", 600, 5, false),
  new ProductoTienda("Calcetines deportivos", 100, 100, true),
  new ProductoTienda("Sudadera con capucha", 800, 12, false)
];

const pedidos: PedidoTienda[] = [
  new PedidoTienda(clientes[0], productos[0], 2), 
  new PedidoTienda(clientes[1], productos[1], 1), 
  new PedidoTienda(clientes[2], productos[2], 5),
  new PedidoTienda(clientes[3], productos[3], 1),
  new PedidoTienda(clientes[4], productos[4], 3),
  new PedidoTienda(clientes[5], productos[5], 2),
  new PedidoTienda(clientes[6], productos[6], 1),
  new PedidoTienda(clientes[7], productos[7], 4),
  new PedidoTienda(clientes[8], productos[8], 10),
  new PedidoTienda(clientes[9], productos[9], 2)
];

// Funciones genéricas
function mostrarElementos_arreglo<T>(arreglo: T[]): void {
  arreglo.forEach((elemento, index) => {
    console.log(`Elemento ${index}:`, elemento);
  });
}

function filtrarElementos<T>(arreglo: T[], criterio: (elemento: T) => boolean): T[] {
  return arreglo.filter(criterio);
}

function insertarElemento<T>(arreglo: T[], elemento: T): void {
  arreglo.push(elemento);
}

function eliminarElemento<T>(arreglo: T[], indice: number): void {
  if (indice >= 0 && indice < arreglo.length) {
    arreglo.splice(indice, 1);
  } else {
    console.warn('Índice fuera de rango');
  }
}

// Mostrar elementos
mostrarElementos_arreglo(clientes);
mostrarElementos_arreglo(productos);
mostrarElementos_arreglo(pedidos);

//Uso de tipos especiales

interface ClienteEspecial {
  readonly id: number; // no se puede cambiar
  nombre: string;
  correo?: string; // opcional
}

interface ProductoEspecial {
  readonly codigo: string | number; // union type
  nombre: string;
  descuento?: boolean; // opcional
}

interface PedidoEspecial {
  readonly numero: number;
  cliente: ClienteEspecial;
  productos: ProductoEspecial[];
  calcularTotal: () => number;
}

// Métodos funcionales
const nombresClientes = clientes.map(c => c.obtenerNombreCompleto());
console.log("Nombres de clientes:", nombresClientes);

const nombresProductosMayus = productos.map(p => p.nombre_producto.toUpperCase());
console.log("Nombres productos mayúsculas:", nombresProductosMayus);

const correosClientes = clientes.map(c => `${c.nombre.toLowerCase()}.${c.apellido.toLowerCase()}@correo.com`);
console.log("Correos simulados:", correosClientes);

const productosDisponibles = productos.filter(p => p.stock_dispo > 0);
console.log("Productos disponibles:", productosDisponibles);

const productosConDescuento = productos.filter(p => p.descuento);
console.log("Productos que contentan descuento:", productosConDescuento);

const pedidosGrandes = pedidos.filter(p => p.cantidad > 3);
console.log("Pedidos con más de 3 unidades:", pedidosGrandes);

const sumaPrecios = productos.reduce((total, p) => total + p.precio, 0);
console.log("Suma total de precios:", sumaPrecios);

console.log("Cantidad total de pedidos:", pedidos.length);

const sumaCantidades = pedidos.reduce((total, p) => total + p.cantidad, 0);
console.log("Promedio de productos por pedido:", sumaCantidades / pedidos.length);

// Relaciones simuladas
interface ClienteRelacionado {
  id: number;
  nombre: string;
}

interface ProductoRelacionado {
  id: number;
  nombre: string;
  precio: number;
}

interface PedidoRelacionado {
  id: number;
  cliente: ClienteRelacionado;
  productos: ProductoRelacionado[];
}

const clienteR1: ClienteRelacionado = { id: 1, nombre: 'Ana' };
const clienteR2: ClienteRelacionado = { id: 2, nombre: 'Luis' };

const productoR1: ProductoRelacionado = { id: 101, nombre: 'Camiseta', precio: 20 };
const productoR2: ProductoRelacionado = { id: 102, nombre: 'Pantalón', precio: 35 };
const productoR3: ProductoRelacionado = { id: 103, nombre: 'Zapatos', precio: 50 };

const pedidoR1: PedidoRelacionado = {
  id: 1001,
  cliente: clienteR1,
  productos: [productoR1, productoR2],
}; 

const pedidoR2: PedidoRelacionado = {
  id: 1002,
  cliente: clienteR2,
  productos: [productoR3],
};

const baseDeDatosSimulada = {
  clientes: [clienteR1, clienteR2],
  productos: [productoR1, productoR2, productoR3],
  pedidos: [pedidoR1, pedidoR2],
};

console.log("Base de datos simulada:", baseDeDatosSimulada);

// Funciones personalizadas
function resumenPedido(pedido: PedidoTienda): string {
  return `Cliente: ${pedido.cliente.obtenerNombreCompleto()}\nProducto: ${pedido.producto.nombre_producto}\nCantidad: ${pedido.cantidad}`;
}

function contarProductosComprados(cliente: ClienteTienda, pedidos: PedidoTienda[]): number {
  return pedidos
    .filter(p => p.cliente === cliente)
    .reduce((total, p) => total + p.cantidad, 0);
}

console.log(resumenPedido(pedidos[0]));
console.log("Productos comprados por Ana Gómez:", contarProductosComprados(clientes[0], pedidos));

// Mostrar pedidos
pedidos.forEach((pedido, i) => {
  console.log(`Pedido ${i + 1}:`);
  console.log(`  Cliente: ${pedido.cliente.obtenerNombreCompleto()}`);
  console.log(`  Producto: ${pedido.producto.nombre_producto}`);
  console.log(`  Cantidad: ${pedido.cantidad}`);
  console.log(`  Total: $${pedido.calcularTotal()}`);
  console.log('-------------------------');
});
