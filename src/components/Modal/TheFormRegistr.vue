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
    <form class="form-login">
      <div class="form-inputs">
        <BaseInput type="email" placeholder="Электронная почта">
          <ArrowRightEndOnRectangleIcon />
        </BaseInput>
        <BaseInput type="password" placeholder="Пароль">
          <LockClosedIcon />
        </BaseInput>
        <BaseInput type="password" placeholder="Повторите пароль">
          <LockClosedIcon />
        </BaseInput>
      </div>
      <BaseButton class="form-login_btn" type="button" id="regist-btn">
        Зарегистрироваться
      </BaseButton>
      <div class="form-action_line">
        <BaseLineButton id="have-account">
          У вас уже есть аккаунт?
        </BaseLineButton>
      </div>
    </form>
  </section>
</template>
