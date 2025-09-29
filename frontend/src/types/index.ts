export interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}
