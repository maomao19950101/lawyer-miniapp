<template>
  <view class="profile-container">
    <!-- 用户信息 -->
    <view class="user-info">
      <image class="avatar" src="/static/user-avatar.png"></image>
      <view class="info">
        <text class="nickname">未登录</text>
        <text class="desc">登录后享受更多服务</text>
      </view>
      <button class="login-btn" @click="login">登录</button>
    </view>

    <!-- 菜单 -->
    <view class="menu-list">
      <view class="menu-item" @click="goTo('/pages/cases/cases')">
        <text class="menu-icon">📋</text>
        <text class="menu-text">我的案例</text>
        <text class="arrow">></text>
      </view>
      <view class="menu-item" @click="goTo('/pages/about/about')">
        <text class="menu-icon">👨‍⚖️</text>
        <text class="menu-text">关于律师</text>
        <text class="arrow">></text>
      </view>
      <view class="menu-item">
        <text class="menu-icon">📞</text>
        <text class="menu-text">联系我们</text>
        <text class="arrow">></text>
      </view>
      <view class="menu-item">
        <text class="menu-icon">❓</text>
        <text class="menu-text">常见问题</text>
        <text class="arrow">></text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const login = () => {
  uni.showToast({ title: '登录功能开发中', icon: 'none' })
}

const goTo = (url: string) => {
  uni.navigateTo({ url })
}
</script>

<style lang="scss">
.profile-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.user-info {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #1a5ae8 0%, #1a3dba 100%);
  padding: 60rpx 40rpx;
  
  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 60rpx;
    background-color: #fff;
    margin-right: 24rpx;
  }
  
  .info {
    flex: 1;
    
    .nickname {
      display: block;
      font-size: 34rpx;
      font-weight: bold;
      color: #fff;
      margin-bottom: 8rpx;
    }
    
    .desc {
      display: block;
      font-size: 24rpx;
      color: rgba(255,255,255,0.7);
    }
  }
  
  .login-btn {
    background-color: #fff;
    color: #1a5ae8;
    font-size: 26rpx;
    padding: 16rpx 32rpx;
    border-radius: 30rpx;
    border: none;
  }
}

.menu-list {
  margin: 30rpx;
  background-color: #fff;
  border-radius: 16rpx;
  
  .menu-item {
    display: flex;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .menu-icon {
      font-size: 40rpx;
      margin-right: 20rpx;
    }
    
    .menu-text {
      flex: 1;
      font-size: 30rpx;
      color: #333;
    }
    
    .arrow {
      font-size: 28rpx;
      color: #ccc;
    }
  }
}
</style>
