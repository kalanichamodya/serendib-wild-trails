export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AdminSession {
  success: boolean;
  message?: string;
  accessToken: string;
  admin: Admin;
}
