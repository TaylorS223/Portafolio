// src/paginas/login.tsx
//codigo creado por David Alejandro Vilañez Palma

import { useState } from 'react';
import { supabase } from '../SupabaseConfig';

interface LoginProps {
  onLoginExitoso: () => void;
}

export default function Login({ onLoginExitoso }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setErrorMsg(null);
    console.log('Usuario autenticado:', data.user);

    onLoginExitoso();
  };

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMsg && <p className="error">{errorMsg}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
