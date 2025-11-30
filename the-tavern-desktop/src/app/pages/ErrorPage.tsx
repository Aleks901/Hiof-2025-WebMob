"use client";

export function ErrorPage() {
  const reason =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("reason")
      : null;

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1 style={{ color: "red" }}>Error</h1>
      <p>Something went wrong. You were redirected here from a server function.</p>
      {reason && (
        <p style={{ color: "#666" }}>
          Reason: <code>{reason}</code>
        </p>
      )}
      <a href="/" style={{ color: "#0066cc" }}>
        Back to login
      </a>
    </div>
  );
}