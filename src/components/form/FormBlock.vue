<template>
  <form class="form" @submit.prevent="submitForm">
    <h2>Форма</h2>

    <div class="form__wrapper">
      <base-input 
        type="text" 
        placeholder="Name" 
        label="Name" 
        iconSrc="/img/name-icon.svg" 
        :errors="v$.name.$errors"
        v-model="v$.name.$model" />

      <base-input type="email" placeholder="Email" label="Email" iconSrc="/img/email-icon.svg"
        error="Enter valid email" />
      <base-input type="text" placeholder="Phone" label="Phone" iconSrc="/img/phone-icon.svg" error="Enter your phone" />
      <base-input type="text" placeholder="Company" label="Company" iconSrc="/img/company-icon.svg"
        error="Enter company name" />
    </div>

    <base-button type="submit" label="Отправить" />
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      name: ''
    }
  },
  validations() {
    return {
      name: { required: helpers.withMessage('Введите имя', required) }
    }
  },
  methods: {
    submitForm() {
      console.log(this.v$);
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  &__wrapper {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 45px 30px;
    margin-bottom: 50px;
  }
}
</style>