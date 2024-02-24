<script setup>
const props = defineProps({
  text: String,
  items: Array,
  selected: String,
  onChangeSelect: Function
})

const onOptionChange = (event) => {
  props.onChangeSelect(event.target.value)
}
</script>

<template>
  <select :value="selected" @change="onOptionChange">
    <option value="" disabled>Выберите {{ text }}</option>
    <option v-for="item in items" :key="item.name" :value="item.name">{{ item.name }}</option>
  </select>
</template>
