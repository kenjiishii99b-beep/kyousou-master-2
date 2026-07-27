// 会員管理・認証（F02）用の型定義
// 仕様書 3.2「/api/auth/login」「/api/auth/signup」相当を想定

export interface LoginPayload {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

export interface SignupPayload {
  lastName: string;
  firstName: string;
  companyName: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  companyName: string;
  email: string;
  role: "startup" | "admin";
}
