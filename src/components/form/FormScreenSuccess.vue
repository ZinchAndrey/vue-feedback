
<template>
  <form-base-screen class="screen--success">
    <template v-slot:screen-icon>
      <inline-svg class="screen__icon-success" src="img/success-icon.svg" />
    </template>

    <h2 class="screen__caption">
      Submit your quote request
    </h2>
    <p class="screen__sub">
      Please review all the information you previously typed in the past steps, and if all is okay, submit your message to
      receive a project quote in 24 - 48 hours. </p>
    <base-button class="button" label="Submit" type="submit" />
    <span class="screen__success-text">
      Your data was successfuly sent! <br>
      We will contact you soon!
    </span>

    <img src="@/assets/icons/email-icon.png" alt="">
    <img src="@/assets/icons/email-icon.svg" alt="">

  </form-base-screen>
</template>

<script>
import FormBaseScreen from './FormBaseScreen.vue'

export default {
  components: {
    FormBaseScreen,
  },
}
</script>

<style lang="scss" scoped>
.screen {
  &--success {
    text-align: center;
  }

  &__success-text {
    font-size: 12px;
    line-height: 120%;
    color: var(--sub-text-color);

    width: 100%;
    margin-top: 10px;

    display: none;
  }

  &--success-submitted .screen__success-text {
    display: block;
  }

  &__icon-success {
    margin: 0 auto 18px;
  }
}

.button {
  margin: 0 auto;
}

@media (max-width: 768px) {
  .screen {
    &__icon-success {
      width: 100px;
      height: auto;
      margin: 0 auto 15px;
    }
  }
}
</style>