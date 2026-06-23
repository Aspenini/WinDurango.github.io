<script lang="ts">
  export let name: "github" | "docs" | "discord" | "x" | "reddit" | "download";
</script>

<span
  class="link-icon"
  style="--icon: url('{import.meta.env.BASE_URL}assets/{name}.svg')"
  aria-hidden="true"
></span>
