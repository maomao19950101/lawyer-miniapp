<template>
  <view class="admin-home">
    <!-- 统计 -->
    <view class="stats">
      <view class="stat-item">
        <text class="stat-num">{{ stats.today }}</text>
        <text class="stat-label">今日咨询</text>
      </view>
      <view class="stat-item">
        <text class="stat-num">{{ stats.total }}</text>
        <text class="stat-label">总咨询</text>
      </view>
      <view class="stat-item">
        <text class="stat-num">{{ stats.pending }}</text>
        <text class="stat-label">待回复</text>
      </view>
    </view>

    <!-- 菜单 -->
    <view class="menu">
      <view class="menu-item" @click="goTo('/pages/admin/messages/messages')">
        <text class="menu-icon">💬</text>
        <text class="menu-text">消息管理</text>
        <text class="arrow">›</text>
      </view>
      <view class="menu-item" @click="goTo('/pages/admin/cases/cases')">
        <text class="menu-icon">📋</text>
        <text class="menu-text">案例管理</text>
        <text class="arrow">›</text>
      </view>
      <view class="menu-item" @click="goTo('/pages/admin/users/users')">
        <text class="menu-icon">👥</text>
        <text class="menu-text">用户管理</text>
        <text class="arrow">›</text>
      </view>
    </view>

    <!-- 退出 -->
    <button class="logout-btn" @click="logout">退出登录</button>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const stats = reactive({
  today: 5,
  total: 128,
  pending: 3
})

const goTo = (url: string) => {
  uni.navigateTo({ url })
}

const logout = () => {
  uni.removeStorageSync('isAdmin')
  uni.showToast({ title: '已退出', icon: 'success' })
  setTimeout(() => {
    uni.navigateBack()
  }, 1000)
}
</script>

<style lang="scss">
.admin-home {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 30rpx;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30rpx;
  
  .stat-item {
    width: 31%;
    background-color: #007AFF;
    border-radius: 16rpx;
    padding: 40rpx 20rpx;
    text-align: center;
    
    .stat-num {
      display: block;
      font-size: 48rpx;
      font-weight: bold;
      color: #fff;
    }
    
    .stat-label {
      display: block;
      font-size: 24rpx;
      color: rgba(255,255,255,0.8);
      margin-top: 10rpx;
    }
  }
}

.menu {
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
      font-size: 36rpx;
      color: #ccc;
    }
  }
}

.logout-btn {
  margin-top: 60rpx;
  background-color: #fff;
  color: #ff3b30;
  border-radius: 16rpx;
  padding: 30rpx;
  font-size: 30rpx;
  border: none;
}
</style>
