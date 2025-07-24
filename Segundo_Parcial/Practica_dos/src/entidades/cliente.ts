// src/entidadess/Cliente.ts
//codigo creado por David Alejandro Vilañez Palma
export interface Cliente {
  id: string;
  nombre: string;
  email: string;
}

export type CreateClienteInput = Omit<Cliente, 'id'>;
