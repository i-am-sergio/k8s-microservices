import { useEffect, useState } from "react";
import { type Product } from "../types";
import productsApi from "../api/productsApi";


export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ id: 0, name: "", price: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Obtener productos
  const fetchProducts = async () => {
    const { data } = await productsApi.get("/products");

    // Normalizamos el tipo de price a number
    const normalized = data.map((p: any) => ({
      ...p,
      price: parseFloat(p.price),
    }));

    console.log(normalized);
    setProducts(normalized);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Manejadores
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await productsApi.put(`/products/${form.id}`, {
        name: form.name,
        price: parseFloat(form.price),
      });
      setIsEditing(false);
    } else {
      await productsApi.post("/products", {
        name: form.name,
        price: parseFloat(form.price),
      });
    }
    setForm({ id: 0, name: "", price: "" });
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setForm({ id: product.id, name: product.name, price: product.price.toString() });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      await productsApi.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🛍️ Dashboard de Productos</h1>
      </nav>

      <main className="flex-1 p-6 max-w-5xl mx-auto">
        {/* Formulario */}
        <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {isEditing ? "✏️ Editar Producto" : "➕ Agregar Producto"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Nombre del producto"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400"
            />
            <input
              name="price"
              placeholder="Precio"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg shadow hover:opacity-90 transition"
            >
              {isEditing ? "Actualizar Producto" : "Agregar Producto"}
            </button>
          </form>
        </div>

        {/* Tabla de productos */}
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📦 Lista de Productos</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <th className="p-3 text-left rounded-tl-lg">ID</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Precio</th>
                <th className="p-3 text-center rounded-tr-lg">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{product.id}</td>
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">${product.price.toFixed(2)}</td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-3 py-1 bg-yellow-400 text-white rounded-lg shadow hover:bg-yellow-500 transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-4 text-center text-gray-500 italic"
                  >
                    No hay productos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 text-center py-4">
        © {new Date().getFullYear()} Tienda - Gemini UI Style
      </footer>
    </div>
  );
}
