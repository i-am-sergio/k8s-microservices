import { useState, type FormEvent } from "react";
import productsApi from "../api/productsApi";
import { type Product } from "../types";

export default function ProductForm() {
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    stock: 0,
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await productsApi.post("/products", product);
      setMessage("✅ Producto registrado con éxito");
      setProduct({ id: 0, name: "", price: 0, stock: 0 });
    } catch {
      setMessage("❌ Ocurrió un error al registrar el producto");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden">
      {/* Fondos animados */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-400 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-400 opacity-30 rounded-full blur-3xl animate-pulse delay-2000" />

      {/* Card principal */}
      <div className="relative z-10 w-full max-w-md bg-white/30 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 drop-shadow-sm">
          Registrar Producto
        </h1>
        <p className="text-center text-gray-700 mt-2 mb-6">
          Completa los campos para agregar un nuevo producto
        </p>

        {message && (
          <div
            className={`mb-4 px-4 py-2 rounded-lg text-center shadow-sm ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800 mb-1"
            >
              Nombre
            </label>
            <input
              id="name"
              name="name"
              placeholder="Ejemplo: Laptop"
              value={product.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-800 mb-1"
            >
              Precio
            </label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="Ejemplo: 1999.99"
              value={product.price || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-semibold text-gray-800 mb-1"
            >
              Stock
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              placeholder="Ejemplo: 50"
              value={product.stock || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out"
          >
            Guardar Producto
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Tienda - Gemini UI
        </p>
      </div>
    </div>
  );
}
