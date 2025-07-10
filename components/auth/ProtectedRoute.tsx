"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NotFound from "@/components/ui/NotFound";

export default function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const [isAllowed, setIsAllowed] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const role = localStorage.getItem("role");
    if (!loggedIn) {
      router.push("/");
      return;
    }
    if (adminOnly && role !== "admin") {
      setIsAllowed(false);
      setChecked(true);
      return;
    }
    setIsAllowed(true);
    setChecked(true);
  }, [adminOnly, router]);

  if (!checked) return null;

  if (!isAllowed) {
    return <NotFound />;
  }

  return <>{children}</>;
} 