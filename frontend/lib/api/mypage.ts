export async function fetchMypage() {
  // ブラウザのストレージからアクセストークンを取得
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const res = await fetch("http://127.0.0.1:8000/api/mypage", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 取得したトークンをAuthorizationヘッダーにセットして送信
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error("マイページ情報の取得に失敗しました。");
  }

  return res.json();
}