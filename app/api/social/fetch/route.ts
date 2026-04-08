import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Fetch public social stats for Instagram or TikTok via RapidAPI
// Requires RAPIDAPI_KEY env var. Returns partial data if key is missing.

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const platform = searchParams.get("platform");
  const handle = searchParams.get("handle")?.replace(/^@/, "").trim();

  if (!platform || !handle) {
    return NextResponse.json({ error: "platform and handle are required" }, { status: 400 });
  }

  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "RAPIDAPI_KEY not configured" }, { status: 503 });
  }

  try {
    if (platform === "instagram") {
      const res = await fetch(
        `https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=${encodeURIComponent(handle)}`,
        {
          headers: {
            "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
            "x-rapidapi-key": apiKey,
          },
          next: { revalidate: 3600 },
        }
      );
      if (!res.ok) throw new Error(`Instagram API returned ${res.status}`);
      const data = await res.json();
      const user = data?.data;
      if (!user) throw new Error("No user data returned");

      return NextResponse.json({
        platform: "instagram",
        username: user.username,
        followers: user.follower_count ?? user.edge_followed_by?.count ?? 0,
        likes: user.usertags_count ?? 0,
        avatar: user.profile_pic_url_hd ?? user.profile_pic_url ?? null,
        fullName: user.full_name ?? null,
      });
    }

    if (platform === "tiktok") {
      const res = await fetch(
        `https://tiktok-scraper7.p.rapidapi.com/user/info?unique_id=${encodeURIComponent(handle)}`,
        {
          headers: {
            "x-rapidapi-host": "tiktok-scraper7.p.rapidapi.com",
            "x-rapidapi-key": apiKey,
          },
          next: { revalidate: 3600 },
        }
      );
      if (!res.ok) throw new Error(`TikTok API returned ${res.status}`);
      const data = await res.json();
      const user = data?.data?.user;
      const stats = data?.data?.stats;
      if (!user) throw new Error("No user data returned");

      return NextResponse.json({
        platform: "tiktok",
        username: user.uniqueId,
        followers: stats?.followerCount ?? 0,
        likes: stats?.heartCount ?? 0,
        avatar: user.avatarLarger ?? user.avatarMedium ?? null,
        fullName: user.nickname ?? null,
      });
    }

    return NextResponse.json({ error: "Unsupported platform" }, { status: 400 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
