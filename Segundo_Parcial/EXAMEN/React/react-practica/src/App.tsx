// App.tsx
import { useState } from "react";
import data from "./data/data.json";
import { ClienteForm } from "./components/ClienteForm";
import type { ICliente, Cliente_id } from "./types/ICliente";
import { supabase } from "../SupabaseConfig";

export default function App() {
  const [clientes, setClientes] = useState<ICliente[]>(
    JSON.parse(localStorage.getItem("clientes") || JSON.stringify(data.clientes))
  );
  const [clienteEdit, setClienteEdit] = useState<ICliente | undefined>();

  // Crear nuevo cliente en la BD y en la lista local
  const handleCreate = async (cliente: Cliente_id) => {
    // Guardar en Supabase (registro real)
    const { data: nuevo, error } = await supabase
      .from("clientes")
      .insert([cliente])
      .select()
      .single();

    if (error) {
      console.error("Error al registrar cliente en la BD", error);
      return;
    }

    // Actualizar lista local
    const actualizados = [...clientes, nuevo];
    setClientes(actualizados);
    localStorage.setItem("clientes", JSON.stringify(actualizados));
  };

  // Actualizar cliente solo en lista local
  const handleUpdate = (id: string, cliente: Cliente_id) => {
    const actualizados = clientes.map(c => (c.id === id ? { ...c, ...cliente } : c));
    setClientes(actualizados);
    localStorage.setItem("clientes", JSON.stringify(actualizados));
    setClienteEdit(undefined);
  };

  const handleCancel = () => setClienteEdit(undefined);

  return (
    <div>
      <h1>Clientes</h1>
      <ClienteForm
        clienteEdit={clienteEdit}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onCancel={handleCancel}
      />
      <ul>
        {clientes.map(c => (
          <li key={c.id}>
            {c.nombre} {c.apellido} - {c.correo}
            <button onClick={() => setClienteEdit(c)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
