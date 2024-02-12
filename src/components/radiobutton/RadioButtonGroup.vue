<template>
  <div class="radiobutton-group">
    <base-radio-button
      v-for="item in items"
      :label="item.label"
      :value="item.value"
      :key="item.id"
      :id="item.id"
      :name="name"
      :checked="checkedItem === item.value"
      v-model:checkedValue="currentCheckedItem"/>
      
      <span v-for="error of errors" :key="error.$uid" class="error-text">{{ error.$message }}</span>
  </div>
</template>

<script>
import BaseRadioButton from '@/components/UI/BaseRadioButton.vue';

export default {
  components: {
    BaseRadioButton,
  },
  emits: ['update:checkedItem'],
  props: {
    items: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    checkedItem: {
      type: String,
      default: ''
    },
    errors: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      currentCheckedItem: this.checkedItem
    }
  },
  watch: {
    currentCheckedItem(value) {
      this.$emit('update:checkedItem', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.radiobutton-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 25px;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px 20px;
  }
}

.error-text:nth-child(n) {
  font-size: 12px;
  line-height: 120%;
  color: var(--error-color);

  position: absolute;
  left: 0;
  bottom: 0;
  transform: translateY(calc(100% + 5px));
}

.error-text + .error-text {
  transform: translateY(calc(200% + 5px))
}
</style>