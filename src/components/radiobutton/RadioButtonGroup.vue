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
  margin-bottom: 50px;
}
</style>