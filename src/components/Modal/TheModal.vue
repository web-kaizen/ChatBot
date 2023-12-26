<script setup>
import TheModalAuthForm from "./TheModalAuthForm.vue";
import TheModalChecked from "./TheModalChecked.vue";

const isRegistSuccess = false;
</script>

<template>
  <section class="popup">
    <TheModalAuthForm v-show="!isRegistSuccess" />
    <TheModalChecked v-show="isRegistSuccess" />
  </section>
</template>
