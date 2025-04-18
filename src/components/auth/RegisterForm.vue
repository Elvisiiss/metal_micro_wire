<template>
  <el-form 
    ref="registerForm" 
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
    
    <el-form-item prop="confirmPassword">
      <el-input
        v-model="form.confirmPassword"
        type="password"
        placeholder="确认密码"
        prefix-icon="Lock"
        show-password
        clearable
      />
    </el-form-item>
    
    <el-form-item prop="username">
      <el-input
        v-model="form.username"
        placeholder="用户名"
        prefix-icon="User"
        clearable
        @blur="checkUsername"
      />
    </el-form-item>
    
    <el-form-item>
      <el-button 
        type="primary" 
        class="register-btn" 
        native-type="submit"
        :loading="loading"
      >
        注册
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['register', 'send-code'])

const form = ref({
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
  username: ''
})

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.value.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const validateUsername = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('用户名不能为空'))
  }
  if (value.length < 3 || value.length > 16) {
    callback(new Error('用户名长度应在3-16个字符之间'))
  } else {
    callback()
  }
}

const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '验证码为6位数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { validator: validatePass, trigger: 'blur' }
  ],
  username: [
    { validator: validateUsername, trigger: 'blur' }
  ]
}

const registerForm = ref(null)
const loading = ref(false)
const countdown = ref(0)
const usernameAvailable = ref(false)
const canSend = computed(() => form.value.email && rules.email[1].pattern.test(form.value.email))

let timer = null

const handleSubmit = async () => {
  try {
    loading.value = true
    await registerForm.value.validate()
    
    if (!usernameAvailable.value) {
      throw new Error('请检查用户名是否可用')
    }
    
    emit('register', form.value)
  } catch (error) {
    if (error instanceof Error) {
      ElMessage.error(error.message || '注册失败')
    }
  } finally {
    loading.value = false
  }
}

const handleSendCode = async () => {
  try {
    await registerForm.value.validateField('email')
    emit('send-code', form.value.email)
    startCountdown()
  } catch (error) {
    ElMessage.error('请输入有效的邮箱地址')
  }
}

const checkUsername = async () => {
  if (!form.value.username) return
  
  try {
    // 模拟检查用户名是否可用
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 这里应该是API调用，我们模拟一下
    if (form.value.username.toLowerCase() === 'admin') {
      throw new Error('用户名已存在')
    }
    
    usernameAvailable.value = true
    ElMessage.success('用户名可用')
  } catch (error) {
    usernameAvailable.value = false
    ElMessage.error(error.message)
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

.register-btn {
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
</style>