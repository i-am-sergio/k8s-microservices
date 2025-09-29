import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { LoginData, User } from "../types";
import authApi from "../api/authApi";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginData>({ email: "", password: "" });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await authApi.post<User>("/login", form);
      login(res.data);
      navigate("/dashboard");
    } catch {
      setError("Credenciales inválidas. Intenta nuevamente.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden">
      {/* Fondo animado con formas difusas */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-400 opacity-30 rounded-full blur-3xl animate-pulse delay-2000" />

      {/* Contenedor principal tipo Glass */}
      <div className="relative z-10 w-full max-w-md bg-white/30 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
        {/* Encabezado */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 drop-shadow-sm">
          Bienvenido
        </h1>
        <p className="text-center text-gray-700 mt-2">
          Inicia sesión para acceder al panel
        </p>

        {/* Mensaje de error */}
        {error && (
          <div className="mt-4 bg-red-100 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm shadow-sm">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800 mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tuemail@ejemplo.com"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
            />
          </div>

          {/* Botón de iniciar sesión */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Separador */}
        <div className="relative flex items-center justify-center my-6">
          <span className="absolute bg-white/30 px-2 text-gray-500 text-sm">
            o
          </span>
          <div className="w-full h-px bg-gray-300" />
        </div>

        {/* Botón de registro */}
        <button
          onClick={() => navigate("/register")}
          className="w-full py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out"
        >
          Crear Cuenta
        </button>

        {/* Pie de página */}
        <p className="mt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
