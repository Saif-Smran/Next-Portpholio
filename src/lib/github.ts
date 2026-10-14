import { getSetting, setSetting } from "./db/settings";

export interface GitHubData {
  publicRepos: number;
  followers: number;
  pinnedRepos: Array<{
    name: string;
    description: string;
    url: string;
    stars: number;
    forks: number;
    language: string;
  }>;
  fetchedAt: number;
}

const CACHE_KEY = "github_cache";
const CACHE_DURATION_MS = 6 * 60 * 60 * 1000; // 6 hours

export async function getGitHubStats(): Promise<GitHubData> {
  const username = process.env.GITHUB_USERNAME || "Saif-Smran";
  const token = process.env.GITHUB_TOKEN;

  const cached = await getSetting<GitHubData | null>(CACHE_KEY, null);

  const now = Date.now();
  if (cached && now - cached.fetchedAt < CACHE_DURATION_MS) {
    return cached;
  }

  try {
    const headers: Record<string, string> = {
      "User-Agent": "portfolio-app",
      Accept: "application/vnd.github.v3+json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
        {
          headers,
          next: { revalidate: 3600 },
        },
      ),
    ]);

    if (!userRes.ok) {
      if (cached) return cached;
      throw new Error(`GitHub user fetch failed: ${userRes.status}`);
    }

    const userData = await userRes.json();
    const reposData = reposRes.ok ? await reposRes.json() : [];

    const pinnedRepos = Array.isArray(reposData)
      ? reposData.map((r: any) => ({
          name: r.name,
          description: r.description || "",
          url: r.html_url,
          stars: r.stargazers_count,
          forks: r.forks_count,
          language: r.language || "TypeScript",
        }))
      : [];

    const result: GitHubData = {
      publicRepos: userData.public_repos || 25,
      followers: userData.followers || 10,
      pinnedRepos,
      fetchedAt: now,
    };

    await setSetting(CACHE_KEY, result);
    return result;
  } catch (error) {
    console.error("GitHub fetch error:", error);
    if (cached) return cached;
    return {
      publicRepos: 25,
      followers: 12,
      pinnedRepos: [
        {
          name: "Assignment-B7A7-Housing-Roommate-Management-Frontend",
          description:
            "UrbanMatch: Housing and roommate management platform frontend",
          url: "https://github.com/Saif-Smran/Assignment-B7A7-Housing-Roommate-Management-Frontend",
          stars: 4,
          forks: 1,
          language: "TypeScript",
        },
        {
          name: "Assignment-B7A5-GearUp-Frontend",
          description:
            "GearUp: Sports and outdoor gear rental marketplace frontend",
          url: "https://github.com/Saif-Smran/Assignment-B7A5-GearUp-Frontend",
          stars: 3,
          forks: 1,
          language: "TypeScript",
        },
      ],
      fetchedAt: now,
    };
  }
}
