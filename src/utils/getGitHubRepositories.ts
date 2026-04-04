import { SOCIALS } from "@/constants";

export interface GitHubRepository {
  name: string;
  description: string;
  homepage: string | null;
  htmlUrl: string;
  language: string | null;
  updatedAt: string;
  archived: boolean;
}

interface GitHubRepoResponse {
  name: string;
  description: string | null;
  homepage: string | null;
  html_url: string;
  language: string | null;
  updated_at: string;
  archived: boolean;
}

const PAGE_SIZE = 100;

const GITHUB_USERNAME = (() => {
  const githubProfile = SOCIALS.find(social => social.name === "GitHub")?.href;

  if (!githubProfile) {
    return "orguetta";
  }

  return new URL(githubProfile).pathname.replace(/^\/+|\/+$/g, "");
})();

function toToolDescription(description: string | null, archived: boolean) {
  if (description?.trim()) {
    return description.trim();
  }

  return archived ? "Archived public repository." : "Public GitHub repository.";
}

export async function getGitHubRepositories(): Promise<GitHubRepository[]> {
  const repositories: GitHubRepository[] = [];
  const seenRepositories = new Set<string>();

  for (let page = 1; page < 20; page += 1) {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=public&sort=updated&per_page=${PAGE_SIZE}&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );

    if (!response.ok) {
      return [];
    }

    const pageRepositories = (await response.json()) as GitHubRepoResponse[];

    if (pageRepositories.length === 0) {
      break;
    }

    repositories.push(
      ...pageRepositories
        .filter(repository => {
          const repositoryKey = repository.html_url.toLowerCase();

          if (seenRepositories.has(repositoryKey)) {
            return false;
          }

          seenRepositories.add(repositoryKey);
          return true;
        })
        .map(repository => ({
          name: repository.name,
          description: toToolDescription(repository.description, repository.archived),
          homepage: repository.homepage,
          htmlUrl: repository.html_url,
          language: repository.language,
          updatedAt: repository.updated_at,
          archived: repository.archived,
        })),
    );

    if (pageRepositories.length < PAGE_SIZE) {
      break;
    }
  }

  return repositories.sort(
    (left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt),
  );
}