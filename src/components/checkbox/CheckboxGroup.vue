<template>
  <checkbox-item
    v-for="item in items" :key="item.id"
    :label="item.label"
    :iconSrc="item.iconSrc"
    :name="name"
    :value="item.value"
    :id="item.id"
    :checked="checkedItems.includes(item.value)"/>
</template>

<script>
import CheckboxItem from '@/components/checkbox/CheckboxItem.vue'

export default {
  components: {
    CheckboxItem,
  },
  emits: ['update:checkedItems'],
  props: {
    items: {
      type: Array,
      required: true,
    },
    checkedItems: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
    }
  }
}
</script>