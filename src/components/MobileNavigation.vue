<template>
  <div class="mobile-nav">
    <div class="menu">
      <button class="close-btn" @click="closeMenu">&times;</button>
      <nav>
        <router-link :to="{ name: 'home' }" @click="closeMenu">Home</router-link>
        <router-link :to="{ name: 'about' }" @click="closeMenu">About</router-link>
        <ThemeSwitch class="mobile-theme-switch"/>
      </nav>
    </div>
  </div>
</template>

<script>
import ThemeSwitch from "./ThemeSwitch.vue";
export default {
  components: {
    ThemeSwitch
  },
  setup(_, { emit }) {
  

  const closeMenu = () => {
      emit("close")
    }

  return { closeMenu }
}
}

</script>

<style scoped>
.mobile-nav {
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start; 
  z-index: 1500;
  background-color: var(--color-menu-transparent);
  backdrop-filter: blur(10px);
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end; 
}


.close-btn {
  font-size: 44px;
  background: none;
  border: none;
  align-self: flex-end;
  color: var(--color-letter);
  margin-right: 9.2vw;
  margin-top: 1.8vh;
}


nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

nav a {
  font-size: 40px;
  text-decoration: none;
  color: var(--color-letter);
  font-weight: bold;
  margin-right: 9.2vw;
}
</style>