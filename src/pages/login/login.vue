<template>
  <view class="login-container">
    <view class="login-box">
      <text class="title">律师后台登录</text>
      
      <!-- 账号密码登录 -->
      <input class="input" v-model="username" placeholder="请输入用户名" />
      <input class="input" v-model="password" type="password" placeholder="请输入密码" />
      <button class="login-btn" @click="doLogin">登录</button>
      
      <!-- 抖音一键登录 -->
      <view class="divider">
        <view class="line"></view>
        <text class="divider-text">或</text>
        <view class="line"></view>
      </view>
      
      <button class="douyin-btn" @click="douyinLogin">
        <text class="douyin-icon">📱</text>
        <text class="douyin-text">抖音一键登录</text>
      </button>
      
      <text class="back" @click="goBack">返回首页</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')

// 抖音登录
const douyinLogin = () => {
  // #ifdef MP-DOUYIN
  tt.getAuthorize({
    scopes: 'user_info',
    success: async (res) => {
      console.log('抖音授权成功:', res)
      
      // 获取用户信息
      tt.getUserInfo({
        success: (userInfo) => {
          console.log('用户信息:', userInfo)
          handleDouyinUserInfo(userInfo.userInfo)
        },
        fail: (err) => {
          console.error('获取用户信息失败:', err)
          uni.showToast({ title: '获取用户信息失败', icon: 'none' })
        }
      })
    },
    fail: (err) => {
      console.error('抖音授权失败:', err)
      uni.showToast({ title: '授权失败', icon: 'none' })
    }
  })
  // #endif
  
  // #ifndef MP-DOUYIN
  uni.showToast({ title: '请在抖音小程序中使用', icon: 'none' })
  // #endif
}

// 处理抖音用户信息
const handleDouyinUserInfo = (userInfo: any) => {
  // 保存用户信息
  uni.setStorageSync('userInfo', userInfo)
  uni.setStorageSync('loginType', 'douyin')
  uni.setStorageSync('isLoggedIn', 'true')
  
  uni.showToast({ title: '登录成功', icon: 'success' })
  
  setTimeout(() => {
    uni.navigateTo({
      url: '/pages/index/index'
    })
  }, 1000)
}

// 账号密码登录
const doLogin = () => {
  if (!username.value || !password.value) {
    uni.showToast({ title: '请输入用户名和密码', icon: 'none' })
    return
  }
  
  // 律师账号登录
  if (password.value === 'lawyer123') {
    uni.setStorageSync('isAdmin', 'true')
    uni.setStorageSync('username', username.value)
    uni.setStorageSync('loginType', 'password')
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
  justify-content: center
  
  .login-box {
    width: 600rpx;
    background-color: #fff;
    border-radius: 20rpx;
    padding: 60rpx 40rpx
    
    .title {
      display: block;
      text-align: center;
      font-size: 40rpx;
      font-weight: bold;
      margin-bottom: 60rpx;
      color: #333
    }
    
    .input {
      height: 88rpx;
      background-color: #f5f5f5;
      border-radius: 44rpx;
      padding: 0 30rpx;
      margin-bottom: 30rpx;
      font-size: 28rpx
    }
    
    .login-btn {
      height: 88rpx;
      background-color: #007AFF;
      color: #fff;
      border-radius: 44rpx;
      font-size: 32rpx;
      border: none;
      margin-top: 20rpx
    }
    
    .divider {
      display: flex;
      align-items: center;
      margin: 40rpx 0
      
      .line {
        flex: 1;
        height: 1rpx;
        background-color: #ddd
      }
      
      .divider-text {
        padding: 0 20rpx;
        color: #999;
        font-size: 24rpx
      }
    }
    
    .douyin-btn {
      height: 88rpx;
      background-color: #fe2c55;
      color: #fff;
      border-radius: 44rpx;
      font-size: 32rpx;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center
      
      .douyin-icon {
        margin-right: 10rpx
      }
    }
    
    .back {
      display: block;
      text-align: center;
      margin-top: 30rpx;
      color: #999;
      font-size: 26rpx
    }
  }
}
</style>
