<template>
  <form class="form" @submit.prevent="submitForm">
    <div class="form__header">
      <h1 class="form__caption">Get a project quote</h1>
      <p class="form__sub">
        Please fill the form below to receive a quote for your project. Feel free to add as much detail as needed.
      </p>
    </div>

    <base-container>
      <step-indicator :currentStep="currentScreenIndex" :stepsCount="SCREENS_COUNT" />

      <transition :name="isStraightDirection ? 'slide' : 'slide--back'" mode="out-in">
        <form-contacts-screen v-if="currentScreenIndex === 1" data-screen="contactsScreen" ref="contactsScreen"/>
        <form-services-screen v-else-if="currentScreenIndex === 2" data-screen="servicesScreen" ref="servicesScreen"/>
        <form-budget-screen v-else-if="currentScreenIndex === 3" data-screen="budgetScreen" ref="budgetScreen"/>
        <form-success-screen v-else-if="currentScreenIndex === 4" data-screen="successScreen" ref="successScreen"/>
      </transition>

    </base-container>

    <div class="form__buttons buttons">
      <base-button v-if="currentScreenIndex > 1" class="button button--left" type="button" label="Previous step"
        :outline="true" @click="setPrevScreen" />
      <base-button v-if="currentScreenIndex < SCREENS_COUNT" class="button button--right" type="button" label="Next step"
        @click="setNextScreen" />
    </div>
  </form>
</template>

<script>
import { computed } from 'vue'
import StepIndicator from '@/components/step-indicator/StepIndicator.vue'
import FormSuccessScreen from '@/components/form/FormSuccessScreen.vue'
import FormBudgetScreen from '@/components/form/FormBudgetScreen.vue'
import FormServicesScreen from '@/components/form/FormServicesScreen.vue'
import FormContactsScreen from '@/components/form/FormContactsScreen.vue'

import { useVuelidate } from '@vuelidate/core'
import { required, helpers, email, minLength } from '@vuelidate/validators'

export default {
  components: {
    StepIndicator,
    FormSuccessScreen,
    FormBudgetScreen,
    FormServicesScreen,
    FormContactsScreen
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      SCREENS_COUNT: 4,
      currentScreenIndex: 2,

      name: '',
      email: '',
      phone: '',
      company: '',
      selectedServiceItems: [],
      selectedBudget: '',

      serviceItems: [
        {
          label: 'Development',
          iconSrc: 'icons/development-icon.svg',
          value: 'development',
          id: 's1',
          isCheckboxActive: false,
        },
        {
          label: 'Web Design',
          iconSrc: 'icons/web-design-icon.svg',
          value: 'web design',
          id: 's2',
          isCheckboxActive: false,
        },
        {
          label: 'Marketing',
          iconSrc: 'icons/marketing-icon.svg',
          value: 'marketing',
          id: 's3',
          isCheckboxActive: false,
        },
        {
          label: 'Other',
          iconSrc: 'icons/other-icon.svg',
          value: 'other',
          id: 's4',
          isCheckboxActive: false,
        },
      ],
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
      ],

      isSubmitted: false,
      isStraightDirection: true,
      isCurrentScreenValid: false,
    }
  },
  provide() {
    return {
      budgetItems: this.budgetItems,
      selectedBudget: computed(() => this.selectedBudget),
      validationGroups: computed(() => this.v$.$validationGroups),
      updateSelectedBudget: this.updateSelectedBudget,
      
      serviceItems: this.serviceItems,
      selectedServiceItems: computed(() => this.selectedServiceItems),
      updateSelectedServices: this.updateSelectedServices,
      
      updateCurrentScreenValidity: this.updateCurrentScreenValidity,

      name: computed(() => this.name),
      email: computed(() => this.email),
      phone: computed(() => this.phone),
      company: computed(() => this.company),
      updateFieldValue: this.updateFieldValue,
      vTouchForm: this.vTouchForm,
    }
  },
  computed: {
    isValid() {
      return !(this.currentScreenIndex === 1 && this.v$.$validationGroups.contacts.$invalid)
        && !(this.currentScreenIndex === 2 && this.v$.$validationGroups.services.$invalid)
        && !(this.currentScreenIndex === 3 && this.v$.$validationGroups.budget.$invalid);
    },
  },
  validations() {
    return {
      name: { required: helpers.withMessage('Enter your name', required) },
      email: {
        required: helpers.withMessage('Enter your email', required),
        email: helpers.withMessage('Enter email in a correct format', email),
        $lazy: true
      },
      phone: {
        required: helpers.withMessage('Enter your phone number', required),
        minLength: helpers.withMessage('Phone number should be in a specified format', minLength(18))
      },
      selectedServiceItems: {
        required: helpers.withMessage('Select at least one item', required),
      },
      selectedBudget: {
        required: helpers.withMessage('Select your budget', required),
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
      const currentScreenNode = document.querySelector('[data-screen]');
      const currentScreenName = currentScreenNode && currentScreenNode.dataset.screen;

      if (!currentScreenName) {
        return;
      }

      this.$refs[currentScreenName].checkValidity();

      // console.log(this.selectedBudget);
      if (!this.isCurrentScreenValid) {
        return;
      }

      this.isStraightDirection = true;
      this.currentScreenIndex += 1;
      this.isCurrentScreenValid = false;

      // this.v$.$touch();
      // if (!this.isValid) {
      //   return;
      // }

      // // Это чтобы на след экране не было ошибок сразу при показе 
      // this.v$.$reset();
      // this.isStraightDirection = true;
      // this.currentScreenIndex += 1;
    },
    setPrevScreen() {
      if (this.currentScreenIndex > 1) {
        this.isStraightDirection = false;
        this.currentScreenIndex -= 1;
      }
    },
    updateSelectedBudget(value) {
      this.selectedBudget = value;
    },
    updateSelectedServices(value) {
      this.selectedServiceItems = value;
    },
    updateFieldValue(value, field) {
      this[field] = value;
    },
    updateCurrentScreenValidity(value) {
      this.isCurrentScreenValid = value;
    },
    vTouchForm(valueName) {
      this.v$[valueName] && this.v$[valueName].$touch();
    },
    submitForm() {
      const userData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        company: this.company,
        selectedServiceItems: [...this.selectedServiceItems],
        selectedBudget: this.selectedBudget,
      };

      console.log(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
      this.isSubmitted = true;
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

@media (max-width: 768px) {
  .form {
    &__header {
      padding: 0 35px;
    }

    &__caption {
      font-size: 24px;
    }

    &__sub {
      font-size: 16px;
      margin: 0 auto 30px;
    }
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

/* SLIDE */
.slide-enter-to,
.slide-leave-from,
.slide--back-enter-to,
.slide--back-leave-from {
  opacity: 1;
  transform: translateX(0);
  position: relative;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(500px);
}
.slide--back-enter-from {
  opacity: 0;
  transform: translateX(-500px);
}

.slide-leave-to {
  opacity: 1;
  transform: translateX(-500px);
}
.slide--back-leave-to {
  opacity: 1;
  transform: translateX(500px);
}

.slide-enter-active,
.slide-leave-active,
.slide--back-enter-active,
.slide--back-leave-active {
  transition: all 0.3s ease-in;
}
</style>