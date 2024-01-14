<template>
  <button 
    :class="['btn', `btn--${color}`, {'btn--outline' : outline }]"
    :disabled="disabled"
    @click="onBtnClick">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Button'
    },
    color: {
      type: String,
      default: 'primary'
    },
    outline: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onBtnClick() {
      this.$emit('click-event');
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn {
    font-family: inherit;
    font-size: 18px;
    line-height: 120%;
    font-weight: 700;

    padding: 20px 40px;
    border: 1px solid;
    border-radius: 65px;

    cursor: pointer;

    background-color: #fff;
    transition: box-shadow ease-in 0.1s;
    box-shadow: 0px 3px 12px 0px rgba(74, 58, 255, 0.18);

    &:hover {
      box-shadow: 0px 3px 15px 0px rgba(74, 58, 255, 0.58);
    }

    &:focus,
    &:active {
      outline: none;
    }

    &--primary {
      color: var(--alt-btn-color);
      background-color: var(--main-btn-color);
      border-color: var(--main-btn-color);
    }

    &--outline {
      color: var(--main-btn-color);
      background-color: var(--alt-btn-color);
    }

    &:disabled {
      cursor: default;
      opacity: 0.1;
    }
  }
</style>