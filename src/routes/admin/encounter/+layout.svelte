<a role="button" class="contrast icon" href="/admin">
  <iconify-icon icon="ep:back" inline> </iconify-icon>
</a>

<slot />

<style>
  a.contrast.icon {
    position: fixed;
    top: 1.3rem;
    left: 1.5rem;
    border-radius: 100%;
    background-color: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(1.1px);
    padding: calc(var(--pico-spacing) / 3.5) calc(var(--pico-spacing) / 1.75);
  }
</style>
