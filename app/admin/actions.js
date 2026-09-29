"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function assertAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) throw new Error("Not an admin");
}

export async function deleteListing(formData) {
  await assertAdmin();
  const id = formData.get("id");
  const admin = createAdminClient();
  const { error } = await admin.from("listings").delete().eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/");
  if (error) redirect(`/admin?error=${encodeURIComponent(error.message)}`);
}

export async function toggleListingStatus(formData) {
  await assertAdmin();
  const id = formData.get("id");
  const current = formData.get("current");
  const next = current === "active" ? "inactive" : "active";
  const admin = createAdminClient();
  const { error } = await admin.from("listings").update({ status: next }).eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/");
  if (error) redirect(`/admin?error=${encodeURIComponent(error.message)}`);
}

export async function toggleVerifiedSeller(formData) {
  await assertAdmin();
  const id = formData.get("id");
  const current = formData.get("current") === "true";
  const admin = createAdminClient();
  const { error } = await admin.from("profiles").update({ is_verified_seller: !current }).eq("id", id);
  revalidatePath("/admin");
  if (error) redirect(`/admin?error=${encodeURIComponent(error.message)}`);
}
