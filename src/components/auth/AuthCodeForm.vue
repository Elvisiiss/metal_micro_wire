<template>
  <el-form 
    ref="codeForm" 
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
    
    <el-form-item prop="code">
      <div class="code-input">
        <el-input
          v-model="form.code"
          placeholder="验证码"
          prefix-icon="Key"
          clearable
        />
        <el-button 
          :disabled="!canSend || countdown > 0"
          @click="handleSendCode"
          class="send-btn"
        >
          {{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
        </el-button>
      </div>
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
      <el-link type="info" @click="$emit('switch-to-password')">密码登录</el-link>
    </div>
  </el-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['login', 'send-code', 'switch-to-password'])

const form = ref({
  email: '',
  code: ''
})

const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '验证码为6位数字', trigger: 'blur' }
  ]
}

const codeForm = ref(null)
const loading = ref(false)
const countdown = ref(0)
const canSend = computed(() => form.value.email && rules.email[1].pattern.test(form.value.email))

let timer = null

const handleSubmit = async () => {
  try {
    loading.value = true
    await codeForm.value.validate()
    emit('login', form.value)
  } catch (error) {
    if (error instanceof Error) {
      ElMessage.error(error.message || '验证失败')
    }
  } finally {
    loading.value = false
  }
}

const handleSendCode = async () => {
  try {
    await codeForm.value.validateField('email')
    emit('send-code', form.value.email)
    startCountdown()
  } catch (error) {
    ElMessage.error('请输入有效的邮箱地址')
  }
}

const startCountdown = () => {
  countdown.value = 60
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}
</script>

<style lang="scss" scoped>
.code-input {
  display: flex;
  gap: 10px;
  
  .el-input {
    flex: 1;
  }
  
  .send-btn {
    width: 120px;
    background: rgba(79, 172, 254, 0.1);
    border: 1px solid rgba(79, 172, 254, 0.5);
    color: #4facfe;
    
    &:disabled {
      opacity: 0.5;
    }
  }
}

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