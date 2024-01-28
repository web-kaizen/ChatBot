<script setup>
import hljs from 'highlight.js/lib/common'
import { onMounted, ref, defineProps, nextTick } from 'vue'
import { extractUsername } from '@/functions/functions.js'

const { codeText, role, name } = defineProps(['codeText', 'role', 'name'])
const contentRef = ref(null)
const hasCodeBlocks = ref(false)
const highlightedCode = ref('')

onMounted(async () => {
  await nextTick()
  const codeRegex = /```(\w+)\n([\s\S]+?)\n```/g
  let match
  let lastIndex = 0

  while ((match = codeRegex.exec(codeText)) !== null) {
    const language = match[1]
    const codeBlock = match[2]
    const startIndex = match.index

    highlightedCode.value += `
      <p class="message-language">${language}</p>
      <p class="message-code theme-atom-one-dark hljs-${language}">${
        hljs.highlight(codeBlock, { language }).value
      }</p>`
    lastIndex = startIndex + match[0].length
    hasCodeBlocks.value = true
  }

  // Append any remaining plain text after the last code block
  highlightedCode.value += hljs.highlightAuto(codeText.substring(lastIndex)).value
})
</script>

<template>
  <li
    class="message"
    :class="{
      'message-user': role === 'user',
      'message-bot': role === 'bot',
      'message-error': role === 'error'
    }"
  >
    <p class="message-name">{{ role === 'user' ? extractUsername(name) : name }}</p>
    <p class="message-text">
      <pre v-if="hasCodeBlocks">
        <code ref="contentRef" class="language-plaintext" v-html="highlightedCode"></code>
      </pre>
      <template v-else>
        {{ codeText }}
      </template>
    </p>
  </li>
</template>

<style scoped>
.message {
  padding: 20px;
  border-radius: 14px;
  border: 1px solid#e6e6e6;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.message-user {
  background: #fff;
}

.message-bot {
  background: #e6e6e6;
}

.message-error {
  border: 1px solid #f00;
  background: #f6e5e6;
}

.message-name {
  font-weight: 700;
  font-size: 20px;
}

pre {
  white-space: normal;
}
</style>
