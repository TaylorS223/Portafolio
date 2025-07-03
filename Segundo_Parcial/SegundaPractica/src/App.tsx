// src/App.tsx
import { useState } from 'react';
import { verificarSesionYCliente } from './servicios/ClienteService';
import Login from './paginas/login';
import ProductosPage from './paginas/ProductosPage';

function App() {
  const [cliente, setCliente] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function onLoginExitoso() {
    setLoading(true);
    const c = await verificarSesionYCliente();
    setCliente(c);
    setLoading(false);
  }

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="app-container">
      {!cliente ? (
        <Login onLoginExitoso={onLoginExitoso} />
      ) : (
        <main className="welcome-container">
          <h1>Bienvenido, {cliente.nombre}</h1>
          <p>Tu email es: {cliente.email}</p>
          <hr />
          <ProductosPage clienteId={cliente.id} />
        </main>
      )}
    </div>
  );
}

export default App;
