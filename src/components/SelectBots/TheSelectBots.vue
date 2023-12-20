<template>
    <section class="select-bot">
      <select name="type" id="type-bot">
        <option value="ChatGPT" selected>ChatGPT</option>
        <option value="GigaChat">GigaChat</option>
        <option value="Bard">Bard</option>
      </select>
      <select name="model" id="bot-model" class="hide">
        <option value="Gpt-3.5" selected>Gpt-3.5</option>
        <option value="Gpt-4">Gpt-4</option>
      </select>
      <select name="mode" id="bot-mode" class="hide">
        <option value="4k context" selected>4k context</option>
        <option value="16k context">16k context</option>
      </select>
    </section>
</template>