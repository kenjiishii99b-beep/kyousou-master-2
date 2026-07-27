import { LoginPayload, SignupPayload, AuthUser } from "@/types/auth";

// バックエンド (FastAPI) のベースURL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    // FastAPI は { "detail": "エラーメッセージ" } で返すため detail も参照する
    throw new Error(errorBody?.detail ?? errorBody?.error?.message ?? "認証に失敗しました。");
  }

  return res.json();
}

export function login(payload: LoginPayload): Promise<AuthUser> {
  return postJson<AuthUser>("/api/auth/login", payload);
}

export async function signup(payload: SignupPayload): Promise<AuthUser> {
  // 💡 キャメルケースを FastAPI(Python) が受けるスネークケースに変換して送信
  const formattedPayload = {
    company_name: payload.companyName,
    last_name: payload.lastName,
    first_name: payload.firstName,
    email: payload.email,
    password: payload.password,
  };

  // 💡 送信先を FastAPI 側の定義 (/api/auth/register) に合わせる
  const result = await postJson<AuthUser & { access_token?: string }>("/api/auth/register", formattedPayload);

  // トークンが返ってきた場合は localStorage に保存してログイン状態を保持
  if (result.access_token) {
    localStorage.setItem("access_token", result.access_token);
  }

  return result;
}
