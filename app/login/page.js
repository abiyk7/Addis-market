"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { COLORS } from "@/lib/theme";

// Supabase needs an email-shaped address internally, so we turn the
// username into a hidden one behind the scenes. Users never see this.
const FAKE_DOMAIN = "@users.addis-market.local";
const toEmail = (username) => `${username.trim().toLowerCase()}${FAKE_DOMAIN}`;

export default function LoginPage() {
  const supabase = createClient();
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validUsername = /^[a-zA-Z0-9_]{3,20}$/.test(username.trim());
  const validPassword = password.length >= 6;

  const submit = async () => {
    setMsg("");
    if (!validUsername) {
      setMsg("የተጠቃሚ ስም 3-20 ፊደል/ቁጥር መሆን አለበት (ምንም ክፍት ቦታ)");
      return;
    }
    if (!validPassword) {
      setMsg("የይለፍ ቃል ቢያንስ 6 ፊደል መሆን አለበት");
      return;
    }

    setLoading(true);
    const email = toEmail(username);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) {
        if (error.message.toLowerCase().includes("already registered")) {
          setMsg("ይህ የተጠቃሚ ስም ተይዟል፣ ሌላ ይሞክሩ ወይም ይግቡ።");
        } else {
          setMsg(error.message);
        }
        return;
      }
      window.location.href = "/";
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setMsg("የተጠቃሚ ስም ወይም የይለፍ ቃል ትክክል አይደለም።");
        return;
      }
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: COLORS.parchment }}>
      <div className="w-full max-w-sm rounded-2xl p-6" style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}>
        <h1 className="text-xl font-bold text-center mb-1">አዲስ ገበያ</h1>
        <p className="text-center text-sm mb-5" style={{ color: COLORS.inkSoft }}>
          የተጠቃሚ ስም እና የይለፍ ቃል ብቻ ያስፈልጋል
        </p>

        <div className="flex rounded-full overflow-hidden mb-4 text-sm font-semibold" style={{ border: `1px solid ${COLORS.parchmentDark}` }}>
          <button
            onClick={() => { setMode("login"); setMsg(""); }}
            className="flex-1 py-2"
            style={{ background: mode === "login" ? COLORS.coffee : "transparent", color: mode === "login" ? COLORS.parchment : COLORS.ink }}
          >
            ግቡ · Log in
          </button>
          <button
            onClick={() => { setMode("signup"); setMsg(""); }}
            className="flex-1 py-2"
            style={{ background: mode === "signup" ? COLORS.coffee : "transparent", color: mode === "signup" ? COLORS.parchment : COLORS.ink }}
          >
            አዲስ መለያ · Sign up
          </button>
        </div>

        <label className="text-sm font-semibold block mb-1" style={{ color: COLORS.inkSoft }}>የተጠቃሚ ስም · Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="abebe123"
          className="w-full px-3 py-2.5 rounded-lg text-sm mb-3"
          style={{ border: `1px solid ${COLORS.parchmentDark}`, background: "#FBF8EF" }}
        />

        <label className="text-sm font-semibold block mb-1" style={{ color: COLORS.inkSoft }}>የይለፍ ቃል · Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-3 py-2.5 rounded-lg text-sm mb-4"
          style={{ border: `1px solid ${COLORS.parchmentDark}`, background: "#FBF8EF" }}
        />

        <button
          onClick={submit}
          disabled={loading || !username.trim() || !password.trim()}
          className="w-full py-2.5 rounded-full font-semibold text-sm disabled:opacity-50"
          style={{ background: COLORS.gold, color: COLORS.coffeeDark }}
        >
          {loading ? "..." : mode === "signup" ? "መለያ ክፈት · Create account" : "ግባ · Log in"}
        </button>

        {msg && <p className="text-xs text-center mt-3" style={{ color: COLORS.rust }}>{msg}</p>}

        {mode === "signup" && (
          <p className="text-[11px] text-center mt-4" style={{ color: COLORS.inkSoft }}>
            የይለፍ ቃልዎን በደንብ ያስታውሱ — ኢሜይል ወይም ስልክ ስለሌለ መልሶ ማግኘት አይቻልም።
          </p>
        )}
      </div>
    </div>
  );
}
