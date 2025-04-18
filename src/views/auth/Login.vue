<template>
  <div class="login-container">
    <div class="holographic-bg"></div>
    <div class="login-box">
      <div class="login-header">
        <h1>金属微细线材检测平台</h1>
        <p>高性能材料分析与质量管理系统</p>
      </div>
      
      <el-tabs v-model="activeTab" class="login-tabs">
        <el-tab-pane label="密码登录" name="password">
          <LoginForm 
            @login="handleLogin" 
            @switch-to-code="activeTab = 'code'"
          />
        </el-tab-pane>
        <el-tab-pane label="验证码登录" name="code">
          <AuthCodeForm 
            @login="handleLogin" 
            @send-code="sendVerificationCode"
            @switch-to-password="activeTab = 'password'"
          />
        </el-tab-pane>
      </el-tabs>
      
      <div class="login-footer">
        <el-link type="info" @click="$router.push('/register')">注册账号</el-link>
        <el-link type="info" @click="$router.push('/forgot-password')">忘记密码</el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginForm from '@/components/auth/LoginForm.vue'
import AuthCodeForm from '@/components/auth/AuthCodeForm.vue'

const activeTab = ref('password')
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async (credentials) => {
  try {
    await authStore.login(credentials)
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
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
.login-container {
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
  
  .login-box {
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
    
    .login-header {
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
    
    .login-tabs {
      :deep(.el-tabs__nav) {
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
      
      :deep(.el-tabs__item) {
        color: rgba(255, 255, 255, 0.7);
        padding: 0 20px;
        
        &.is-active {
          color: #4facfe;
        }
      }
      
      :deep(.el-tabs__active-bar) {
        background-color: #4facfe;
      }
    }
    
    .login-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      
      .el-link {
        font-size: 12px;
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