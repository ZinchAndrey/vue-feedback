<template>
  <div class="checkbox-group">
  <base-checkbox
    v-for="item in items" :key="item.id"
    :label="item.label"
    :iconSrc="item.iconSrc"
    :name="name"
    :value="item.value"
    :id="item.id"
    :checked="checkedItems.includes(item.value)"
    @updateCheckboxItem="updateCheckedItems"/>
    
    <span v-for="error of errors" :key="error.$uid" class="error-text">{{ error.$message }}</span>
  </div>

</template>

<script>
import BaseCheckbox from '@/components/UI/BaseCheckbox.vue'

export default {
  components: {
    BaseCheckbox,
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
    },
    errors: {
      type: Array,
      required: false,
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

<style lang="scss" scoped>
.checkbox-group {
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