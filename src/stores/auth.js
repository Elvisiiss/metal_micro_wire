import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const token = ref(localStorage.getItem('token'))
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  const isAuthenticated = computed(() => !!token.value)

  // 模拟登录API
  const mockLoginApi = async (credentials) => {
    // 模拟admin登录
    if (credentials.email === 'admin@qq.com' && credentials.password === '123456') {
      return {
        token: 'mock-token-123456',
        user: {
          id: 1,
          username: 'admin',
          email: 'admin@qq.com',
          role: 'admin'
        }
      }
    }
    // 模拟邮箱验证码登录
    if (credentials.email && credentials.code === '123456') {
      return {
        token: 'mock-token-123456',
        user: {
          id: 2,
          username: 'user_' + Math.random().toString(36).substring(2, 8),
          email: credentials.email,
          role: 'user'
        }
      }
    }
    throw new Error('Invalid credentials')
  }

  // 模拟发送验证码
  const mockSendCodeApi = async (email) => {
    console.log(`验证码已发送至: ${email} (模拟: 123456)`)
    return { success: true }
  }

  // 模拟注册
  const mockRegisterApi = async (data) => {
    if (data.code !== '123456') {
      throw new Error('Invalid verification code')
    }
    return {
      token: 'mock-token-' + Math.random().toString(36).substring(2),
      user: {
        id: Math.floor(Math.random() * 1000) + 2,
        username: data.username,
        email: data.email,
        role: 'user'
      }
    }
  }

  // 登录方法
  const login = async (credentials) => {
    try {
      const response = await mockLoginApi(credentials)
      token.value = response.token
      user.value = response.user

      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))

      router.push('/dashboard')
      return true
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // 发送验证码
  const sendVerificationCode = async (email) => {
    try {
      await mockSendCodeApi(email)
      return true
    } catch (error) {
      console.error('Send code error:', error)
      throw error
    }
  }

  // 注册方法
  const register = async (userData) => {
    try {
      const response = await mockRegisterApi(userData)
      token.value = response.token
      user.value = response.user

      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))

      router.push('/dashboard')
      return true
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  // 登出方法
  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    sendVerificationCode,
    register,
    logout
  }
}, {
  persist: true
})