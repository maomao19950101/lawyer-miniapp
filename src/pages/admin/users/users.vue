<template>
  <view class="users-container">
    <scroll-view scroll-y class="user-list">
      <view class="user-item" v-for="(item, index) in users" :key="index">
        <image class="avatar" src="/static/user-avatar.png"></image>
        <view class="user-info">
          <text class="username">{{ item.username }}</text>
          <text class="phone">{{ item.phone }}</text>
        </view>
        <view class="user-stats">
          <text class="stat">{{ item.consultCount }}次咨询</text>
          <text class="last-time">{{ item.lastTime }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const users = ref([
  { username: '张三', phone: '138****8001', consultCount: 3, lastTime: '今天 10:30' },
  { username: '李四', phone: '139****8002', consultCount: 1, lastTime: '昨天' },
  { username: '王五', phone: '137****8003', consultCount: 5, lastTime: '3天前' },
  { username: '赵六', phone: '136****8004', consultCount: 2, lastTime: '1周前' }
])
</script>

<style lang="scss">
.users-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.user-list {
  .user-item {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
    margin-bottom: 16rpx;
    
    .avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 40rpx;
      background-color: #eee;
      margin-right: 20rpx;
    }
    
    .user-info {
      flex: 1;
      
      .username {
        display: block;
        font-size: 30rpx;
        font-weight: bold;
        color: #333;
      }
      
      .phone {
        display: block;
        font-size: 24rpx;
        color: #999;
        margin-top: 8rpx;
      }
    }
    
    .user-stats {
      text-align: right;
      
      .stat {
        display: block;
        font-size: 26rpx;
        color: #007AFF;
      }
      
      .last-time {
        display: block;
        font-size: 22rpx;
        color: #999;
        margin-top: 8rpx;
      }
    }
  }
}
</style>
