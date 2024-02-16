<template>
  <form-base-screen class="screen--radio">
    <h2 class="screen__caption">
      What's your project budget?
    </h2>
    <p class="screen__sub">
      Please select the project budget range you have in mind.
    </p>
    <radio-button-group name="budget" :items="budgetItems" :checkedItem="selectedBudget"
      @update:checkedItem="setCurrentBudget"
      :errors="validationGroups.budget.$errors" />
  </form-base-screen>
</template>

<script>
import FormBaseScreen from './FormBaseScreen.vue';
import RadioButtonGroup from '@/components/radiobutton/RadioButtonGroup.vue';

export default {
  components: {
    FormBaseScreen,
    RadioButtonGroup
  },
  inject: ['budgetItems', 'selectedBudget', 'updateSelectedBudget', 'validationGroups'],
  methods: {
    setCurrentBudget(value) {
      this.updateSelectedBudget(value);
    }
  },
}

</script>

<style lang="scss" scoped></style>