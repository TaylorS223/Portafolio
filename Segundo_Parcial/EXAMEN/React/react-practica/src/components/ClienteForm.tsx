import type { ICliente } from "../types/ICliente";
import { useState, useEffect } from "react";

/*Declarar el Prop para form*/

export interface Props{
    clienteEdit?: ICliente; // cliente que luego se va a editar
    onCreate: (cliente: Omit<ICliente, "id"> ) => void; //metodo para crear un nuevo cliente
    onUpdate: (id:string, cliente: Omit<ICliente, "id"> )=> void; // metodo para actualizar un cliente por id
    onCancel: () => void;
}

export function ClienteForm({ clienteEdit, onCreate, onUpdate, onCancel }: Props) {
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");

  useEffect(() => {
    if (clienteEdit) {
      setNombre(clienteEdit.nombre);
      setApellido(clienteEdit.apellido);
      setCorreo(clienteEdit.correo);
      setTelefono(clienteEdit.telefono);
    } else {
      setNombre("");
      setApellido("");
      setCorreo("");
      setTelefono("");
    }
  }, [clienteEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoCliente = { nombre, apellido, correo, telefono };

    if (clienteEdit) {
      // Editar
      onUpdate(clienteEdit.id, nuevoCliente);
    } else {
      // Crear
      onCreate(nuevoCliente);
    }

    // Opcional: limpiar
    setNombre("");
    setApellido("");
    setCorreo("");
    setTelefono("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
      />
      <input
        type="text"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        placeholder="Apellido"
      />
      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Correo"
      />
      <input
        type="tel"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        placeholder="Teléfono"
      />
      <button type="submit">
        {clienteEdit ? "Actualizar" : "Registrarse"}
      </button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
}
