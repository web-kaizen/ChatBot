<script setup>
import BaseButton from "../Base/BaseButton.vue";
import TheViewSidebarList from "./theviewsidebarlist.vue";
import ViewSidebarItem from "./ViewSidebarItem.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <section class="sidebar-actions">
    <BaseButton class="new-chat-btn">
      <PlusIcon />
      <span>Новый чат</span>
    </BaseButton>
    <button class="view-sidebar-btn">
      <ViewSidebarItem />
    </button>
    <TheViewSidebarList />
  </section>
</template>
