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
        type="text" 
        placeholder="Phone" 
        label="Phone" 
        iconSrc="/img/phone-icon.svg"
        maskValue="{+7} (000) 000-00-00"
        :errors="v$.phone.$errors"
        v-model="phone"
        @blur="v$.phone.$touch()"/>
      <!-- Маску и length наложить  -->
      <!-- https://vuejs-tips.github.io/vue-the-mask/  -->
      <!-- https://www.npmjs.com/package/vue-input-mask -->

      <base-input 
        type="text" 
        placeholder="Company" 
        label="Company" 
        v-model="company"
        iconSrc="/img/company-icon.svg"/>
    </div>

    <base-button type="submit" label="Отправить" />
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, email, minLength } from '@vuelidate/validators'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      company: ''
    }
  },
  validations() {
    return {
      name: { required: helpers.withMessage('Введите имя', required) },
      email: { 
        required: helpers.withMessage('Введите email', required),
        email: helpers.withMessage('Введите корректный email', email),
        $lazy: true
      },
      phone: {
        required: helpers.withMessage('Введите номер', required),
        minLength:helpers.withMessage('Введите номер в указанном формате', minLength(18))
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