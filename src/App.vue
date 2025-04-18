<template>
  <router-view />
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
// 初始化时检查本地存储的登录状态
authStore.$state = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user') || 'null')
}
</script>

<style lang="scss">
@use "@/assets/styles/variables.scss" as *;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: $bg-color;
  color: $text-primary;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>