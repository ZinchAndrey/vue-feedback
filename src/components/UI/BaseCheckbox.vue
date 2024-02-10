<template>
  <label class="checkbox" :for="id">
    <input class="checkbox__input visually-hidden" type="checkbox" :value="value" :name="name" :id="id"
      @input="updateValue" :checked="checked">
    <div class="checkbox__icon-wrapper">
      <inline-svg class="checkbox__icon" :src="imgSrc" />

    </div>
    <span class="checkbox__title">
      {{ label }}
    </span>
  </label>
</template>

<script>
import { getImageURL } from '@/utils.js';

export default {
  emits: ['update:checked', 'updateCheckboxItem'],
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
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
    id: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    imgSrc() {
      return getImageURL(this.iconSrc);
    }
  },
    methods: {
      updateValue(evt) {
        this.$emit('updateCheckboxItem',
          {
            id: this.id,
            value: this.value,
            checked: evt.target.checked
          }
        );

        // это если не чекбокс групп, а просто чекбокс 
        // this.$emit('update:checked', evt.target.checked);
      }
    }
  }
</script>

<style lang="scss" scoped>
$main-theme-color: #4a3aff;

.checkbox {
  font-family: inherit;
  color: inherit;

  display: flex;
  align-items: center;
  padding: 20px 25px;
  border-radius: 16px;
  border: 2px solid var(--border-color);

  background: var(--alt-theme-color);
  cursor: pointer;

  &:hover {
    box-shadow: 0px 2px 6px 0px rgba(19, 18, 66, 0.07);
  }

  &:has(input:checked) {
    border: 2px solid var(--main-theme-color);
  }

  &__icon-wrapper {
    width: 65px;
    height: 65px;
    display: flex;
    border-radius: 50%;
    background: rgba($main-theme-color, 0.15);
    box-shadow: 0px 0px 10px 0px rgba(74, 58, 255, 0.50);

  }

  &__icon {
    margin: auto;
  }

  &__title {
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;

    margin-left: 12px;
  }

  @media (max-width: 768px) {
    padding: 15px 15px;

    &__icon-wrapper {
      width: 40px;
      height: 40px;
    }

    &__icon {
      width: 25px;
      height: auto;
    }

    &__title {
      font-size: 16px;
    }
  }
}
</style>