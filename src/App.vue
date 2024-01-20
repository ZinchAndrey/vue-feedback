<template>
  <main>
    <base-container>
      <form-block/>

      <!-- <base-button type="button" label="Next step" @clickEvent="console.log('test')"/>
      <base-button type="button" label="Previous step" :outline="true"/> -->
    </base-container>



  </main>
</template>

<script>
import FormBlock from '@/components/form/FormBlock.vue';

export default {
  components: {FormBlock},
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>
