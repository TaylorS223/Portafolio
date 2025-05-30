import './style.css'
document.querySelector<HTMLDivElement>('#app')!.innerHTML = ``

//venta de ropa//

const nombre: string = 'David Alejandro'
const apellido: string = 'Vilañez Palma'
let stock_dispo: number = 100
const nombre_producto: string = 'Camiseta de futbol'
let precio: number = 1000
let descuento: boolean = true

// Interfaces //
interface Cliente {
  nombre: string;
  apellido: string;}

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

//Clases//

class ClienteTienda implements Cliente {
  nombre: string;
  apellido: string;

  constructor(nombre: string, apellido: string) {
    this.nombre = nombre;
    this.apellido = apellido;
  }

  obtenerNombreCompleto(): string {
    return `${this.nombre} ${this.apellido}`;
  }
}

class ProductoTienda implements Producto {
  nombre_producto: string;
  precio: number;
  stock_dispo: number;
  descuento: boolean;

  constructor(nombre_producto: string, precio: number, stock_dispo: number, descuento: boolean) {
    this.nombre_producto = nombre_producto;
    this.precio = precio;
    this.stock_dispo = stock_dispo;
    this.descuento = descuento;
  }

  aplicarDescuento(): number {
    if (this.descuento) {
      return this.precio * 0.9; 
    }
    return this.precio;
  }

  verificarStock(cantidad: number): boolean {
    return this.stock_dispo >= cantidad;
  }
}

class PedidoTienda implements Pedido {
  cliente: Cliente;
  producto: ProductoTienda;
  cantidad: number;

  constructor(cliente: Cliente, producto: ProductoTienda, cantidad: number) {
    if (!producto.verificarStock(cantidad)) {
      throw new Error('Stock insuficiente para este producto');
    }

    this.cliente = cliente;
    this.producto = producto;
    this.cantidad = cantidad;

    // Actualizamos el stock disponible //
    this.producto.stock_dispo -= cantidad;
  }

  calcularTotal(): number {
    return this.producto.aplicarDescuento() * this.cantidad;
  }
}

// Ejemplo de uso //
const cliente1 = new ClienteTienda("Ana", "Gómez");
const producto1 = new ProductoTienda("Pantalón de mezclilla", 500, 10, true);
const pedido1 = new PedidoTienda(cliente1, producto1, 2);

console.log(`Cliente: ${cliente1.obtenerNombreCompleto()}`);
console.log(`Producto: ${producto1.nombre_producto}`);
console.log(`Total a pagar: $${pedido1.calcularTotal()}`);

// Arreglos tipados por cada entidad //
const clientes: ClienteTienda[] = [
  new ClienteTienda("Ana", "Gómez"), //cliente 0
  new ClienteTienda("Luis", "Martínez"), //cliente 1
  new ClienteTienda("María", "Fernández"), //cliente 2
  new ClienteTienda("Carlos", "Pérez"), //cliente 3
  new ClienteTienda("Laura", "Sánchez"), //cliente 4
  new ClienteTienda("Javier", "López"), //cliente 5
  new ClienteTienda("Juan", "Manuel"), //cliente 6
  new ClienteTienda("Sofía", "Ramírez"), //cliente 7
  new ClienteTienda("Isabel", "Torres"), //cliente 8
  new ClienteTienda("Cristal", "Avila") //cliente 9
];

const productos: ProductoTienda[] = [
  new ProductoTienda("Camiseta de futbol", 1000, 50, true), //producto 0
  new ProductoTienda("Pantalón de mezclilla", 500, 20, false), //producto 1
  new ProductoTienda("Zapatos deportivos", 1500, 30, true), //producto 2
  new ProductoTienda("Chaqueta de cuero", 2000, 15, false), //producto 3
  new ProductoTienda("Gorra de béisbol", 300, 25, true), //producto 4
  new ProductoTienda("Bufanda de lana", 200, 40, false), //producto 5
  new ProductoTienda("Guantes de cuero", 400, 10, true), //producto 6
  new ProductoTienda("Cinturón de cuero", 600, 5, false), //producto 7
  new ProductoTienda("Calcetines deportivos", 100, 100, true), //producto 8
  new ProductoTienda("Sudadera con capucha", 800, 12, false)   //producto 9
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

// Funciones Tipadas
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

// Uso de funciones tipadas
mostrarElementos_arreglo(clientes);
mostrarElementos_arreglo(productos);
mostrarElementos_arreglo(pedidos);

//Uso de tipos especiales

interface Cliente {
  readonly id: number; // no se puede cambiar
  nombre: string;
  correo?: string; // opcional
}

interface Producto {
  readonly codigo: string | number; // union type
  nombre: string;
  descuento?: boolean; // opcional
}

interface Pedido {
  readonly numero: number;
  cliente: Cliente;
  productos: Producto[];
  calcularTotal: () => number;
}

// Uso de map()
const nombresClientes: string[] = clientes.map(cliente => cliente.obtenerNombreCompleto());
console.log('Nombres de clientes:', nombresClientes);

// Productos en Mayúscula
const nombresProductosMayus = productos.map(producto =>
  producto.nombre_producto.toUpperCase()
);
console.log("Nombres de productos en mayúsculas:", nombresProductosMayus);

// Transformar clientes en un arreglo de correos electrónicos simulados
const correosClientes = clientes.map(cliente =>
  `${cliente.nombre.toLowerCase()}.${cliente.apellido.toLowerCase()}@correo.com`
);
console.log("Correos electrónicos simulados de clientes:", correosClientes);

// Uso de filter()
// Filtrar productos con stock disponible mayor a 0
const productosDisponibles = productos.filter(producto => producto.stock_dispo > 0);
console.log("Productos disponibles:", productosDisponibles);

// Filtrar productos que tienen descuento
const productosConDescuento = productos.filter(producto => producto.descuento === true);
console.log("Productos con descuento:", productosConDescuento);

// Filtrar pedidos con más de 3 unidades
const pedidosGrandes = pedidos.filter(pedido => pedido.cantidad > 3);
console.log("Pedidos con más de 3 unidades:", pedidosGrandes);

// Uso de reduce()
// Suma total de precios de productos
const sumaPrecios = productos.reduce((acum, producto) => acum + producto.precio, 0);
console.log("Suma total de precios:", sumaPrecios);

// Cantidad total de pedidos realizados (simplemente el número de pedidos)
const cantidadPedidos = pedidos.length;
console.log("Cantidad total de pedidos:", cantidadPedidos);

// Promedio de cantidad de productos por pedido
const sumaCantidades = pedidos.reduce((acum, pedido) => acum + pedido.cantidad, 0);
const promedioCantidad = sumaCantidades / pedidos.length;
console.log("Promedio de cantidad de productos por pedido:", promedioCantidad);

// Simular relaciones entre entidades como objetos conectados
//Para recordar un ejemplo: una clase Pedido debe tener un atributo cliente (que será una
//instancia de la clase Cliente) y un arreglo de Producto

// Interfaces
interface Cliente {
  id: number;
  nombre: string;
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

interface Pedido {
  id: number;
  cliente: Cliente;
  productos: Producto[];
}

// Crear instancias simuladas
const cliente1: Cliente = { id: 1, nombre: 'Ana' };
const cliente2: Cliente = { id: 2, nombre: 'Luis' };

const producto1: Producto = { id: 101, nombre: 'Camiseta', precio: 20 };
const producto2: Producto = { id: 102, nombre: 'Pantalón', precio: 35 };
const producto3: Producto = { id: 103, nombre: 'Zapatos', precio: 50 };

// Crear pedidos respetando las relaciones
const pedido1: Pedido = {
  id: 1001,
  cliente: cliente1,
  productos: [producto1, producto2],
};

const pedido2: Pedido = {
  id: 1002,
  cliente: cliente2,
  productos: [producto3],
};

// Crear un objeto padre que contenga todo como si fuera una base de datos
const baseDeDatosSimulada = {
  clientes: [cliente1, cliente2],
  productos: [producto1, producto2, producto3],
  pedidos: [pedido1, pedido2],
};

console.log(baseDeDatosSimulada);

// Simular una operacion de negocio simple entre entidades 
function resumenPedido(pedido: PedidoTienda): string {
  return `Cliente: ${pedido.cliente.obtenerNombreCompleto()}\nProducto: ${pedido.producto.nombre_producto}\nCantidad: ${pedido.cantidad}`;
}

function contarProductosComprados(cliente: ClienteTienda, pedidos: PedidoTienda[]): number {
  return pedidos
    .filter(pedido => pedido.cliente === cliente)
    .reduce((total, pedido) => total + pedido.cantidad, 0);
}

console.log(resumenPedido(pedidos[0]));
console.log(contarProductosComprados(clientes[0], pedidos));

// Imprimir estructuras anidadas
pedidos.forEach((pedido, i) => {
  console.log(`Pedido ${i + 1}:`);
  console.log(`  Cliente: ${pedido.cliente.obtenerNombreCompleto()}`);
  console.log(`  Producto: ${pedido.producto.nombre_producto}`);
  console.log(`  Cantidad: ${pedido.cantidad}`);
  console.log(`  Total: $${pedido.calcularTotal()}`);
  console.log('-------------------------');
});
