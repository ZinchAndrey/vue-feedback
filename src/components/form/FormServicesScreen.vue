<template>
  <form-base-screen class="screen--checkboxes">
    <h2 class="screen__caption">
      Our services
    </h2>
    <p class="screen__sub">
      Please select which service you are interested in.
    </p>

    <checkbox-group name="service" 
      :items="serviceItems" 
      :checkedItems="selectedServiceItems"
      @update:checkedItems="updateSelectedServices"
      :errors="validationGroups.services.$errors" />
  </form-base-screen>
</template>

<script>
import FormBaseScreen from './FormBaseScreen.vue';
import CheckboxGroup from '@/components/checkbox/CheckboxGroup.vue';


export default {
  components: {
    FormBaseScreen,
    CheckboxGroup
  },
  inject: ['serviceItems', 'selectedServiceItems', 'updateSelectedServices', 'validationGroups'],
  methods: {
    setCurrentServices(value) {
      this.updateSelectedServices(value);
    }
  }
}
</script>

<style lang="scss" scoped></style>
