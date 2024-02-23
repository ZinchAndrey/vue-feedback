<template>
  <div>
    <h2 class="screen__caption">
      Contact details
    </h2>
    <p class="screen__sub">
      Please enter your contacts data.
    </p>
    <div class="screen__wrapper">
      <base-input
        type="text"
        placeholder="Name"
        label="Name"
        iconSrc="icons/name-icon.svg"
        fieldName="name"
        :error="v$.$errors.find(item => item.$property === 'name')"
        :modelValue="name"
        @update:modelValue="setCurrentFieldValue"
        @blur="validateField" />
      <base-input
        type="email"
        placeholder="Email"
        label="Email"
        iconSrc="icons/email-icon.svg"
        fieldName="email"
        :error="v$.$errors.find(item => item.$property === 'email')"
        :modelValue="email"
        @update:modelValue="setCurrentFieldValue"
        @blur="validateField" />
      <!-- тут намеренно не использую $model, так как хочу по blur валидировать -->
    
      <base-input
        type="text"
        placeholder="Phone"
        label="Phone"
        iconSrc="icons/phone-icon.svg"
        fieldName="phone"
        maskValue="{+7} (000) 000-00-00"
        :error="v$.$errors.find(item => item.$property === 'phone')"
        :modelValue="phone"
        @update:modelValue="setCurrentFieldValue"
        @blur="validateField" />
    
      <base-input
        type="text"
        placeholder="Company"
        label="Company"
        iconSrc="icons/company-icon.svg"
        fieldName="company"
        :modelValue="company"
        @update:modelValue="setCurrentFieldValue" />
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, email, minLength } from '@vuelidate/validators'

export default {
  setup() {
    return { v$: useVuelidate() }
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
      }
    }
  },
  // inject: ['name', 'email', 'phone', 'company', 'validationGroups', 'updateFieldValue', 'vTouchForm'],
  // inject: ['name', 'email', 'phone', 'company'],
  inject: [ 'userName', 'userEmail', 'userPhone', 'userCompany', 'updateCurrentScreenValidity', 'updateUserFieldValue'],
  data() {
    return {
      name: this.userName,
      email: this.userEmail,
      phone: this.userPhone,
      company: this.userCompany
    }
  },
  computed: {
    isValid() {
      return !this.v$.$invalid;
    }
  },
  methods: {
    updateFieldValue(value, field) {
      this[field] = value;
    },
    setCurrentFieldValue(value, name) {
      this.updateFieldValue(value, name)
    },
    validateField(evt) {
      this.v$[evt.target.name] && this.v$[evt.target.name].$touch();
    },
    checkValidity() {
      this.v$.$touch();

      if (!this.isValid) {
        return;
      }

      this.updateUserFieldValue(this.name, 'name');
      this.updateUserFieldValue(this.email, 'email');
      this.updateUserFieldValue(this.phone, 'phone');
      this.updateUserFieldValue(this.company, 'company');
      this.updateCurrentScreenValidity(this.isValid);
    }
  }
}
</script>


<style scoped lang="scss">
.screen {
  position: relative;

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 45px 30px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .screen {
    &__wrapper {
      grid-template-columns: 1fr;
      gap: 25px;
    }
  }
}
</style>