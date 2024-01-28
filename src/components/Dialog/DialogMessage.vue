<template>
  <li
    class="message"
    :class="{
      'message-user': role === 'user',
      'message-bot': role === 'bot',
      'message-error': role === 'error'
    }"
  >
    <pre v-if="hasCodeBlocks">
      <code ref="contentRef" class="language-plaintext" v-html="highlightedCode"></code>
    </pre>
    <template v-else>
      {{ codeText }}
    </template>
  </li>
</template>

<script setup>
import hljs from 'highlight.js/lib/common'
import { onMounted, ref, defineProps, nextTick } from 'vue'

const { codeText, role } = defineProps(['codeText', 'role'])
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
      <p class="theme-atom-one-dark hljs-${language}">${
        hljs.highlight(codeBlock, { language }).value
      }</p>`
    lastIndex = startIndex + match[0].length
    hasCodeBlocks.value = true
  }

  // Append any remaining plain text after the last code block
  highlightedCode.value += hljs.highlightAuto(codeText.substring(lastIndex)).value
})
</script>

<style scoped>
.message {
  padding: 20px;
  border-radius: 14px;
  border: 1px solid#e6e6e6;
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

pre {
  white-space: pre-line;
}
</style>
