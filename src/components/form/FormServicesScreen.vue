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
      :checkedItems="checkedItems"
      @update:checkedItems="setCurrentServices"
      :errors="v$.$errors" />
  </form-base-screen>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import FormBaseScreen from './FormBaseScreen.vue';
import CheckboxGroup from '@/components/checkbox/CheckboxGroup.vue';


export default {
  components: {
    FormBaseScreen,
    CheckboxGroup
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      checkedItems: {
        required: helpers.withMessage('Select at least one item', required),
      },
    }
  },
  inject: ['serviceItems', 'selectedServiceItems', 'updateSelectedServices', 'updateCurrentScreenValidity'],
  data() {
    return {
      checkedItems: this.selectedServiceItems,
    }
  },
  computed: {
    isValid() {
      return !this.v$.$invalid;
    }
  },
  methods: {
    setCurrentServices(value) {
      console.log(value);
      this.checkedItems = value;
      this.v$.$touch();
    },
    checkValidity() {
      console.log('test');
      this.v$.$touch();

      if (!this.isValid) {
        return;
      }

      this.updateSelectedServices(this.checkedItems);
      this.updateCurrentScreenValidity(this.isValid);
    }
  }
}
</script>

<style lang="scss" scoped></style>
