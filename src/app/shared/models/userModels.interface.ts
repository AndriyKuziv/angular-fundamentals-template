export interface User {
    name: string | null,
    email: string,
    password: string,
    role: string,
    id: string
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}