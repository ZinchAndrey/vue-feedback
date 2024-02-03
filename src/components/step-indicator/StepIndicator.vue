<template>
  <div class="step">
    <ul class="step__list">
      <li class="step__item">
        <span class="step__number">1</span>
        <div class="step__progress-bar">
          <div class="step__progress-bar-filled"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
}
</script>

<style lang="scss" scoped>
.step {
  font-size: 15px;
  line-height: 18px;
  font-weight: 500;

  padding: 30px;
  padding-top: 0;
  border-bottom: 1px solid var(--border-color);
  margin: 0 auto 60px;

  &__list {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: flex;
    align-items: center;
  }

  &__number {
    color: var(--sub-text-color);

    display: flex;
    justify-content: center;
    align-items: center;

    width: 34px;
    height: 34px;
    border-radius: 50%;

    background-color: var(--border-color);
  }

  &__progress-bar {
    margin: 0 18px;

    width: 98px;
    height: 6px;
    background-color: var(--border-color);
    border-radius: 40px;
    position: relative;
  }

  &__progress-bar-filled {
    width: 0;
    height: 100%;
    border-radius: 40px;
    background-color: var(--main-theme-color);
    
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>