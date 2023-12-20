<script setup>
import TheSelectBots from "@/components/SelectBots/TheSelectBots.vue";
import TheDialog from  "@/components/Dialog/TheDialog.vue"
</script>

<template>
  <div class="main-component">
    <main class="main">
      <section class="main-content">
        <TheSelectBots/>
        <h1 class="bot-title">Bot-X</h1>
      </section>
      <section class="main-chat hide">
        <TheDialog />
      </section>
    </main>
  </div>
</template>




