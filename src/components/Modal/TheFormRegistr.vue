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
const errorConfirmPassword = ref(null)

const emit = defineEmits(['change-form', 'user-to-modal'])
const changeForms = () => {
  document.getElementById('regForm').reset()
  errorEmail.value = null
  errorPassword.value = null
  errorConfirmPassword.value = null
  emit('change-form')
}

let email = ''
let password = ''
let confirmPassword = ''

const validateForm = () => {
  errorEmail.value = null
  errorPassword.value = null
  errorConfirmPassword.value = null

  if (!email.trim()) {
    errorEmail.value = 'Заполните поле Электронная почта'
  } else {
    if (!validateEmail(email)) errorEmail.value = 'Электронная почта указана некорректно'
  }
  if (!password.trim()) errorPassword.value = 'Заполните поле Пароль'
  if (!confirmPassword.trim()) errorConfirmPassword.value = 'Заполните поле Повторите пароль'

  if (!errorEmail.value && !errorPassword.value && !errorConfirmPassword.value) {
    try {
      user.makeReg(
        (data) => {
          emit('user-to-modal', { data, mode: 'Reg' })
          changeForms()
        },
        email,
        password,
        confirmPassword
      )
    } catch (error) {
      let json = JSON.parse(error.message)

      if (json.code === 'invalid_email') errorEmail.value = json.text
      if (json.code === 'invalid_password') errorPassword.value = json.text
      if (json.code === 'invalid_confirm_password') errorConfirmPassword.value = json.text
      if (json.code === 'invalid_passwords') {
        errorPassword.value = json.text
        errorConfirmPassword.value = json.text
      }
      if (json.code === 'email_busy') errorEmail.value = json.text
    }
  }
}
</script>

<template>
  <section>
    <form class="form-login" id="regForm">
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
        <BaseInput
          @change="confirmPassword = $event"
          @input="confirmPassword = null"
          type="password"
          placeholder="Повторите пароль"
          :isOpenError="Boolean(errorConfirmPassword)"
          :error="errorConfirmPassword"
        >
          <LockClosedIcon />
        </BaseInput>
      </div>
      <BaseButton class="form-login_btn" @click="validateForm()"> Зарегистрироваться </BaseButton>
      <div class="form-action_line">
        <BaseLineButton @click="changeForms()"> У вас уже есть аккаунт? </BaseLineButton>
      </div>
    </form>
  </section>
</template>
