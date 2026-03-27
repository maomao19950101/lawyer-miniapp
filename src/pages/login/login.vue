<template>
  <view class="login-container">
    <!-- 背景装饰 -->
    <view class="bg-gradient"></view>
    <view class="bg-shapes">
      <view class="shape shape-1"></view>
      <view class="shape shape-2"></view>
      <view class="shape shape-3"></view>
    </view>
    
    <view class="login-content">
      <!-- Logo -->
      <view class="logo-section">
        <view class="logo">
          <text class="logo-icon">⚖️</text>
        </view>
        <text class="app-name">法务助手</text>
        <text class="app-slogan">专业法律服务，随手可得</text>
      </view>
      
      <!-- 登录卡片 -->
      <view class="login-card">
        <text class="card-title">欢迎回来</text>
        
        <!-- 抖音一键登录 -->
        <button class="douyin-login-btn" @click="douyinLogin">
          <view class="btn-content">
            <image class="douyin-logo" src="https://sf3-cn.feishucdn.com/obj/lark-opensearch/687474703a2f2f70332d6e656d6f6263642e636e2f696d6167652f323032312d30312d30312f33303563366136342d653133342d343833312d386666382d3263366663383030303030302e706e67" mode="aspectFit" />
            <text>抖音一键登录</text>
          </view>
        </button>
        
        <view class="divider">
          <view class="divider-line"></view>
          <text class="divider-text">其他登录方式</text>
          <view class="divider-line"></view>
        </view>
        
        <!-- 账号登录 -->
        <view class="input-group">
          <view class="input-item">
            <text class="input-icon">👤</text>
            <input 
              class="input-field" 
              v-model="username" 
              placeholder="请输入用户名" 
              placeholder-class="placeholder"
            />
          </view>
          <view class="input-item">
            <text class="input-icon">🔒</text>
            <input 
              class="input-field" 
              v-model="password" 
              type="password" 
              placeholder="请输入密码" 
              placeholder-class="placeholder"
            />
          </view>
        </view>
        
        <button class="login-btn" @click="doLogin">
          <text>登 录</text>
        </button>
        
        <view class="card-footer">
          <text class="footer-text">登录即表示同意</text>
          <text class="link-text">《用户协议》</text>
          <text class="footer-text">和</text>
          <text class="link-text">《隐私政策》</text>
        </view>
      </view>
      
      <!-- 底部 -->
      <text class="back-home" @click="goBack">返回首页</text>
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
      tt.getUserInfo({
        success: (userInfo) => {
          handleUserInfo(userInfo.userInfo)
        },
        fail: (err) => {
          uni.showToast({ title: '获取用户信息失败', icon: 'none' })
        }
      })
    },
    fail: (err) => {
      uni.showToast({ title: '授权失败', icon: 'none' })
    }
  })
  // #endif
  
  // #ifndef MP-DOUYIN
  uni.showToast({ title: '请在抖音小程序中登录', icon: 'none' })
  // #endif
}

const handleUserInfo = (userInfo: any) => {
  uni.setStorageSync('userInfo', userInfo)
  uni.setStorageSync('loginType', 'douyin')
  uni.setStorageSync('isLoggedIn', 'true')
  uni.showToast({ title: '登录成功', icon: 'success' })
  setTimeout(() => {
    uni.switchTab({ url: '/pages/index/index' })
  }, 1000)
}

const doLogin = () => {
  if (!username.value || !password.value) {
    uni.showToast({ title: '请输入用户名和密码', icon: 'none' })
    return
  }
  
  if (password.value === 'lawyer123') {
    uni.setStorageSync('isAdmin', 'true')
    uni.setStorageSync('username', username.value)
    uni.setStorageSync('loginType', 'password')
    uni.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateTo({ url: '/pages/admin/home/home' })
    }, 1000)
  } else {
    uni.showToast({ title: '密码错误', icon: 'none' })
  }
}

const goBack = () => {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>

<style lang="scss">
.login-container {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  
  .bg-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
  }
  
  .bg-shapes {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    
    .shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(80rpx);
      opacity: 0.4;
      
      &.shape-1 {
        width: 400rpx;
        height: 400rpx;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        top: -100rpx;
        right: -100rpx;
        animation: float 8s ease-in-out infinite;
      }
      
      &.shape-2 {
        width: 300rpx;
        height: 300rpx;
        background: linear-gradient(135deg, #ec4899, #f43f5e);
        bottom: 10%;
        left: -80rpx;
        animation: float 10s ease-in-out infinite reverse;
      }
      
      &.shape-3 {
        width: 200rpx;
        height: 200rpx;
        background: linear-gradient(135deg, #06b6d4, #3b82f6);
        top: 40%;
        right: -50rpx;
        animation: float 12s ease-in-out infinite;
      }
    }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20rpx) rotate(5deg); }
  }
  
  .login-content {
    position: relative;
    z-index: 1;
    padding: 60rpx 40rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  
  .logo-section {
    text-align: center;
    margin-bottom: 60rpx;
    
    .logo {
      width: 160rpx;
      height: 160rpx;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border-radius: 40rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 30rpx;
      box-shadow: 0 20rpx 60rpx rgba(99, 102, 241, 0.4);
      
      .logo-icon {
        font-size: 80rpx;
      }
    }
    
    .app-name {
      display: block;
      font-size: 48rpx;
      font-weight: 700;
      color: #fff;
      margin-bottom: 16rpx;
      letter-spacing: 4rpx;
    }
    
    .app-slogan {
      display: block;
      font-size: 26rpx;
      color: rgba(255, 255, 255, 0.6);
      letter-spacing: 2rpx;
    }
  }
  
  .login-card {
    width: 100%;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20rpx);
    border-radius: 32rpx;
    padding: 50rpx 40rpx;
    border: 1rpx solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20rpx 80rpx rgba(0, 0, 0, 0.3);
    
    .card-title {
      display: block;
      font-size: 36rpx;
      font-weight: 600;
      color: #fff;
      text-align: center;
      margin-bottom: 40rpx;
    }
    
    .douyin-login-btn {
      width: 100%;
      height: 96rpx;
      background: linear-gradient(135deg, #fe2c55, #ff0050);
      border-radius: 48rpx;
      border: none;
      margin-bottom: 30rpx;
      
      .btn-content {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 30rpx;
        font-weight: 500;
        
        .douyin-logo {
          width: 40rpx;
          height: 40rpx;
          margin-right: 16rpx;
        }
      }
    }
    
    .divider {
      display: flex;
      align-items: center;
      margin: 30rpx 0;
      
      .divider-line {
        flex: 1;
        height: 1rpx;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      }
      
      .divider-text {
        padding: 0 24rpx;
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    
    .input-group {
      margin-bottom: 30rpx;
      
      .input-item {
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 24rpx;
        padding: 0 30rpx;
        margin-bottom: 20rpx;
        border: 1rpx solid rgba(255, 255, 255, 0.08);
        transition: all 0.3s ease;
        
        &:focus-within {
          border-color: rgba(99, 102, 241, 0.5);
          background: rgba(255, 255, 255, 0.1);
        }
        
        .input-icon {
          font-size: 36rpx;
          margin-right: 20rpx;
        }
        
        .input-field {
          flex: 1;
          height: 96rpx;
          font-size: 28rpx;
          color: #fff;
        }
        
        .placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
      }
    }
    
    .login-btn {
      width: 100%;
      height: 96rpx;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border-radius: 48rpx;
      border: none;
      font-size: 32rpx;
      font-weight: 600;
      color: #fff;
      letter-spacing: 8rpx;
      box-shadow: 0 10rpx 30rpx rgba(99, 102, 241, 0.4);
      transition: all 0.3s ease;
      
      &:active {
        transform: scale(0.98);
        box-shadow: 0 5rpx 20rpx rgba(99, 102, 241, 0.3);
      }
    }
    
    .card-footer {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 30rpx;
      
      .footer-text {
        font-size: 22rpx;
        color: rgba(255, 255, 255, 0.4);
        margin: 0 4rpx;
      }
      
      .link-text {
        font-size: 22rpx;
        color: #6366f1;
        margin: 0 4rpx;
      }
    }
  }
  
  .back-home {
    margin-top: 40rpx;
    font-size: 26rpx;
    color: rgba(255, 255, 255, 0.5);
    padding: 20rpx;
  }
}
</style>
