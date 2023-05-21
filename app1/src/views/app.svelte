<script lang="ts" context="module">
  import loadComponent from '../utils/load-component';
</script>

<script lang="ts">
  let showHeader = false;
  $: if (showHeader) {
    loadComponent('app2', './Header').then((module: any) => {
      const Header = module.default;
      new Header({
        target: document.body,
      });
    });
  }
</script>

<div class="app1">
  <div class="container">
    <div>☀️ First app</div>
  </div>
  <button
    on:click|once={() => {
      showHeader = true;
    }}>Show header from second app</button
  >
</div>

<style lang="scss">
  .app1 {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .container {
    display: flex;
    align-items: center;
    width: 200px;
    height: 40px;
    font-size: 30px;
    border-radius: 10px;
    padding: 16px;
    border: 1px solid burlywood;
  }
  button {
    border-radius: 4px;
    border: 0;
    color: white;
    padding: 8px 12px;
    font-size: 16px;
    background: green;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
  :global(body) {
    display: flex;
    gap: 16px;
  }
</style>
