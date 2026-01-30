"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children, allowedRoles }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.push("/login");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      router.push("/unauthorized");
    }
  }, []);

  return children;
}
