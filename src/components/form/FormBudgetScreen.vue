<template>
  <form-base-screen class="screen--radio">
    <h2 class="screen__caption">
      What's your project budget?
    </h2>
    <p class="screen__sub">
      Please select the project budget range you have in mind.
    </p>
    <radio-button-group name="budget" :items="budgetItems" :checkedItem="checkedItem"
      @update:checkedItem="setCurrentBudget"
      :errors="v$.$errors" />
  </form-base-screen>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';


import FormBaseScreen from './FormBaseScreen.vue';
import RadioButtonGroup from '@/components/radiobutton/RadioButtonGroup.vue';

export default {
  components: {
    FormBaseScreen,
    RadioButtonGroup
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      checkedItem: {
        required: helpers.withMessage('Select your budget', required),
      },
    }
  },
  inject: ['budgetItems', 'updateSelectedBudget', 'updateCurrentScreenValidity', 'selectedBudget'],
  data () {
    return {
      checkedItem: this.selectedBudget,
    }
  },
  computed: {
    isValid() {
      return !this.v$.$invalid;
    }
  },
  methods: {
    setCurrentBudget(value) {
      this.checkedItem = value;
      this.v$.$touch();
    },
    checkValidity() {
      console.log('test');
      this.v$.$touch();

      if (!this.isValid) {
        return;
      }

      this.updateSelectedBudget(this.checkedItem);
      this.updateCurrentScreenValidity(this.isValid);
    }
  },
}

</script>

<style lang="scss" scoped></style>