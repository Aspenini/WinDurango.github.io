<script lang="ts">
  import { onMount } from "svelte";
  import LinkIcon from "@components/LinkIcon.svelte";

  const OWNER = "WinDurango";
  const REPO = "WinDurango";
  const WORKFLOW = "build-WD.yml";
  const ACTIONS_URL = `https://github.com/${OWNER}/${REPO}/actions/workflows/${WORKFLOW}`;

  type Build = {
    number: number;
    title: string;
    sha: string;
    date: string;
    runUrl: string;
    downloadUrl: string;
  };

  let status: "loading" | "ready" | "error" = "loading";
  let build: Build | null = null;

  const api = (path: string) =>
    fetch(`https://api.github.com/repos/${OWNER}/${REPO}/${path}`, {
      headers: { Accept: "application/vnd.github+json" }
    });

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });

  onMount(async () => {
    try {
      const runsRes = await api(
        `actions/workflows/${WORKFLOW}/runs?status=success&branch=main&per_page=1`
      );
      if (!runsRes.ok) throw new Error(`runs ${runsRes.status}`);
      const run = (await runsRes.json()).workflow_runs?.[0];
      if (!run) throw new Error("no successful runs");

      // Direct artifact link works for signed-in users; fall back to the run page.
      let downloadUrl: string = run.html_url;
      try {
        const artRes = await api(`actions/runs/${run.id}/artifacts`);
        if (artRes.ok) {
          const artifact = (await artRes.json()).artifacts?.find(
            (a: { expired: boolean }) => !a.expired
          );
          if (artifact) {
            downloadUrl = `https://github.com/${OWNER}/${REPO}/actions/runs/${run.id}/artifacts/${artifact.id}`;
          }
        }
      } catch {
        /* keep run-page fallback */
      }

      build = {
        number: run.run_number,
        title: run.display_title || run.head_commit?.message?.split("\n")[0] || "Latest commit",
        sha: String(run.head_sha).slice(0, 7),
        date: formatDate(run.updated_at),
        runUrl: run.html_url,
        downloadUrl
      };
      status = "ready";
    } catch {
      status = "error";
    }
  });
</script>

<div class="download" aria-label="Latest build">
  <p class="download-kicker">
    <span class="build-dot" aria-hidden="true"></span>
    Rolling release · built on every push
  </p>

  {#if status === "loading"}
    <div class="download-row">
      <span class="action action--primary is-loading" aria-busy="true">
        <LinkIcon name="download" />
        Checking latest build…
      </span>
    </div>
  {:else if status === "ready" && build}
    <div class="download-row">
      <a
        class="action action--primary"
        href={build.downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkIcon name="download" />
        Download build #{build.number}
      </a>

      <dl class="build-meta">
        <dt class="sr-only">Latest commit</dt>
        <dd class="build-title">{build.title}</dd>
        <dt class="sr-only">Details</dt>
        <dd class="build-sub">Updated {build.date} · <code>{build.sha}</code></dd>
      </dl>
    </div>

    <p class="download-foot">
      <a href={build.runUrl} target="_blank" rel="noopener noreferrer">View this run</a>
      <a href={ACTIONS_URL} target="_blank" rel="noopener noreferrer">All builds →</a>
      <span class="download-hint">Sign in to GitHub to download the artifact.</span>
    </p>
  {:else}
    <div class="download-row">
      <a class="action action--primary" href={ACTIONS_URL} target="_blank" rel="noopener noreferrer">
        <LinkIcon name="download" />
        Get the latest build
      </a>
    </div>
    <p class="download-foot">
      <span class="download-hint">Couldn't reach GitHub — browse builds on Actions.</span>
    </p>
  {/if}
</div>
