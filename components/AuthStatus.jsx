"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, LogOut, User } from "lucide-react";
import { COLORS } from "@/lib/theme";

export default function AuthStatus() {
  const supabase = createClient();
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (session === undefined) return <div className="w-24" />;

  if (!session) {
    return (
      <a
        href="/login"
        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold shrink-0"
        style={{ background: COLORS.gold, color: COLORS.coffeeDark }}
      >
        <User size={16} /> ይግቡ · Log in
      </a>
    );
  }

  return (
    <div className="flex items-center gap-2 shrink-0">
      <a
        href="/post"
        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold"
        style={{ background: COLORS.gold, color: COLORS.coffeeDark }}
      >
        <Plus size={16} /> ማስታወቂያ ይለጥፉ
      </a>
      <button
        onClick={() => supabase.auth.signOut().then(() => (window.location.href = "/"))}
        className="p-2 rounded-full"
        style={{ background: COLORS.parchmentDark, color: COLORS.coffeeDark }}
        title="Log out"
      >
        <LogOut size={16} />
      </button>
    </div>
  );
}
