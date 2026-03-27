<template>
  <view class="messages-container">
    <view class="tabs">
      <text class="tab" :class="{ active: tab === 'pending' }" @click="tab = 'pending'">
        待回复 ({{ pendingCount }})
      </text>
      <text class="tab" :class="{ active: tab === 'replied' }" @click="tab = 'replied'">
        已回复
      </text>
    </view>

    <scroll-view scroll-y class="msg-list">
      <view class="msg-item" v-for="(item, index) in currentList" :key="index" @click="openDetail(item)">
        <view class="msg-header">
          <text class="username">{{ item.username }}</text>
          <text class="time">{{ item.time }}</text>
        </view>
        <text class="msg-content">{{ item.content }}</text>
        <view class="msg-footer">
          <text class="phone">📞 {{ item.phone }}</text>
          <text class="status" :class="item.status">{{ item.status === 'pending' ? '待回复' : '已回复' }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const tab = ref('pending')

const messages = ref([
  { id: 1, username: '张三', content: '律师你好，我想咨询一下离婚财产分割的问题...', phone: '138****8001', time: '10:30', status: 'pending' },
  { id: 2, username: '李四', content: '试用期被公司辞退了，能要赔偿吗？', phone: '139****8002', time: '09:15', status: 'pending' },
  { id: 3, username: '王五', content: '借了钱给别人，现在联系不上人了...', phone: '137****8003', time: '昨天', status: 'replied' },
  { id: 4, username: '赵六', content: '工伤认定需要什么材料？', phone: '136****8004', time: '昨天', status: 'replied' }
])

const pendingCount = computed(() => messages.value.filter(m => m.status === 'pending').length)

const currentList = computed(() => {
  return tab.value === 'pending' 
    ? messages.value.filter(m => m.status === 'pending')
    : messages.value.filter(m => m.status === 'replied')
})

const openDetail = (item: any) => {
  uni.showModal({
    title: item.username,
    content: item.content + '\n\n电话: ' + item.phone,
    showCancel: item.status === 'pending',
    confirmText: item.status === 'pending' ? '回复' : '确定',
    success: (res) => {
      if (res.confirm && item.status === 'pending') {
        // 标记为已回复
        item.status = 'replied'
        uni.showToast({ title: '已回复', icon: 'success' })
      }
    }
  })
}
</script>

<style lang="scss">
.messages-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.tabs {
  display: flex;
  background-color: #fff;
  
  .tab {
    flex: 1;
    text-align: center;
    padding: 30rpx;
    font-size: 28rpx;
    color: #666;
    border-bottom: 4rpx solid transparent;
    
    &.active {
      color: #007AFF;
      border-bottom-color: #007AFF;
    }
  }
}

.msg-list {
  padding: 20rpx;
}

.msg-item {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  
  .msg-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16rpx;
    
    .username {
      font-size: 30rpx;
      font-weight: bold;
      color: #333;
    }
    
    .time {
      font-size: 24rpx;
      color: #999;
    }
  }
  
  .msg-content {
    display: block;
    font-size: 28rpx;
    color: #666;
    line-height: 1.6;
    margin-bottom: 16rpx;
  }
  
  .msg-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .phone {
      font-size: 24rpx;
      color: #999;
    }
    
    .status {
      font-size: 24rpx;
      padding: 6rpx 16rpx;
      border-radius: 20rpx;
      
      &.pending {
        color: #ff9500;
        background-color: #fff3e0;
      }
      
      &.replied {
        color: #34c759;
        background-color: #e8f5e9;
      }
    }
  }
}
</style>
