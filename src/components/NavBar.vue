<template>
  <MobileNavigation v-if="menuOpen" @close="closeMenu"/>
  <header>
    <h1 @click="toggleTheme()">InterVue</h1>
    <nav class="pc-nav">
      <router-link :to="{name: 'home'}">Home</router-link>
      <router-link :to="{name: 'about'}">About</router-link>
    </nav>
    <button class="burger" @click="toggleMenu" v-if="!menuOpen">
      &#9776;
    </button>
  </header>
</template>

<script>
import { ref } from 'vue'
import MobileNavigation from '@/components/MobileNavigation.vue'
export default {
  components: {MobileNavigation},
  setup() {
    const menuOpen = ref(false)
    const isDarkMode = ref(false);

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value
    }

    const closeMenu = () => {
      menuOpen.value = false
    }

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value
      document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
    }

    return { menuOpen, toggleMenu, closeMenu, toggleTheme, isDarkMode }
  }
}
</script>

<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: var(--color-bg);
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  height: 60px;
}
header h1 {
  color: var(--color-text);
  font-size: 48px;
  font-family: monospace;
  margin-left: 10vw;
}
header a {
  color: var(--color-nav-text);
  text-decoration: none;
  margin-left: 20px;
}

header a.router-link-active {
  color: var(--color-letter);
  font-weight: bold;
  margin-left: 20px;

}

@media (min-width: 768px) {
  

  nav {
    margin-right: 10%;
  }

  .burger {
    display: none;
  }
}

@media (max-width: 767px) {
  .pc-nav {
    display: none;
  }

  .burger {
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 11vw;
    color: var(--color-letter);
  }

  header h1 {
    margin-left: 2vw;
  }
}
</style>