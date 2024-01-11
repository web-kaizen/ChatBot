<script setup>
import BaseButton from '../Base/BaseButton.vue'
import BaseLineButton from '../Base/BaseLineButton.vue'
import BaseInput from '../Base/BaseInput.vue'
import { ArrowRightEndOnRectangleIcon, LockClosedIcon } from '@heroicons/vue/24/outline'
import User from '../../libs/User'
import { ref } from 'vue'
import { validateEmail } from '../../functions/functions'

const user = new User()

const errorEmail = ref(null)
const errorPassword = ref(null)

const emit = defineEmits(['change-form', 'user-to-modal'])
const changeForms = () => {
  document.getElementById('authForm').reset()
  errorAlert = false
  errorEmail.value = null
  errorPassword.value = null
  emit('change-form')
}

let deviceId = 'deviceId'
let email = ''
let password = ''
let errorAlert = false
let errorMsgAlert = ''

function validateForm() {
  errorAlert = false
  errorEmail.value = null
  errorPassword.value = null

  if (!email.trim()) {
    errorEmail.value = 'Заполните поле Электронная почта'
  } else {
    if (!validateEmail(email)) errorEmail.value = 'Электронная почта указана некорректно'
  }
  if (!password.trim()) errorPassword.value = 'Заполните поле Пароль'

  if (!errorEmail.value && !errorPassword.value) {
    try {
      user.makeAuth(
        deviceId,
        (data) => emit('user-to-modal', { data, mode: 'Auth' }),
        email,
        password
      )
    } catch (error) {
      let json = JSON.parse(error.message)

      if (json.code === 'user_not_found') {
        errorEmail.value = json.text
        errorPassword.value = ' '
      }
      if (json.code === 'invalid_email') errorEmail.value = json.text
      if (json.code === 'invalid_password') errorPassword.value = json.text
      if (json.code === 'invalid_email_or_password') {
        errorAlert = true
        errorMsgAlert = json.text
        errorEmail.value = ' '
        errorPassword.value = ' '
      }
    }
  }
}
</script>

<template>
  <section>
    <div class="login-alert-msg" :class="{ show: errorAlert }">
      {{ errorMsgAlert }}
    </div>
    <form class="form-login" id="authForm">
      <div class="form-inputs">
        <BaseInput
          @change="email = $event"
          @input="errorEmail = null"
          type="email"
          placeholder="Электронная почта"
          :isOpenError="Boolean(errorEmail)"
          :error="errorEmail"
        >
          <ArrowRightEndOnRectangleIcon />
        </BaseInput>
        <BaseInput
          @change="password = $event"
          @input="errorPassword = null"
          type="password"
          placeholder="Пароль"
          :isOpenError="Boolean(errorPassword)"
          :error="errorPassword"
        >
          <LockClosedIcon />
        </BaseInput>
      </div>
      <BaseButton class="form-login_btn" @click="validateForm()"> Войти </BaseButton>
      <div class="form-action_line">
        <BaseLineButton>Забыли пароль?</BaseLineButton>
        <BaseLineButton @click="changeForms()"> Зарегистрироваться </BaseLineButton>
      </div>
    </form>
  </section>
</template>
