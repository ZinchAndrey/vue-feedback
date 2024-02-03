<template>
  <div class="radiobutton-group">
    <radio-button-item
      v-for="item in items"
      :label="item.label"
      :value="item.value"
      :key="item.id"
      :id="item.id"
      :name="name"
      v-model:checkedValue="currentCheckedItem"/>
      
      <span v-for="error of errors" :key="error.$uid" class="error-text">{{ error.$message }}</span>
  </div>
</template>

<script>
import RadioButtonItem from './RadioButtonItem.vue';

export default {
  components: {
    RadioButtonItem,
  },
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
      this.$emit('updateCheckedValue', value)
    }
  }
}
</script>

<style scoped>
.radiobutton-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 25px;
  position: relative;
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