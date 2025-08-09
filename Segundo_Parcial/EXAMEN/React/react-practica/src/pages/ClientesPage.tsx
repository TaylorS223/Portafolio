import { useState, useEffect } from "react";
import type { ICliente } from "../types/ICliente";
import { ClienteForm } from "../components/ClienteForm";
import { ClienteLista } from "../components/ClienteLista";
import { leerCliente, crearCliente, actualizarCliente, borrarCliente } from "../services/Clienteservices";

export function ClientesPage() {
  const [clientes, setClientes] = useState<ICliente[]>([]);
  const [clienteEdit, setClienteEdit] = useState<ICliente | undefined>(undefined);

  // Cargar clientes al montar
  useEffect(() => {
    cargarCliente();
  }, []);

  async function cargarCliente() {
    const data = await leerCliente();
    setClientes(data);
  }

  async function handleCreate(nuevoCliente: Omit<ICliente, "id">) {
    await crearCliente(nuevoCliente);
    await cargarCliente();
  }

  async function handleUpdate(
    id: string,
    clienteActualizado: Omit<ICliente, "id">
  ): Promise<void> {
      const clienteConId: ICliente = { id, ...clienteActualizado };
      await actualizarCliente(id, clienteConId);
      setClienteEdit(undefined);
      await cargarCliente();
  }

  async function handleDelete(id: string) {
    await borrarCliente(id);
    await cargarCliente();
  }

  function handleCancel() {
    setClienteEdit(undefined);
  }

  function handleEdit(cliente: ICliente) {
    setClienteEdit(cliente);
  }

  return (
    <div>
      <h1>Registro</h1>

      {/* Formulario para crear o editar */}
      <ClienteForm
        clienteEdit={clienteEdit}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onCancel={handleCancel}
      />

      {/* Lista de clientes */}
      <ClienteLista clientes={clientes} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
