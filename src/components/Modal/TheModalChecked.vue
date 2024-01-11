<script setup>
import BaseButton from "../Base/BaseButton.vue";
import BaseInput from "../Base/BaseInput.vue";

defineProps({
  email: {
    required: true,
    type: String,
  },
});

let counterTimer = 60 * 2; // Two minutes
let stopTimer = false;
let checkCode;
let minutes = 0;
let seconds = 0;

const startTimer = (duration) => {
  let timer = duration;

  let idInterval = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (--timer < 0 || stopTimer) {
      checkInfo.style.display = "none";
      display.textContent = "";
      checkLink.style.display = "block";

      clearInterval(idInterval);
    }
  }, 1000);
};

const sendCheckCode = (email) => {
  const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  stopTimer = false;

  /* Реализовать отправку кода на указанный email */
  console.log(email);

  startTimer(counterTimer);

  return code;
};
</script>

<template>
  <section class="popup-registration-check">
    <section class="check-title">
      <h3 class="check-title-text">Отправили код на {{ email }}</h3>
    </section>
    <section class="check-content">
      <p class="check-description">
        Напишите его, чтобы подтвердить, что это вы, а не кто-то другой входит в
        личный кабинет
      </p>
      <BaseInput type="text" placeholder="Введите код" />
      <p class="check-info">
        Повторить через
        <span class="check-info_timer">{{ minutes }}:{{ seconds }}</span>
      </p>
      <button type="button" class="check-link" @click="sendCheckCode(email)">
        Отправить код заново
      </button>
      <BaseButton class="check-button">Подтвердить</BaseButton>
    </section>
  </section>
</template>
