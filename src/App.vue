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

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 740px;
  margin: 0 auto;

  padding: 50px 20px;

  @media (max-width: 768px) {
    padding: 30px 10px;
  }

}
</style>
