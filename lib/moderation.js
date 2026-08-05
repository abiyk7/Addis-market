const FALLBACK_KEYWORDS = [
  { word: "western union", weight: 3 },
  { word: "wire transfer", weight: 3 },
  { word: "gift card", weight: 3 },
  { word: "moneygram", weight: 3 },
  { word: "send deposit first", weight: 3 },
  { word: "whatsapp only", weight: 1 },
  { word: "outside the app", weight: 2 },
  { word: "urgent sale", weight: 1 },
  { word: "no questions asked", weight: 2 },
];

const FLAG_THRESHOLD = 3;
const MAX_POSTS_PER_DAY = 5;

export async function scoreListingRisk(supabase, { title, description }) {
  let keywords = FALLBACK_KEYWORDS;
  try {
    const { data } = await supabase.from("risk_keywords").select("word, weight");
    if (data && data.length) keywords = data;
  } catch {}

  const text = `${title} ${description}`.toLowerCase();
  const matches = keywords.filter((k) => text.includes(k.word.toLowerCase()));
  const score = matches.reduce((sum, m) => sum + m.weight, 0);

  return { score, matches: matches.map((m) => m.word), flagged: score >= FLAG_THRESHOLD };
}

export async function isPostingTooFast(supabase, userId) {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("listings")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", since);
  return (count ?? 0) >= MAX_POSTS_PER_DAY;
}

export async function decideListingStatus(supabase, userId, { title, description }) {
  const risk = await scoreListingRisk(supabase, { title, description });
  const tooFast = await isPostingTooFast(supabase, userId);
  return {
    status: risk.flagged || tooFast ? "pending" : "active",
    reason: risk.flagged ? `keyword risk (${risk.matches.join(", ")})` : tooFast ? "posting rate limit" : null,
  };
}
