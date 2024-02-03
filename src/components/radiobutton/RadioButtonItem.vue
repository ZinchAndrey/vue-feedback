<template>
  <label class="radio" :for="id">
    <input class="radio__input visually-hidden" type="radio" :value="value" :name="name" :id="id"
      @input="updateValue" :checked="checked">
    
    <span class="radio__symbol"></span>
    <span class="radio__title">
      {{ label }}
    </span>
  </label>
</template>

<script>
export default {
  emits: ['update:checkedValue'],
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    updateValue(evt) {
      // console.log(evt.target.value);
      this.$emit('update:checkedValue', evt.target.value);
    }
  }
}
</script>

<style lang="scss" scoped>
$main-theme-color: #4a3aff;

.radio {
  font-family: inherit;
  color: inherit;

  display: flex;
  align-items: center;
  padding: 40px 25px;
  border-radius: 16px;
  border: 2px solid var(--border-color);

  background: var(--alt-theme-color);
  cursor: pointer;

  &:hover {
    box-shadow: 0px 2px 6px 0px rgba(19, 18, 66, 0.07);
  }

  &__active,
  &:has(input:checked) {
    border: 2px solid var(--main-theme-color);
  }

  &__symbol {
    width: 25px;
    height: 25px;
    display: inline-block;
    border-radius: 50%;

    border: 1px solid var(--border-color);
  }

  input:checked + &__symbol {
    border: 7px solid var(--main-theme-color)
  }


  &__title {
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;

    margin-left: 12px;
  }

  @media (max-width: 768px) {
    padding: 22px 15px;
     
    &__title {
      font-size: 16px;
    }
  }
}
</style>