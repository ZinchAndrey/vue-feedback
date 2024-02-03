<template>
  <div class="step">
    <ul class="step__list">
      <li v-for="(n) in stepsCount" :key="n"
        class="step__item"
        :class="{'step__item--filled': n <= currentStep, 'step__item--current': n === currentStep}">
        <span class="step__number">{{ n }}</span>
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
    currentStep: {
      type: Number,
      default: 1
    },
    stepsCount: {
      type: Number,
      default: 1
    },
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
  margin: 0 auto 40px;

  &__list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    flex-grow: 1;
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

  &__item:last-child {
    flex-grow: initial;
  }
  &__item:last-child .step__progress-bar {
    display: none;
  }

  &__progress-bar {
    margin: 0 18px;

    flex-grow: 1;
    width: auto;
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
    // transition: width ease-in 0.3s;
  }

  &__item--filled {
    .step__number {
      color: var(--alt-text-color);
      background-color: var(--main-theme-color);
    }

    .step__progress-bar-filled {
      width: 100%;
    }
  }

  &__item--current {
    .step__number {
      color: var(--alt-text-color);
      background-color: var(--main-theme-color);
    }

    .step__progress-bar-filled {
      width: 50%;
    }
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 20px 0px;

    &__number {
      width: 25px;
      height: 25px;
    }

    &__progress-bar {
      margin: 0 5px;
    }
  }
}
</style>