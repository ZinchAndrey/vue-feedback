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
        v-model="name"
        @blur="v$.name.$touch()" />

      <base-input 
        type="email" 
        placeholder="Email" 
        label="Email" 
        iconSrc="/img/email-icon.svg"
        :errors="v$.email.$errors"
        v-model="email"
        @blur="v$.email.$touch()"/>
        <!-- v$.email.$model  -->
        <!-- тут намеренно не использую $model, так как хочу по blur валидировать -->

      <base-input 
        type="tel" 
        placeholder="Phone" 
        label="Phone" 
        iconSrc="/img/phone-icon.svg" />
      <!-- Маску и length наложить  -->
      <!-- https://vuejs-tips.github.io/vue-the-mask/  -->
      <!-- https://www.npmjs.com/package/vue-input-mask -->

      <base-input 
        type="text" 
        placeholder="Company" 
        label="Company" 
        iconSrc="/img/company-icon.svg"/>
    </div>

    <base-button type="submit" label="Отправить" />
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, email } from '@vuelidate/validators'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      name: '',
      email: '',
    }
  },
  validations() {
    return {
      name: { required: helpers.withMessage('Введите имя', required) },
      email: { 
        required: helpers.withMessage('Введите email', required),
        email: helpers.withMessage('Введите корректный email', email),
        $lazy: true
      }
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