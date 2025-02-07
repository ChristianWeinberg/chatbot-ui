"use client";

import { ChangePassword } from "@/components/utility/change-password";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false); // Ikke længere afhængig af session

  const router = useRouter();

  useEffect(() => {
    // Hvis der er krav om at redirecte brugere, kan vi tilpasse denne logik
    const isLoggedIn = true; // Midlertidig placeholder - justér som nødvendigt
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return null;
  }

  return <ChangePassword />;
}
