import { useState, type FormEvent } from "react";
import productsApi from "../api/productsApi";
import { type Product } from "../types";

export default function ProductForm() {
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    stock: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await productsApi.post("/products", product);
    alert("Producto registrado");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Registrar Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="price"
          type="number"
          placeholder="Precio"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button className="w-full bg-indigo-600 text-white p-2 rounded">
          Guardar
        </button>
      </form>
    </div>
  );
}
