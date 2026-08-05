"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { COLORS } from "@/lib/theme";

export default function LoginPage() {
  const supabase = createClient();
  const [mode, setMode] = useState("email");
  const [value, setValue] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const sendCode = async () => {
    setLoading(true);
    setMsg("");
    const { error } =
      mode === "email"
        ? await supabase.auth.signInWithOtp({ email: value })
        : await supabase.auth.signInWithOtp({ phone: value });
    setLoading(false);
    if (error) return setMsg(error.message);
    setOtpSent(true);
    setMsg(mode === "email" ? "ኮድ ወደ ኢሜይልዎ ተልኳል" : "ኮድ በSMS ተልኳል");
  };

  const verifyCode = async () => {
    setLoading(true);
    setMsg("");
    const { error } =
      mode === "email"
        ? await supabase.auth.verifyOtp({ email: value, token: code, type: "email" })
        : await supabase.auth.verifyOtp({ phone: value, token: code, type: "sms" });
    setLoading(false);
    if (error) return setMsg(error.message);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: COLORS.parchment }}>
      <div className="w-full max-w-sm rounded-2xl p-6" style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}>
        <h1 className="text-xl font-bold text-center mb-1">አዲስ ገበያ</h1>
        <p className="text-center text-sm mb-5" style={{ color: COLORS.inkSoft }}>ለመግባት ኢሜይል ወይም ስልክ ቁጥርዎን ያስገቡ</p>

        <div className="flex rounded-full overflow-hidden mb-4 text-sm font-semibold" style={{ border: `1px solid ${COLORS.parchmentDark}` }}>
          <button onClick={() => { setMode("email"); setOtpSent(false); }} className="flex-1 py-2" style={{ background: mode === "email" ? COLORS.coffee : "transparent", color: mode === "email" ? COLORS.parchment : COLORS.ink }}>ኢሜይል</button>
          <button onClick={() => { setMode("phone"); setOtpSent(false); }} className="flex-1 py-2" style={{ background: mode === "phone" ? COLORS.coffee : "transparent", color: mode === "phone" ? COLORS.parchment : COLORS.ink }}>ስልክ</button>
        </div>

        {!otpSent ? (
          <>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={mode === "email" ? "you@example.com" : "+251911223344"}
              className="w-full px-3 py-2.5 rounded-lg text-sm mb-3"
              style={{ border: `1px solid ${COLORS.parchmentDark}`, background: "#FBF8EF" }}
            />
            <button
              onClick={sendCode}
              disabled={loading || !value.trim()}
              className="w-full py-2.5 rounded-full font-semibold text-sm disabled:opacity-50"
              style={{ background: COLORS.gold, color: COLORS.coffeeDark }}
            >
              {loading ? "..." : "ኮድ ላክ"}
            </button>
          </>
        ) : (
          <>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="6-digit code"
              className="w-full px-3 py-2.5 rounded-lg text-sm mb-3 tracking-widest text-center"
              style={{ border: `1px solid ${COLORS.parchmentDark}`, background: "#FBF8EF" }}
            />
            <button
              onClick={verifyCode}
              disabled={loading || code.length < 4}
              className="w-full py-2.5 rounded-full font-semibold text-sm disabled:opacity-50"
              style={{ background: COLORS.gold, color: COLORS.coffeeDark }}
            >
              {loading ? "..." : "አረጋግጥ · Verify"}
            </button>
          </>
        )}

        {msg && <p className="text-xs text-center mt-3" style={{ color: COLORS.rust }}>{msg}</p>}

        {mode === "phone" && (
          <p className="text-[11px] text-center mt-4" style={{ color: COLORS.inkSoft }}>
            የስልክ ግቤት ስራ ላይ እንዲውል Supabase ላይ SMS አቅራቢ (Twilio) ማዋቀር ያስፈልጋል።
          </p>
        )}
      </div>
    </div>
  );
}
