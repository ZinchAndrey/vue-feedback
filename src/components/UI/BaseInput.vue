<template>
  <div class="input__wrapper">
    {{ label }}
    <label class="input__label">
      <input class="input" 
        :type="type" 
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue">
      <span class="input__error">{{ error }}</span>
      <inline-svg class="input__icon" :src="iconSrc" />
    </label>
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    iconSrc: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: 'Заполните поле'
    },
    modelValue: {
      type: String,
      default: ''
    }
    // функция валидации 
  },
  data() {
    return {
    }
  },
  methods: {
    updateValue(evt) {
      this.$emit('update:modelValue', evt.target.value);
    }
  }
}
</script>

<style lang="scss" scoped>
.input__wrapper {
  position: relative;
}

.input__label {
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: var(--text-color);

  position: relative;
  display: flex;
  margin-top: 18px;
}

.input {
  font-family: inherit;
  font-size: 18px;
  line-height: 120%;
  color: inherit;

  padding: 20px 50px 20px 20px;
  border-radius: 46px;
  border: 1px solid var(--border-color);
  box-shadow: 0px 2px 6px 0px rgba(19, 18, 66, 0.07);

  width: 100%;

  &:hover,
  &:focus {
    box-shadow: 0px 2px 6px 0px rgba(19, 18, 66, 0.3);
  }

  &:focus {
    border-color: var(--main-theme-color);
    outline: none;
  }
}

.input__icon {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translate(50%, -50%);
}

.input__error {
  font-size: 12px;
  line-height: 120%;
  color: var(--error-color);

  position: absolute;
  left: 20px;
  bottom: 0;
  transform: translateY(calc(100% + 5px));
}
</style>