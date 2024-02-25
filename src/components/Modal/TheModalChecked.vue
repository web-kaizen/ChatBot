<script setup>
import { defineEmits, ref, watch } from 'vue'
import BaseButton from '../Base/BaseButton.vue'
import BaseInput from '../Base/BaseInput.vue'
import { useUserStore } from '@/store/user'

const emit = defineEmits(['toggle-modal'])
const userStore = useUserStore()
const userEmail = ref('')

let code = ''
let counterTimer = 119 // Two minutes
let checkCode

const stopTimer = ref(false)
const minutes = ref(0)
const seconds = ref(20)
const errorCode = ref(null)

const validateInputCode = () => {
  errorCode.value = null

  if (code.trim()) {
    /// Заменить 1111 на checkCode
    checkCode = 1111

    if (parseInt(code) === checkCode) {
      stopTimer.value = true
      emit('toggle-modal')
    } else {
      errorCode.value = 'Неверный код'
    }
  } else {
    errorCode.value = 'Введите код'
  }

  document.getElementById('check-input').value = ''
}

const startTimer = (duration) => {
  let timer = duration

  let idInterval = setInterval(() => {
    minutes.value = parseInt(timer / 60, 10)
    seconds.value = parseInt(timer % 60, 10)

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
  if (!email) return

  const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000

  stopTimer.value = false

  if (!userStore.getIsAuth) {
    sendCheckCode(email)
    startTimer(counterTimer)
  }

  return code
}

const getCheckCodeRepeat = () => {
  checkCode = getCheckCode(userEmail)
}

watch(
  () => userStore,
  () => {
    userEmail.value = userStore.getEmail
    checkCode = getCheckCode(userEmail.value)
  },
  { deep: true }
)
</script>

<template>
  <section class="popup-registration-check">
    <section class="check-title">
      <h3 class="check-title-text">Отправили код на {{ userEmail }}</h3>
    </section>
    <section class="check-content">
      <p class="check-description">
        Напишите его, чтобы подтвердить, что это вы, а не кто-то другой входит в личный кабинет
      </p>
      <BaseInput
        @change="code = $event"
        @input="errorCode = null"
        id="check-input"
        type="text"
        placeholder="Введите код"
        :isOpenError="Boolean(errorCode)"
        :error="errorCode"
      />
      <p class="check-info" v-show="!stopTimer">
        Повторить через
        <span class="check-info_timer">
          {{ minutes < 10 ? '0' + minutes : minutes }}:{{ seconds < 10 ? '0' + seconds : seconds }}
        </span>
      </p>
      <button type="button" class="check-link" v-show="stopTimer" @click="getCheckCodeRepeat">
        Отправить код заново
      </button>
      <BaseButton class="check-button" @click="validateInputCode()">Подтвердить</BaseButton>
    </section>
  </section>
</template>
