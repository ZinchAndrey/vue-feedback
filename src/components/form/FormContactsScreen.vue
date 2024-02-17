<template>
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
      :error="validationGroups.contacts.$errors.find(item => item.$property === 'name')"
      :modelValue="name"
      @update:modelValue="setCurrentFieldValue"
      @blur="validateField" />

    <base-input 
      type="email" 
      placeholder="Email" 
      label="Email" 
      iconSrc="icons/email-icon.svg" 
      fieldName="email"
      :error="validationGroups.contacts.$errors.find(item => item.$property === 'email')"
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
      :error="validationGroups.contacts.$errors.find(item => item.$property === 'phone')"
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
</template>

<script>
export default {
  inject: ['name', 'email', 'phone', 'company', 'validationGroups', 'updateFieldValue', 'vTouchForm'],
  methods: {
    setCurrentFieldValue(value, name) {
      this.updateFieldValue(value, name)
    },
    validateField(evt) {
      this.vTouchForm(evt.target.name)
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
</style>