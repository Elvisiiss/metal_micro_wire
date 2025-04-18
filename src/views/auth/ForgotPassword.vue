<template>
  <div class="forgot-container">
    <div class="holographic-bg"></div>
    <div class="forgot-box">
      <div class="forgot-header">
        <h1>重置密码</h1>
        <p>请输入您的邮箱以重置密码</p>
      </div>
      
      <el-form 
        ref="forgotForm" 
        :model="form" 
        :rules="rules" 
        @submit.prevent="handleSubmit"
      >
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            placeholder="邮箱"
            prefix-icon="Message"
            clearable
          />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            class="submit-btn" 
            native-type="submit"
            :loading="loading"
          >
            发送重置链接
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="forgot-footer">
        <el-link type="info" @click="$router.push('/login')">返回登录</el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  email: ''
})

const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
  ]
}

const forgotForm = ref(null)
const loading = ref(false)

const handleSubmit = async () => {
  try {
    loading.value = true
    await forgotForm.value.validate()
    
    // 模拟发送重置密码邮件
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success(`重置链接已发送至: ${form.value.email} (模拟)`)
    router.push('/login')
  } catch (error) {
    if (error instanceof Error) {
      ElMessage.error(error.message || '发送失败')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.forgot-container {
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
  
  .forgot-box {
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
    
    .forgot-header {
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
    
    .submit-btn {
      width: 100%;
      height: 48px;
      background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
      border: none;
      border-radius: 6px;
      font-size: 16px;
      margin-top: 10px;
      transition: all 0.3s;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 150, 255, 0.3);
      }
    }
    
    .forgot-footer {
      display: flex;
      justify-content: center;
      margin-top: 20px;
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