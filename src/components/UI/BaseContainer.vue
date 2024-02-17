<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  overflow: hidden;
  border-radius: 34px;
  border: 1px solid var(--border-color);
  background: var(--alt-theme-color);

  box-shadow: 0px 5px 16px 0px rgba(8, 15, 52, 0.06);

  margin: 0 auto;
  max-width: 700px;
  width: 100%;
  padding: 55px;
}

@media (max-width: 768px) {
  .container {
    padding: 25px 20px;
    border-radius: 20px;
  }
}
</style>