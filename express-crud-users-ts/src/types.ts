export interface User {
  id: number;
  email: string;
  contrasena: string;
  nombre: string;
  fechaNacimiento: string;
}

export interface UserCreate {
  email: string;
  contrasena: string;
  nombre: string;
  fechaNacimiento: string;
}

export interface UserUpdate {
  email?: string;
  contrasena?: string;
  nombre?: string;
  fechaNacimiento?: string;
}
