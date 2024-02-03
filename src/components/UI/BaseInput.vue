<template>
  <div class="input__wrapper">
    {{ label }}
    <label class="input__label">
   
      <input 
        class="input" :class="{'input--error': errors && !!errors.length}" 
        :type="type" 
        :placeholder="placeholder"
        :value="modelValue"
        v-imask="maskValue ? mask : ''"
        @input="updateValue"
        @blur="blurField">

      <span v-for="error of errors" :key="error.$uid" class="input__error-text">{{ error.$message }}</span>
      <inline-svg class="input__icon" :src="iconSrc" />
    </label>
  </div>
</template>

<script>
import { IMaskDirective } from 'vue-imask';

export default {
  emits: ['update:modelValue', 'blur'],
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
    errors: {
      type: Array,
      required: false,
    },
    modelValue: {
      type: String,
      default: ''
    },
    maskValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      mask: {
        mask: this.maskValue,
        lazy: true
        },
    }
  },
  methods: {
    updateValue(evt) {
      this.$emit('update:modelValue', evt.target.value);
    },
    blurField() {
      this.$emit('blur');
    },
  },
  directives: {
    imask: IMaskDirective
  }
}
</script>

<style lang="scss" scoped>
.input__wrapper {
  font-size: 18px;
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
    outline: none;
  }

  &:not(&--error):focus {
    border-color: var(--main-theme-color);
  }

  &--error {
    border-color: var(--error-color);
  }
  &__icon {
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translate(50%, -50%);
  }
  
  &__error-text:nth-child(n) {
    font-size: 12px;
    line-height: 120%;
    color: var(--error-color);
  
    position: absolute;
    left: 20px;
    bottom: 0;
    transform: translateY(calc(100% + 5px));
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 15px 40px 15px 15px;
    border-radius: 25px;

    &__wrapper {
      font-size: 16px;
      text-align: left;
    }
    
    &__label {
      font-size: 16px;
      margin-top: 10px;
    }

    &__icon {
      right: 30px;
    }
  }
}

.input__error-text + .input__error-text {
  transform: translateY(calc(200% + 5px))
}
</style>