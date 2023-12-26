<script setup>
import BaseButton from "../Base/BaseButton.vue";
import BaseLineButton from "../Base/BaseLineButton.vue";
import BaseInput from "../Base/BaseInput.vue";
import {
  ArrowRightEndOnRectangleIcon,
  LockClosedIcon,
} from "@heroicons/vue/24/outline";
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
      <BaseButton class="form-login_btn" type="button" id="login-btn">
        Войти
      </BaseButton>
      <div class="form-action_line">
        <BaseLineButton id="forgot-password"> Забыли пароль? </BaseLineButton>
        <BaseLineButton id="registration"> Зарегистрироваться </BaseLineButton>
      </div>
    </form>
  </section>
</template>
