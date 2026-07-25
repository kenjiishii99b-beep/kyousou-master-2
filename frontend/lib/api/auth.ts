import { LoginPayload, SignupPayload, AuthUser } from "@/types/auth";

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
              : "\u8a8d\u8a3c\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002";

    throw new Error(message);
  }

  return res.json();
}

export function login(payload: LoginPayload): Promise<AuthUser> {
  return postJson<AuthUser>("/api/auth/login", payload);
}

export function signup(payload: SignupPayload): Promise<AuthUser> {
  return postJson<AuthUser>("/api/auth/signup", payload);
}
