<template>
  <div class="checkbox-group">
  <checkbox-item
    v-for="item in items" :key="item.id"
    :label="item.label"
    :iconSrc="item.iconSrc"
    :name="name"
    :value="item.value"
    :id="item.id"
    :checked="checkedItems.includes(item.value)"
    @updateCheckboxItem="updateCheckedItems"/>
  </div>

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
  },
  methods: {
    updateCheckedItems(itemData) {
      const checkedItems = [...this.checkedItems];

      if (itemData.checked) {
        checkedItems.push(itemData.value);
      } else {
        checkedItems.splice(checkedItems.indexOf(itemData.value), 1);
      }

      this.$emit('update:checkedItems', checkedItems);
    }
  }
}
</script>

<style scoped>
.checkbox-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 25px;
}
</style>