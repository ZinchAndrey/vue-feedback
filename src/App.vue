<template>
  <main>
    <div class="container">
      <form-block/>
    </div>
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
.container {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;

  padding: 50px 0;
}
</style>
