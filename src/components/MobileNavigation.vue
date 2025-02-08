<template>
  <div class="mobile-nav">
    <div class="menu">
      <button class="close-btn" @click="closeMenu">&times;</button>
      <nav>
        <router-link :to="{ name: 'home' }" @click="closeMenu">Home</router-link>
        <router-link :to="{ name: 'about' }" @click="closeMenu">About</router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["close"]);

const closeMenu = () => {
  emit("close");
};
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
  background-color: rgba(255, 255, 255, 0.144);
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
  color: black;
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
  color: black;
  font-weight: bold;
  margin-right: 9.2vw;
}
</style>