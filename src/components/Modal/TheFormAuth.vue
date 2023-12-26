<script setup>
import BaseButton from "../Base/BaseButton.vue";
import BaseLineButton from "../Base/BaseLineButton.vue";
import BaseInput from "../Base/BaseInput.vue";
import {
  ArrowRightEndOnRectangleIcon,
  LockClosedIcon,
} from "@heroicons/vue/24/outline";

const emit = defineEmits(["changeForm"]);
const changeForms = () => emit("changeForm");
</script>

<template>
  <section>
    <div class="login-alert-msg"></div>
    <form class="form-login">
      <div class="form-inputs">
        <BaseInput type="email" placeholder="Электронная почта">
          <ArrowRightEndOnRectangleIcon />
        </BaseInput>
        <BaseInput type="password" placeholder="Пароль">
          <LockClosedIcon />
        </BaseInput>
      </div>
      <BaseButton class="form-login_btn">Войти</BaseButton>
      <div class="form-action_line">
        <BaseLineButton>Забыли пароль?</BaseLineButton>
        <BaseLineButton @click="changeForms()">
          Зарегистрироваться
        </BaseLineButton>
      </div>
    </form>
  </section>
</template>
