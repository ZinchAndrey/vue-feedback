<template>
  <div class="screen">
    <slot name="screen-icon"></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    caption: {
      type: String,
      default: ''
    },
    sub: {
      type: String,
      default: ''
    },
  }
}
</script>

<style lang="scss">
.screen {
  position: relative;

  // &__wrapper {
  //   display: grid;
  //   grid-template-columns: 1fr 1fr;
  //   gap: 45px 30px;
  //   margin: 0 auto;
  // }

  &__caption {
    font-size: 24px;
    line-height: 35px;

    margin: 0 0 8px;
  }

  &__sub {
    font-size: 18px;
    line-height: 30px;
    color: var(--sub-text-color);

    margin: 0 0 35px;
  }
}

@media (max-width: 768px) {
  .screen {
    // &__wrapper {
    //   grid-template-columns: 1fr;
    //   gap: 30px 20px;
    //   margin: 0 auto;
    //   text-align: center;
    // }

    &__caption {
      font-size: 18px;
      line-height: 30px;
      margin: 0 0 8px;
    }

    &__sub {
      font-size: 16px;
      line-height: 20px;
      color: var(--sub-text-color);

      margin: 0 0 25px;
    }
  }
}
</style>