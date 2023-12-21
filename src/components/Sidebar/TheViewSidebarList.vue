<script setup>
import ViewSidebarItem from "./ViewSidebarItem.vue";
</script>

<template>
  <ul class="view-sidebar-list">
    <li class="view-sidebar-item view-sidebar-left active">
      <ViewSidebarItem />
    </li>
    <li class="view-sidebar-item view-sidebar-right">
      <ViewSidebarItem />
    </li>
  </ul>
</template>
