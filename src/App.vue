<template>
  <main>
    <h1>
      Test text
    </h1>

    <base-button label="Next step" @clickEvent="console.log('test')"/>
    <base-button label="Previous step" :outline="true"/>
  </main>
</template>

<script>

export default {
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>
