<template>
  <div class="register-container">
    <div class="holographic-bg"></div>
    <div class="register-box">
      <div class="register-header">
        <h1>创建账号</h1>
        <p>加入金属微细线材检测平台</p>
      </div>
      
      <RegisterForm 
        @register="handleRegister"
        @send-code="sendVerificationCode"
      />
      
      <div class="register-footer">
        <span>已有账号?</span>
        <el-link type="primary" @click="$router.push('/login')">立即登录</el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import RegisterForm from '@/components/auth/RegisterForm.vue'

const authStore = useAuthStore()
const router = useRouter()

const handleRegister = async (userData) => {
  try {
    await authStore.register(userData)
    router.push('/dashboard')
  } catch (error) {
    console.error('Registration failed:', error)
  }
}

const sendVerificationCode = async (email) => {
  try {
    await authStore.sendVerificationCode(email)
    ElMessage.success('验证码已发送')
  } catch (error) {
    ElMessage.error(error.message || '发送验证码失败')
  }
}
</script>

<style lang="scss" scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a3a 0%, #0f1923 100%);
  position: relative;
  overflow: hidden;
  
  .holographic-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 30%, rgba(0, 150, 255, 0.1) 0%, transparent 30%),
      radial-gradient(circle at 80% 70%, rgba(255, 100, 0, 0.1) 0%, transparent 30%);
    animation: holographicMove 15s infinite alternate;
  }
  
  .register-box {
    position: relative;
    z-index: 1;
    width: 420px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.05),
      0 0 20px rgba(0, 150, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    
    .register-header {
      text-align: center;
      margin-bottom: 30px;
      
      h1 {
        font-size: 24px;
        margin: 0 0 8px;
        font-weight: 500;
        background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      p {
        margin: 0;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
      }
    }
    
    .register-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
      
      .el-link {
        margin-left: 8px;
      }
    }
  }
}

@keyframes holographicMove {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}
</style>