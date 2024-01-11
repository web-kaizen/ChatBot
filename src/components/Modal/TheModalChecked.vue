<script setup>
import { ref, watch } from 'vue'
import BaseButton from '../Base/BaseButton.vue'
import BaseInput from '../Base/BaseInput.vue'

const props = defineProps(['email'])

let counterTimer = 19 // Two minutes
let checkCode

const stopTimer = ref(false)
const minutes = ref(0)
const seconds = ref(20)

const startTimer = (duration) => {
  let timer = duration

  let idInterval = setInterval(() => {
    minutes.value = parseInt(timer / 60, 10)
    seconds.value = parseInt(timer % 60, 10)
    // minutes.value = minutes.value < 10 ? '0' + minutes.value : minutes.value
    // seconds.value = seconds.value < 10 ? '0' + seconds.value : seconds.value

    console.log(timer)

    if (--timer < 0 || stopTimer.value) {
      clearInterval(idInterval)
      stopTimer.value = true
    }
  }, 1000)
}

const sendCheckCode = (email) => {
  /* Реализовать отправку кода на указанный email */
  console.log(email)
}

const getCheckCode = (email) => {
  const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000

  stopTimer.value = false

  sendCheckCode(email)
  startTimer(counterTimer)

  return code
}

const getCheckCodeRepeat = () => {
  checkCode = getCheckCode(props.email)
  console.log(checkCode)
}

watch(
  () => props.email,
  () => {
    checkCode = getCheckCode(props.email)
    console.log(checkCode)
  }
)
</script>

<template>
  <section class="popup-registration-check">
    <section class="check-title">
      <h3 class="check-title-text">Отправили код на {{ props.email }}</h3>
    </section>
    <section class="check-content">
      <p class="check-description">
        Напишите его, чтобы подтвердить, что это вы, а не кто-то другой входит в личный кабинет
      </p>
      <BaseInput type="text" placeholder="Введите код" />
      <p class="check-info" v-show="!stopTimer">
        Повторить через
        <span class="check-info_timer">
          {{ minutes < 10 ? '0' + minutes : minutes }}:{{ seconds < 10 ? '0' + seconds : seconds }}
        </span>
      </p>
      <button type="button" class="check-link" v-show="stopTimer" @click="getCheckCodeRepeat">
        Отправить код заново
      </button>
      <BaseButton class="check-button">Подтвердить</BaseButton>
    </section>
  </section>
</template>
