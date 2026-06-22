<script lang="ts">
  import LinkIcon from "@components/LinkIcon.svelte";
  import XboxWaveBackground from "@components/XboxWaveBackground.svelte";

  type IconName = "github" | "docs" | "discord";

  type ProjectLink = {
    label: string;
    href: string;
    icon: IconName;
    primary: boolean;
  };

  const links: ProjectLink[] = [
    {
      label: "GitHub",
      href: "https://github.com/WinDurango/WinDurango",
      icon: "github",
      primary: true
    },
    {
      label: "Docs",
      href: "https://github.com/WinDurango/WinDurango#getting-started",
      icon: "docs",
      primary: false
    },
    {
      label: "Discord",
      href: "https://discord.gg/mHN2BgH7MR",
      icon: "discord",
      primary: false
    }
  ];
</script>

<a class="skip-link" href="#main">Skip to content</a>

<main class="home" id="main">
  <XboxWaveBackground />

  <header class="topbar shell">
    <a class="brand" href="/" aria-label="WinDurango home">
      <img src="/assets/logo/WinDurango.svg" width="42" height="42" alt="" />
      <span>WinDurango</span>
    </a>

    <nav class="project-nav" aria-label="Project links">
      {#each links as link (link.label)}
        <a href={link.href}>
          <LinkIcon name={link.icon} />
          {link.label}
        </a>
      {/each}
    </nav>
  </header>

  <section class="hero shell" aria-labelledby="hero-title">
    <div class="hero-panel">
      <p class="kicker">Open-source Xbox One compatibility</p>
      <h1 id="hero-title">WinDurango</h1>
      <p class="tagline">The world's first Xbox One compatibility layer for Windows.</p>

      <div class="actions" aria-label="Project actions">
        {#each links as link (link.label)}
          <a class={link.primary ? "action action--primary" : "action"} href={link.href}>
            <LinkIcon name={link.icon} />
            {link.label}
          </a>
        {/each}
      </div>

      <p class="note">Experimental. Community-built. Not affiliated with Microsoft.</p>
    </div>
  </section>
</main>
