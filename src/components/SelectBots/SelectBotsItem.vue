<script setup>
const props = defineProps({
  items: Array,
  isSelected: String,
  onChangeSelect: Function
})

const onOptionChange = (event) => {
  props.onChangeSelect(event.target.value)
}
</script>

<template>
  <select :value="isSelected" @change="onOptionChange">
    <option v-for="item in items" :key="item.name" :value="item.name">{{ item.name }}</option>
  </select>
</template>
