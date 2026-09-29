"use client";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallback() {
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(() => {
      window.location.href = "/";
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>በመግባት ላይ... · Signing you in...</p>
    </div>
  );
}
