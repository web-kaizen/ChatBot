<script setup>
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <section class="user-after-login">
    <section class="user">
      <div class="user-logo"></div>
      <div class="user-info">
        <div class="user-name"></div>
        <div class="user-balance">
          <p>Баланс: <span id="balance">100р</span></p>
          <button class="user-balance-update">
            <ArrowPathIcon />
          </button>
        </div>
      </div>
    </section>
    <section class="user-actions">
      <button class="topup-balance">Пополнить</button>
      <button class="user-logout">Выйти</button>
    </section>
  </section>
</template>
