<template>
  <view class="login-container">
    <view class="login-box">
      <text class="title">律师后台登录</text>
      <input class="input" v-model="password" type="password" placeholder="请输入管理密码" />
      <button class="login-btn" @click="doLogin">登录</button>
      <text class="back" @click="goBack">返回首页</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const password = ref('')

const ADMIN_PASSWORD = 'lawyer123' // 实际应该存后端

const doLogin = () => {
  if (password.value === ADMIN_PASSWORD) {
    // 登录成功，存标记
    uni.setStorageSync('isAdmin', 'true')
    uni.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateTo({
        url: '/pages/admin/home/home'
      })
    }, 1000)
  } else {
    uni.showToast({ title: '密码错误', icon: 'none' })
  }
}

const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  
  .login-box {
    width: 600rpx;
    background-color: #fff;
    border-radius: 20rpx;
    padding: 60rpx 40rpx;
    
    .title {
      display: block;
      text-align: center;
      font-size: 40rpx;
      font-weight: bold;
      margin-bottom: 60rpx;
      color: #333;
    }
    
    .input {
      height: 88rpx;
      background-color: #f5f5f5;
      border-radius: 44rpx;
      padding: 0 30rpx;
      margin-bottom: 30rpx;
      font-size: 28rpx;
    }
    
    .login-btn {
      height: 88rpx;
      background-color: #007AFF;
      color: #fff;
      border-radius: 44rpx;
      font-size: 32rpx;
      border: none;
      margin-top: 20rpx;
    }
    
    .back {
      display: block;
      text-align: center;
      margin-top: 30rpx;
      color: #999;
      font-size: 26rpx;
    }
  }
}
</style>
