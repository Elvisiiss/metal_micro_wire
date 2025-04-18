<template>
  <el-form 
    ref="loginForm" 
    :model="form" 
    :rules="rules" 
    @submit.prevent="handleSubmit"
  >
    <el-form-item prop="email">
      <el-input
        v-model="form.email"
        placeholder="邮箱"
        prefix-icon="User"
        clearable
      />
    </el-form-item>
    
    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        type="password"
        placeholder="密码"
        prefix-icon="Lock"
        show-password
        clearable
      />
    </el-form-item>
    
    <el-form-item>
      <el-button 
        type="primary" 
        class="login-btn" 
        native-type="submit"
        :loading="loading"
      >
        登录
      </el-button>
    </el-form-item>
    
    <div class="login-options">
      <el-link type="info" @click="$emit('switch-to-code')">验证码登录</el-link>
    </div>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['login', 'switch-to-code'])

const form = ref({
  email: '',
  password: ''
})

const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ]
}

const loginForm = ref(null)
const loading = ref(false)

const handleSubmit = async () => {
  try {
    loading.value = true
    await loginForm.value.validate()
    emit('login', form.value)
  } catch (error) {
    if (error instanceof Error) {
      ElMessage.error(error.message || '验证失败')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-btn {
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

.login-options {
  display: flex;
  justify-content: flex-end;
  margin-top: -10px;
  
  .el-link {
    font-size: 12px;
  }
}
</style>