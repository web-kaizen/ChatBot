<script setup>
const props = defineProps({
  type: String,
  placeholder: {
    required: true,
    type: String,
  },
  error: {
    type: String,
  },
});
</script>

<template>
  <label class="form-input">
    <slot></slot>
    <input :type="type" :placeholder="placeholder" />
    <p class="alertError">{{ error }}</p>
  </label>
</template>
