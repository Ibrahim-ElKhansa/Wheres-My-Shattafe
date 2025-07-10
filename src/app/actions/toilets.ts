"use server";

import { createClient } from "@/utils/supabase/server";
import type { Gender } from "@/models/toilet";

export type NewToilet = {
  name: string;
  lat: number;
  lng: number;
  locationType: string;
  gender: Gender;
  description?: string;
  submittedById: string;
};

export async function addToilet(data: NewToilet) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("toilets")
    .insert({
      name: data.name,
      lat: data.lat,
      lng: data.lng,
      location_type: data.locationType,
      gender: data.gender,
      description: data.description || null,
      upvote_count: 0,
      downvote_count: 0,
      status: "pending",
      submitted_at: new Date().toISOString(),
      submitted_by_id: data.submittedById,
    });

  if (error) {
    console.error("addToilet error:", error);
    throw new Error(error.message);
  }
}
