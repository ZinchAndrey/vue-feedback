<template>
  <form class="form" @submit.prevent="submitForm">
    <div class="form__header">
      <h1 class="form__caption">Get a project quote</h1>
      <p class="form__sub">
        Please fill the form below to receive a quote for your project. Feel free to add as much detail as needed.
      </p>
    </div>

    <base-container>
      <div v-if="currentScreenIndex === 1" class="form__screen screen screen--inputs">
        <h2 class="screen__caption">
          Contact details
        </h2>
        <p class="screen__sub">
          Lorem ipsum dolor sit amet consectetur adipisc.
        </p>
        <div class="screen__wrapper">
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
      </div>

      <div v-else-if="currentScreenIndex === 2" class="form__screen screen screen--checkboxes">
        <h2 class="screen__caption">
          Our services
        </h2>
        <p class="screen__sub">
          Please select which service you are interested in.
        </p>

        <checkbox-group
          name="service"
          :items="serviceItems"
          v-model:checkedItems="selectedServiceItems"
          :errors="v$.selectedServiceItems.$errors"/>
      </div>
      
      <div v-else-if="currentScreenIndex === 3" class="form__screen screen screen--radio">
        <h2 class="screen__caption">
          What's your project budget?
        </h2>
        <p class="screen__sub">
          Please select the project budget range you have in mind.
        </p>

        <radio-button-group
          name="budget"
          :items="budgetItems"
          @updateCheckedValue="updateSelectedBudget"
          :errors="v$.selectedBudget.$errors"/>
      </div>

      <div v-else-if="currentScreenIndex === 4" class="form__screen screen screen--success">
        <inline-svg class="screen__icon-success" src="/img/success-icon.svg"/>
        <h2 class="screen__caption">
          Submit your quote request
        </h2>
        <p class="screen__sub">
          Please review all the information you previously typed in the past steps, and if all is okay, submit your message to receive a project quote in 24 - 48 hours.      </p>
        <base-button 
          class="button"
          label="Submit"
          type="submit"/>
        </div>
    </base-container>

    <div class="form__buttons buttons">
      <base-button v-if="currentScreenIndex > 1" 
        class="button button--left"
        type="button" 
        label="Previous step" 
        :outline="true"
        @click="setPrevScreen"/>
      <base-button v-if="currentScreenIndex < SCREENS_COUNT" 
        class="button button--right"
        type="button" 
        label="Next step"
        @click="setNextScreen"/>
    </div>
  </form>

</template>

<script>
import CheckboxGroup from '@/components/checkbox/CheckboxGroup.vue'
import RadioButtonGroup from '@/components/radiobutton/RadioButtonGroup.vue'

import { useVuelidate } from '@vuelidate/core'
import { required, helpers, email, minLength } from '@vuelidate/validators'

export default {
  components: {
    CheckboxGroup,
    RadioButtonGroup,
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      SCREENS_COUNT: 4,
      currentScreenIndex: 1,
      name: '',
      email: '',
      phone: '',
      company: '',
      selectedServiceItems: [],
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
      selectedBudget: '',
      budgetItems: [
        {
          label: '$5.000 - $10.000',
          value: '5000-10000',
          id: 'b1'
        },
        {
          label: '$10.000 - $20.000',
          value: '10000-20000',
          id: 'b2'
        },
        {
          label: '$20.000 - $50.000',
          value: '20000-50000',
          id: 'b3'
        },
        {
          label: '$50.000 +',
          value: '50000+',
          id: 'b4'
        },
      ]
    }
  },
  computed: {
    isValid() {
      return !(this.currentScreenIndex === 1 && this.v$.$validationGroups.contacts.$invalid)
       && !(this.currentScreenIndex === 2 && this.v$.$validationGroups.services.$invalid)
       && !(this.currentScreenIndex === 3 && this.v$.$validationGroups.budget.$invalid);
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
        minLength: helpers.withMessage('Введите номер в указанном формате', minLength(18))
      },
      selectedServiceItems: {
        required: helpers.withMessage('Выберите хотя бы один пункт', required),
      },
      selectedBudget: {
        required: helpers.withMessage('Выберите один пункт', required),
      },
      $validationGroups: {
        contacts: ['name', 'email', 'phone'],
        services: ['selectedServiceItems'],
        budget: ['selectedBudget']
      }
    }
  },
  methods: {
    setNextScreen() {
      this.v$.$touch();

      if (!this.isValid) {
        return;
      }


      // Это чтобы на след экране не было ошибок сразу при показе 
      this.v$.$reset();
      this.currentScreenIndex += 1;
    },
    setPrevScreen() {
      if (this.currentScreenIndex > 1) {
        this.currentScreenIndex -= 1;
      }
    },
    updateSelectedBudget(value) {
      this.selectedBudget = value
    },
    submitForm() {
      // записывать данные в LS и выводить сообщение об успехе 
      // можно более удобную структуру данных сделать в виде объекта 
      // const { name, email, phone, company } = this;
      // console.log(name, email, phone, company);
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  &__header {
    text-align: center;
    margin: 0 auto;
    padding: 0 55px;
  }

  &__caption {
    font-size: 34px;
    line-height: 135%;

    margin: 0 auto 12px;
  }

  &__sub {
    font-size: 18px;
    line-height: 150%;
    color: var(--sub-text-color);

    margin: 0 auto 40px;
  }
}

.screen {
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 45px 30px;
    margin: 0 auto;
  }

  &__caption {
    font-size: 24px;
    line-height: 35px;

    margin: 0 0 8px;
  }

  &__sub {
    font-size: 18px;
    line-height: 30px;
    color: var(--sub-text-color);

    margin: 0 0 35px;
  }

  &--success {
    text-align: center;
  }

  &__icon-success {
    margin: 0 auto 18px;
  }
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 30px;
}

.button {
  margin: 0 auto;

  &--left {
    margin: 0;
  }

  &--right {
    margin: 0 0 0 auto;
  }
}
</style>