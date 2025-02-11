<template>
  <span class="material-symbols-outlined theme-icon" v-if="!isDarkMode" @click="toggleTheme()">
    light_mode 
  </span>
  <span class="material-symbols-outlined theme-icon" v-if="isDarkMode" @click="toggleTheme()">
    dark_mode
  </span>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const isDarkMode = ref(false)
    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value
      document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
    }
    return { isDarkMode, toggleTheme }
  }
}
</script>

<style>
.theme-icon {
  font-size: 24px;
  cursor: pointer;
  margin-left: 15%;
}

@media (max-width: 767px) {
  .theme-icon {
    font-size: 50px;
  }
}
</style>