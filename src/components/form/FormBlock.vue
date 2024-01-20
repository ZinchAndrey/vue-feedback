<template>
  <form class="form" @submit.prevent="console.log(name)">
    <h2>Форма</h2>
    
    <div class="form__wrapper">
      <base-input 
        type="text" 
        placeholder="Name" 
        label="Name" 
        iconSrc="/img/name-icon.svg" 
        error="Enter your name" 
        v-model="name"/>

      <base-input type="email" placeholder="Email" label="Email" iconSrc="/img/email-icon.svg" error="Enter valid email" />
      <base-input type="text" placeholder="Phone" label="Phone" iconSrc="/img/phone-icon.svg" error="Enter your phone"/>
      <base-input type="text" placeholder="Company" label="Company" iconSrc="/img/company-icon.svg" error="Enter company name"/>
    </div>

    <base-button 
      type="submit" 
      label="Отправить"/>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: ''
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