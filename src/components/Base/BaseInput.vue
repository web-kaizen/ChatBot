<script setup>
const props = defineProps({
  type: String,
  placeholder: {
    required: true,
    type: String,
  },
  isOpenError: {
    isOpenError: Boolean,
  },
  error: {
    type: String,
  },
});

function resetInput() {
  props.isOpenError = false;
  // input.nextElementSibling.classList.remove("open");
  // input.parentElement.classList.remove("invalid");
}

const emit = defineEmits({
  change(value) {
    return typeof value === "string";
  },
  input: false,
});
</script>

<template>
  <div class="form-input" :class="{ invalid: props.isOpenError }">
    <slot></slot>
    <input
      :type="type"
      :placeholder="placeholder"
      @change="emit('change', $event.target.value)"
      @input="emit('input')"
    />
    <p class="alertError" :class="{ open: props.isOpenError }">
      {{ props.error }}
    </p>
  </div>
</template>
