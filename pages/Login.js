"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid Credentials");
      }

      const data = await res.json();

      // Save token & role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Role-based redirect
      if (data.role === "SUPER_ADMIN") {
        router.push("/dashboard/super-admin");
      } else if (data.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (data.role === "EXECUTIVE") {
        router.push("/dashboard/executive");
      }
    } catch (err) {
      setError("Login failed. Check email or password.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h2>CRM Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f6f8",
  },
  card: {
    width: "350px",
    padding: "30px",
    background: "#fff",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  error: {
    color: "red",
  },
};
