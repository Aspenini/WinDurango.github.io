<script lang="ts">
  import LinkIcon from "@components/LinkIcon.svelte";
  import LatestBuild from "@components/LatestBuild.svelte";
  import XboxWaveBackground from "@components/XboxWaveBackground.svelte";

  const base = import.meta.env.BASE_URL;

  type IconName = "github" | "docs" | "discord" | "x" | "reddit";

  type ProjectLink = {
    label: string;
    href: string;
    icon: IconName;
  };

  const links: ProjectLink[] = [
    {
      label: "GitHub",
      href: "https://github.com/WinDurango/WinDurango",
      icon: "github"
    },
    {
      label: "Docs",
      href: "https://github.com/WinDurango/WinDurango#getting-started",
      icon: "docs"
    },
    {
      label: "Discord",
      href: "https://discord.gg/mHN2BgH7MR",
      icon: "discord"
    },
    {
      label: "X",
      href: "https://x.com/WinDurango",
      icon: "x"
    },
    {
      label: "Reddit",
      href: "https://www.reddit.com/r/WinDurango/",
      icon: "reddit"
    }
  ];
</script>

<a class="skip-link" href="#main">Skip to content</a>

<main class="home" id="main">
  <XboxWaveBackground />

  <header class="topbar shell">
    <nav class="project-nav" aria-label="Project links">
      {#each links as link (link.label)}
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          <LinkIcon name={link.icon} />
          {link.label}
        </a>
      {/each}
    </nav>
  </header>

  <section class="hero shell" aria-labelledby="hero-title">
    <div class="hero-layout">
      <div class="panel hero-panel">
        <p class="kicker">Open-source Xbox One compatibility</p>
        <h1 id="hero-title">WinDurango</h1>
        <p class="tagline">The world's first Xbox One compatibility layer for Windows.</p>

        <LatestBuild />

        <p class="note">Experimental. Community-built. Not affiliated with Microsoft.</p>
      </div>

      <div
        class="panel logo-tile"
        style="--logo: url('{base}assets/logo/WinDurango.svg')"
        role="img"
        aria-label="WinDurango logo"
      ></div>
    </div>
  </section>
</main>
