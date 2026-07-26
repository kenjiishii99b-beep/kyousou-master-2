import { LoginPayload, SignupPayload, AuthUser } from "@/types/auth";

type AuthResponse = {
  user: AuthUser;
};

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const responseBody = await res.json().catch(() => null);

    const message =
      typeof responseBody?.error === "string"
        ? responseBody.error
        : typeof responseBody?.error?.message === "string"
          ? responseBody.error.message
          : typeof responseBody?.error?.detail === "string"
            ? responseBody.error.detail
            : typeof responseBody?.detail === "string"
              ? responseBody.detail
              : "認証に失敗しました。";

    throw new Error(message);
  }

  return res.json();
}

export async function login(payload: LoginPayload): Promise<AuthUser> {
  const response = await postJson<AuthResponse>("/api/auth/login", payload);
  return response.user;
}

export async function signup(payload: SignupPayload): Promise<AuthUser> {
  const response = await postJson<AuthResponse>("/api/auth/signup", payload);
  return response.user;
}
