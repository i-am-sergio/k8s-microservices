import { useState, type FormEvent } from "react";
import authApi from "../api/authApi";
import { type RegisterData } from "../types";

export default function Register() {
  const [form, setForm] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await authApi.post("/register", form);
    alert("Usuario registrado correctamente");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Registro</h1>
        <input
          name="username"
          placeholder="Nombre de usuario"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button className="w-full bg-green-500 text-white p-2 rounded">
          Registrarse
        </button>
      </form>
    </div>
  );
}
