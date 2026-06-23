import { api } from "./api";
import type { AuthUser } from "@/lib/auth";

export interface AuthResponse extends AuthUser {
  token: string;
}

export interface RegisterPayload {
  fullName: string;
  phone: string;
  email?: string;
  password: string;
}

export interface LoginPayload {
  phone: string;
  password: string;
}

export async function register(data: RegisterPayload): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/api/auth/register", data);
  return res.data;
}

export async function login(data: LoginPayload): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/api/auth/login", data);
  return res.data;
}
