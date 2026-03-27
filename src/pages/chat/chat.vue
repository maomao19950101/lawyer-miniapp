<template>
  <view class="chat-container">
    <!-- 聊天消息列表 -->
    <scroll-view 
      class="message-list" 
      scroll-y 
      :scroll-top="scrollTop"
      :scroll-into-view="scrollIntoView"
    >
      <view 
        v-for="(msg, index) in messages" 
        :key="index" 
        :id="'msg-' + index"
        class="message-item"
        :class="{ 'message-self': msg.from === currentUser }"
      >
        <view class="message-avatar">
          {{ msg.from?.charAt(0)?.toUpperCase() || '?' }}
        </view>
        <view class="message-content">
          <view class="message-username">{{ msg.from }}</view>
          <view class="message-bubble">
            {{ msg.msg }}
          </view>
          <view class="message-time">{{ formatTime(msg.time) }}</view>
        </view>
      </view>
    </scroll-view>

    <!-- 输入区域 -->
    <view class="input-area">
      <input 
        v-model="inputText" 
        class="message-input" 
        placeholder="输入消息..." 
        @confirm="sendMessage"
      />
      <button class="send-btn" @click="sendMessage" :disabled="!inputText.trim()">
        发送
      </button>
    </view>

    <!-- 登录弹窗 -->
    <view v-if="showLogin" class="login-modal">
      <view class="login-box">
        <view class="login-title">环信登录</view>
        <input v-model="loginForm.username" placeholder="用户名" class="login-input" />
        <input v-model="loginForm.password" type="password" placeholder="密码" class="login-input" />
        <view class="login-btns">
          <button @click="handleLogin" class="login-btn">登录</button>
          <button @click="handleRegister" class="login-btn register">注册</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { WebIM, login as easemobLogin, initEasemob, sendTextMessage } from '@/utils/easemob'
import { EASEMOB_CONFIG } from '@/utils/easemob-config'

interface Message {
  from: string
  to: string
  msg: string
  time: number
  type: string
}

const messages = ref<Message[]>([])
const inputText = ref('')
const scrollTop = ref(0)
const scrollIntoView = ref('')
const showLogin = ref(true)
const currentUser = ref('')

const loginForm = ref({
  username: '',
  password: ''
})

// 登录
const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    uni.showToast({ title: '请输入用户名和密码', icon: 'none' })
    return
  }
  
  try {
    uni.showLoading({ title: '登录中...' })
    await easemobLogin(loginForm.value.username, loginForm.value.password)
    currentUser.value = loginForm.value.username
    showLogin.value = false
    uni.showToast({ title: '登录成功', icon: 'success' })
    
    // 添加消息监听
    listenMessages()
  } catch (error: any) {
    console.error('Login error:', error)
    uni.showToast({ title: error.error_description || '登录失败', icon: 'none' })
  } finally {
    uni.hideLoading()
  }
}

// 注册
const handleRegister = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    uni.showToast({ title: '请输入用户名和密码', icon: 'none' })
    return
  }
  
  try {
    uni.showLoading({ title: '注册中...' })
    
    // 调用环信 REST API 注册用户
    const response = await fetch(`${EASEMOB_CONFIG.apiUrl}/${EASEMOB_CONFIG.appKey}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: loginForm.value.username,
        password: loginForm.value.password
      })
    })
    
    const result = await response.json()
    
    if (response.ok) {
      uni.showToast({ title: '注册成功，请登录', icon: 'success' })
    } else {
      throw new Error(result.error_description || '注册失败')
    }
  } catch (error: any) {
    console.error('Register error:', error)
    uni.showToast({ title: error.message || '注册失败', icon: 'none' })
  } finally {
    uni.hideLoading()
  }
}

// 发送消息
const sendMessage = async () => {
  if (!inputText.value.trim()) return
  
  const text = inputText.value.trim()
  const to = 'laywer-huang' // 假设发送给律师
  
  try {
    await sendTextMessage(to, text)
    
    // 添加到本地消息列表
    messages.value.push({
      from: currentUser.value,
      to: to,
      msg: text,
      time: Date.now(),
      type: 'txt'
    })
    
    inputText.value = ''
    scrollToBottom()
  } catch (error: any) {
    console.error('Send error:', error)
    uni.showToast({ title: '发送失败', icon: 'none' })
  }
}

// 监听消息
const listenMessages = () => {
  const conn = (WebIM as any).conn
  
  // 监听在线消息
  conn.listen({
    onMessage: (msg: any) => {
      console.log('Received message:', msg)
      messages.value.push({
        from: msg.from,
        to: msg.to,
        msg: msg.msg || msg.bodies?.[0]?.msg,
        time: msg.time || Date.now(),
        type: msg.type
      })
      scrollToBottom()
    },
    onError: (error: any) => {
      console.error('Connection error:', error)
      uni.showToast({ title: '连接错误', icon: 'none' })
    }
  })
}

// 滚动到底部
const scrollToBottom = () => {
  setTimeout(() => {
    scrollIntoView.value = 'msg-' + (messages.value.length - 1)
  }, 100)
}

// 格式化时间
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

onMounted(() => {
  // 初始化 SDK
  initEasemob()
})

onUnmounted(() => {
  // 退出登录
  // logout()
})
</script>

<style lang="scss" scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.message-list {
  flex: 1;
  padding: 20rpx;
}

.message-item {
  display: flex;
  margin-bottom: 30rpx;
  
  &.message-self {
    flex-direction: row-reverse;
    
    .message-content {
      align-items: flex-end;
    }
    
    .message-bubble {
      background-color: #007AFF;
      color: #fff;
    }
  }
}

.message-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background-color: #007AFF;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  font-weight: bold;
  margin: 0 20rpx;
}

.message-content {
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.message-username {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.message-bubble {
  padding: 20rpx;
  background-color: #fff;
  border-radius: 16rpx;
  font-size: 28rpx;
  word-break: break-word;
}

.message-time {
  font-size: 20rpx;
  color: #ccc;
  margin-top: 8rpx;
}

.input-area {
  display: flex;
  padding: 20rpx;
  background-color: #fff;
  border-top: 1rpx solid #eee;
}

.message-input {
  flex: 1;
  height: 72rpx;
  padding: 0 24rpx;
  background-color: #f5f5f5;
  border-radius: 36rpx;
  font-size: 28rpx;
}

.send-btn {
  margin-left: 20rpx;
  padding: 0 32rpx;
  height: 72rpx;
  line-height: 72rpx;
  background-color: #007AFF;
  color: #fff;
  border-radius: 36rpx;
  font-size: 28rpx;
  
  &[disabled] {
    background-color: #ccc;
  }
}

// 登录弹窗
.login-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.login-box {
  width: 600rpx;
  padding: 40rpx;
  background-color: #fff;
  border-radius: 20rpx;
}

.login-title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40rpx;
}

.login-input {
  width: 100%;
  height: 80rpx;
  padding: 0 20rpx;
  border: 1rpx solid #ddd;
  border-radius: 10rpx;
  margin-bottom: 30rpx;
  font-size: 28rpx;
}

.login-btns {
  display: flex;
  gap: 20rpx;
}

.login-btn {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #007AFF;
  color: #fff;
  border-radius: 10rpx;
  font-size: 28rpx;
  
  &.register {
    background-color: #fff;
    color: #007AFF;
    border: 1rpx solid #007AFF;
  }
}
</style>
