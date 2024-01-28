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

  <div class="form__wrapper">
    <checkbox-group
      name="service"
      :items="serviceItems"
      v-model:checkedItems="selectedServiceItems"/>
      <!-- <checkbox-item
        value="Test"
        name="Test name"
        id="01"
        label="Test"
        v-model:checked="checkboxActive"/>
        {{ checkboxActive }} -->
  </div>
</template>

<script>
import CheckboxGroup from '@/components/checkbox/CheckboxGroup.vue'
// import CheckboxItem from '@/components/checkbox/CheckboxItem.vue'

import { useVuelidate } from '@vuelidate/core'
import { required, helpers, email, minLength } from '@vuelidate/validators'

export default {
  components: {
    // CheckboxItem
    CheckboxGroup
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      currentScreenIndex: 0,
      name: '',
      email: '',
      phone: '',
      company: '',
      selectedServiceItems: ['development'],
      serviceItems: [
        {
          label: 'Development',
          iconSrc: '/img/development-icon.svg',
          value: 'development',
          id: 's1',
          isCheckboxActive: false,
        },
        {
          label: 'Web Design',
          iconSrc: '/img/web-design-icon.svg',
          value: 'web design',
          id: 's2',
          isCheckboxActive: false,
        },
        {
          label: 'Marketing',
          iconSrc: '/img/marketing-icon.svg',
          value: 'marketing',
          id: 's3',
          isCheckboxActive: false,
        },
        {
          label: 'Other',
          iconSrc: '/img/other-icon.svg',
          value: 'other',
          id: 's4',
          isCheckboxActive: false,
        },
      ],
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
    setNextScreen() {
      this.currentScreenIndex += 1;
    },
    setPrevScreen() {
      if (this.currentScreenIndex > 0) {
        this.currentScreenIndex -= 1;
      }
    },
    submitForm() {
      this.setNextScreen();
      this.v$.$touch()
      // console.log(this.v$);
      if (this.v$.$invalid) {
        return
      }

      const { name, email, phone, company } = this;
      console.log(name, email, phone, company);
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 45px 30px;
    margin-bottom: 50px;
  }
}
</style>