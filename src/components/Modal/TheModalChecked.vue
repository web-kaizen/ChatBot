<template>
  <section class="popup-registration-check">
    <section class="check-title">
      <h3 class="check-title-text">Отправили код на vovs@mail.ru</h3>
    </section>
    <section class="check-content">
      <p class="check-description">
        Напишите его, чтобы подтвердить, что это вы, а не кто-то другой входит в
        личный кабинет
      </p>
      <section class="check-data">
        <p class="alertError" id="alertMessageCode"></p>
        <input class="check-input" type="text" placeholder="Введите код" />
      </section>
      <p class="check-info">
        Повторить через <span class="check-info_timer">02:00</span>
      </p>
      <button type="button" class="check-link">Отправить код заново</button>
      <button class="button check-button">Подтвердить</button>
    </section>
  </section>
</template>
